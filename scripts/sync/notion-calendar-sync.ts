#!/usr/bin/env npx ts-node
/**
 * SudsyCo Notion + Google Calendar Sync
 * 
 * Syncs customers and deliveries from Supabase to Notion and Google Calendar.
 * Run via cron every 5-15 minutes or manually.
 * 
 * Usage:
 *   npx ts-node scripts/sync/notion-calendar-sync.ts
 *   
 * Requirements:
 *   - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
 *   - NOTION_API_KEY env var
 *   - gog CLI authenticated for calendar (nodebt107@gmail.com)
 */

import { createClient } from '@supabase/supabase-js';
import { execSync } from 'child_process';

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fwylpdmcbbgjyrfbpirm.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const NOTION_VERSION = '2022-06-28';

// Notion database IDs (verified via API search)
const NOTION_CUSTOMERS_DB = '3272a8ce-a93f-813d-b92b-d15f43f22094';
const NOTION_DELIVERIES_DB = '3272a8ce-a93f-8123-9052-c26f09fedc27'; // Delivery Schedules

// Google Calendar config
const GCAL_ACCOUNT = 'nodebt107@gmail.com';
const GCAL_CALENDAR_ID = 'primary'; // or specific calendar ID

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  street_address: string | null;
  city: string | null;
  zip_code: string | null;
  notes: string | null;
  created_at: string;
  synced_to_notion?: boolean;
  notion_page_id?: string;
}

interface Delivery {
  id: string;
  user_id: string;
  scheduled_date: string;
  time_window: string;
  street_address: string;
  city: string;
  zip_code: string;
  phone: string;
  notes: string | null;
  status: string;
  created_at: string;
  synced_to_notion?: boolean;
  synced_to_calendar?: boolean;
  notion_page_id?: string;
  gcal_event_id?: string;
}

/**
 * Create a page in Notion
 */
async function createNotionPage(
  databaseId: string,
  properties: Record<string, unknown>
): Promise<string | null> {
  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Notion API error:', response.status, error);
      return null;
    }

    const result = await response.json();
    return result.id;
  } catch (error) {
    console.error('Error creating Notion page:', error);
    return null;
  }
}

/**
 * Query Notion database to check if record exists
 */
