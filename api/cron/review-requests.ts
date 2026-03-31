import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/cron/review-requests
 * 
 * Daily cron job to send review request SMS to customers 24h after delivery completion.
 * Should be triggered by Vercel Cron at 10 AM CST daily.
 */

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const QUO_API_KEY = process.env.QUO_API_KEY!;
const QUO_PHONE_ID = process.env.QUO_PHONE_ID!;
const GOOGLE_REVIEW_LINK = 'https://g.page/r/CeHbve1aGmfBEBM/review';

async function sendSMS(to: string, content: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.openphone.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': QUO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: QUO_PHONE_ID,
        to: [to],
        content,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Quo API error:', response.status, errorText);
      return null;
    }
    
    const result = await response.json();
    return result.data?.id || null;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return null;
  }
}

async function hasRecentReviewRequest(phoneNumber: string): Promise<boolean> {
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  
  const { data, error } = await supabase
    .from('quo_auto_texts')
    .select('id')
    .eq('phone_number', phoneNumber)
    .eq('auto_text_type', 'review_request')
    .gte('sent_at', cutoff)
    .limit(1);
  
  if (error) {
    console.error('Error checking recent review requests:', error);
    return true;
  }
  
  return data && data.length > 0;
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('1') ? `+${digits}` : `+1${digits}`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Verify cron secret (Vercel sends this header for cron jobs)
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Also allow internal API secret for manual testing
    const apiSecret = req.headers['x-api-secret'];
    if (apiSecret !== process.env.INTERNAL_API_SECRET) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  }

  // Find deliveries completed 24-48 hours ago that haven't received a review request
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();

  const { data: completedDeliveries, error } = await supabase
    .from('delivery_schedules')
    .select('id, phone, customer_name')
    .eq('status', 'completed')
    .gte('updated_at', fortyEightHoursAgo)
    .lte('updated_at', twentyFourHoursAgo)
    .not('phone', 'is', null);

  if (error) {
    console.error('Error fetching completed deliveries:', error);
    res.status(500).json({ error: 'Database error' });
    return;
  }

  if (!completedDeliveries || completedDeliveries.length === 0) {
    console.log('No completed deliveries in the 24-48h window');
    res.status(200).json({ status: 'ok', sent: 0, message: 'No deliveries to process' });
    return;
  }

  let sentCount = 0;
  let skippedCount = 0;
  const results: Array<{ id: string; status: string; reason?: string }> = [];

  for (const delivery of completedDeliveries) {
    const phone = normalizePhone(delivery.phone);
    
    // Check if we've already sent a review request to this number
    if (await hasRecentReviewRequest(phone)) {
      console.log(`Skipping ${phone} - recent review request exists`);
      skippedCount++;
      results.push({ id: delivery.id, status: 'skipped', reason: 'recent_request' });
      continue;
    }

    // Extract first name
    const firstName = delivery.customer_name?.split(' ')[0] || '';
    const greeting = firstName ? `Hi ${firstName}! ` : '';
    const message = `${greeting}Thanks for choosing SudsyCo! 🫧 How did we do? We'd love a quick review: ${GOOGLE_REVIEW_LINK}`;

    const messageId = await sendSMS(phone, message);

    if (messageId) {
      // Log the auto-text
      await supabase
        .from('quo_auto_texts')
        .insert({
          phone_number: phone,
          auto_text_type: 'review_request',
          quo_message_id: messageId,
        });

      console.log(`Sent review request to ${phone} for delivery ${delivery.id}`);
      sentCount++;
      results.push({ id: delivery.id, status: 'sent' });
    } else {
      console.error(`Failed to send review request to ${phone}`);
      results.push({ id: delivery.id, status: 'failed', reason: 'sms_error' });
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  res.status(200).json({
    status: 'ok',
    processed: completedDeliveries.length,
    sent: sentCount,
    skipped: skippedCount,
    results,
  });
}