async function findNotionPage(
  databaseId: string,
  filterProperty: string,
  filterValue: string,
  filterType: 'rich_text' | 'phone_number' = 'rich_text'
): Promise<string | null> {
  try {
    const filter: Record<string, unknown> = {
      property: filterProperty,
    };
    
    if (filterType === 'phone_number') {
      filter['phone_number'] = { equals: filterValue };
    } else {
      filter['rich_text'] = { equals: filterValue };
    }

    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
      },
      body: JSON.stringify({
        filter,
        page_size: 1,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.results?.[0]?.id || null;
  } catch (error) {
    console.error('Error querying Notion:', error);
    return null;
  }
}

/**
 * Create Google Calendar event using gog CLI
 */
function createCalendarEvent(
  date: string,
  timeWindow: string,
  address: string,
  phone: string,
  notes: string | null
): string | null {
  // Parse time window to get start/end times
  let startHour: number, endHour: number;
  if (timeWindow.includes('8AM-12PM')) {
    startHour = 8;
    endHour = 12;
  } else if (timeWindow.includes('12PM-4PM')) {
    startHour = 12;
    endHour = 16;
  } else if (timeWindow.includes('4PM-7PM')) {
    startHour = 16;
    endHour = 19;
  } else {
    startHour = 9;
    endHour = 17;
  }

  const startTime = `${date}T${startHour.toString().padStart(2, '0')}:00:00`;
  const endTime = `${date}T${endHour.toString().padStart(2, '0')}:00:00`;
  
  const summary = `🚛 SudsyCo Delivery - ${address}`;
  const description = `Phone: ${phone}${notes ? `\nNotes: ${notes}` : ''}`;

  try {
    const cmd = `gog calendar create "${GCAL_CALENDAR_ID}" --account "${GCAL_ACCOUNT}" --summary "${summary.replace(/"/g, '\\"')}" --description "${description.replace(/"/g, '\\"')}" --from "${startTime}" --to "${endTime}" --json`;
    
    const output = execSync(cmd, { encoding: 'utf8', timeout: 30000 });
    const result = JSON.parse(output);
    return result.id || null;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}

/**
 * Sync unsynced customers to Notion
 */
async function syncCustomers(): Promise<void> {
  console.log('Syncing customers to Notion...');

  // Get customers not yet synced (we'll add a synced_to_notion column)
  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .or('synced_to_notion.is.null,synced_to_notion.eq.false')
    .limit(50);

  if (error) {
    console.error('Error fetching customers:', error);
    return;
  }

  if (!customers || customers.length === 0) {
    console.log('No new customers to sync.');
    return;
  }

  console.log(`Found ${customers.length} customers to sync.`);

  for (const customer of customers as Customer[]) {
    // Check if already exists in Notion (by phone number)
    const existingPage = await findNotionPage(NOTION_CUSTOMERS_DB, 'Phone', customer.phone, 'phone_number');
    
    if (existingPage) {
      console.log(`Customer ${customer.name} already in Notion, updating sync flag.`);
      await supabase
        .from('customers')
        .update({ synced_to_notion: true, notion_page_id: existingPage })
        .eq('id', customer.id);
      continue;
    }

    // Create Notion page
    // Property names/types match Notion Customers database schema
    const properties: Record<string, unknown> = {
      'Name': {
        title: [{ text: { content: customer.name } }],
      },
      'Phone': {
        phone_number: customer.phone,
      },
    };

    if (customer.email) {
      properties['Email'] = {
        email: customer.email,
      };
    }

    if (customer.street_address) {
      properties['Street Address'] = {
        rich_text: [{ text: { content: customer.street_address } }],
      };
    }

    if (customer.city) {
      properties['City'] = {
        rich_text: [{ text: { content: customer.city } }],
      };
    }

    if (customer.zip_code) {
      properties['Zip Code'] = {
        rich_text: [{ text: { content: customer.zip_code } }],
      };
    }

    if (customer.notes) {
      properties['Notes'] = {
        rich_text: [{ text: { content: customer.notes } }],
      };
    }

    const pageId = await createNotionPage(NOTION_CUSTOMERS_DB, properties);

    if (pageId) {
      console.log(`✓ Synced customer ${customer.name} to Notion`);
      await supabase
        .from('customers')
        .update({ synced_to_notion: true, notion_page_id: pageId })
        .eq('id', customer.id);
    } else {
      console.log(`✗ Failed to sync customer ${customer.name}`);
    }

    // Small delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 350));
  }
}

/**
 * Sync unsynced deliveries to Notion and Google Calendar
 */
async function syncDeliveries(): Promise<void> {
  console.log('Syncing deliveries to Notion + Calendar...');

  const { data: deliveries, error } = await supabase
    .from('delivery_schedules')
    .select('*')
    .or('synced_to_notion.is.null,synced_to_notion.eq.false,synced_to_calendar.is.null,synced_to_calendar.eq.false')
    .limit(50);

  if (error) {
    console.error('Error fetching deliveries:', error);
    return;
  }

  if (!deliveries || deliveries.length === 0) {
    console.log('No new deliveries to sync.');
    return;
  }

  console.log(`Found ${deliveries.length} deliveries to sync.`);

  for (const delivery of deliveries as Delivery[]) {
    const fullAddress = `${delivery.street_address}, ${delivery.city} ${delivery.zip_code}`;
    const updates: Partial<Delivery> = {};

    // Sync to Notion if not already
    if (!delivery.synced_to_notion) {
      // Property names/types match Notion Delivery Schedules database schema
      const properties: Record<string, unknown> = {
        'Name': {
          title: [{ text: { content: `${delivery.street_address}, ${delivery.city}` } }],
        },
        'Scheduled Date': {
          date: { start: delivery.scheduled_date },
        },
        'Time Window': {
          select: { name: delivery.time_window },
        },
        'Street Address': {
          rich_text: [{ text: { content: delivery.street_address } }],
        },
        'City': {
          rich_text: [{ text: { content: delivery.city } }],
        },
        'Zip Code': {
          rich_text: [{ text: { content: delivery.zip_code } }],
        },
        'Phone': {
          phone_number: delivery.phone,
        },
        'Status': {
          select: { name: delivery.status },
        },
      };

      if (delivery.notes) {
        properties['Notes'] = {
          rich_text: [{ text: { content: delivery.notes } }],
        };
      }

      const pageId = await createNotionPage(NOTION_DELIVERIES_DB, properties);
      if (pageId) {
        console.log(`✓ Synced delivery ${delivery.id} to Notion`);
        updates.synced_to_notion = true;
        updates.notion_page_id = pageId;
      }
    }

    // Sync to Google Calendar if not already
    if (!delivery.synced_to_calendar) {
      const eventId = createCalendarEvent(
        delivery.scheduled_date,
        delivery.time_window,
        fullAddress,
        delivery.phone,
        delivery.notes
      );

      if (eventId) {
        console.log(`✓ Created calendar event for delivery ${delivery.id}`);
        updates.synced_to_calendar = true;
        updates.gcal_event_id = eventId;
      }
    }

    // Update Supabase with sync status
    if (Object.keys(updates).length > 0) {
      await supabase
        .from('delivery_schedules')
        .update(updates)
        .eq('id', delivery.id);
    }

    await new Promise(resolve => setTimeout(resolve, 350));
  }
}

/**
 * Main sync function
 */
async function main(): Promise<void> {
  console.log('=== SudsyCo Sync Starting ===');
  console.log(`Time: ${new Date().toISOString()}`);
  
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY not set!');
    process.exit(1);
  }

  await syncCustomers();
  await syncDeliveries();

  console.log('=== Sync Complete ===\n');
}

main().catch(console.error);
