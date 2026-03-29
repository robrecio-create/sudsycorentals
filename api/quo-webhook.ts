import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role for backend operations
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Quo phone system configuration
const QUO_API_KEY = process.env.QUO_API_KEY!;
const QUO_PHONE_ID = process.env.QUO_PHONE_ID!; // PN7CvX9yYl - main SudsyCo line

// Business hours: Mon-Sat 8AM-6PM CST
const BUSINESS_HOURS = {
  start: 8,  // 8 AM
  end: 18,   // 6 PM
  days: [1, 2, 3, 4, 5, 6], // Mon=1 through Sat=6
};

interface QuoEvent {
  id: string;
  object: 'event';
  apiVersion: string;
  createdAt: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}

interface CallData {
  id: string;
  answeredBy: string | null;
  direction: string;
  status: string;
  participants: string[];
  phoneNumberId: string;
}

interface MessageData {
  id: string;
  from: string;
  to: string[];
  direction: string;
  text: string;
  phoneNumberId: string;
}

/**
 * Check if current time is within business hours (CST)
 */
function isBusinessHours(): boolean {
  const now = new Date();
  // Convert to CST (UTC-6, or UTC-5 during DST)
  const cstOffset = -6; // Standard time; adjust if DST detection needed
  const cstTime = new Date(now.getTime() + (cstOffset * 60 * 60 * 1000));
  
  const day = cstTime.getUTCDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const hour = cstTime.getUTCHours();
  
  return BUSINESS_HOURS.days.includes(day) && 
         hour >= BUSINESS_HOURS.start && 
         hour < BUSINESS_HOURS.end;
}

/**
 * Check if we've sent an auto-text to this number recently
 */
async function hasRecentAutoText(
  phoneNumber: string, 
  type: string, 
  withinHours: number = 24
): Promise<boolean> {
  const cutoff = new Date(Date.now() - withinHours * 60 * 60 * 1000).toISOString();
  
  const { data, error } = await supabase
    .from('quo_auto_texts')
    .select('id')
    .eq('phone_number', phoneNumber)
    .eq('auto_text_type', type)
    .gte('sent_at', cutoff)
    .limit(1);
  
  if (error) {
    console.error('Error checking recent auto-texts:', error);
    return true; // Fail safe: don't send if we can't check
  }
  
  return data && data.length > 0;
}

/**
 * Send SMS via Quo API
 */
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

/**
 * Log an auto-text we sent
 */
async function logAutoText(
  phoneNumber: string, 
  type: string, 
  messageId: string | null
): Promise<void> {
  await supabase
    .from('quo_auto_texts')
    .insert({
      phone_number: phoneNumber,
      auto_text_type: type,
      quo_message_id: messageId,
    });
}

/**
 * Handle missed call - send auto-text
 */
async function handleMissedCall(call: CallData): Promise<void> {
  // Only handle inbound missed calls
  if (call.direction !== 'incoming' || call.answeredBy !== null) {
    return;
  }
  
  const callerNumber = call.participants[0];
  if (!callerNumber) {
    console.log('No caller number found in participants');
    return;
  }
  
  // Check if we've already auto-texted this number recently
  if (await hasRecentAutoText(callerNumber, 'missed_call', 24)) {
    console.log(`Skipping missed call auto-text to ${callerNumber} - sent recently`);
    return;
  }
  
  const message = "Hey! Sorry we missed your call. How can we help? - SudsyCo Rentals 🫧";
  const messageId = await sendSMS(callerNumber, message);
  
  if (messageId) {
    await logAutoText(callerNumber, 'missed_call', messageId);
    console.log(`Sent missed call auto-text to ${callerNumber}`);
  }
}

/**
 * Handle incoming message - send after-hours reply if applicable
 */
async function handleIncomingMessage(message: MessageData): Promise<void> {
  // Only handle inbound messages
  if (message.direction !== 'incoming') {
    return;
  }
  
  // Check if we're outside business hours
  if (isBusinessHours()) {
    return; // During business hours, no auto-reply needed
  }
  
  const senderNumber = message.from;
  
  // Check if we've already sent an after-hours reply to this number recently
  if (await hasRecentAutoText(senderNumber, 'after_hours', 12)) {
    console.log(`Skipping after-hours reply to ${senderNumber} - sent recently`);
    return;
  }
  
  const replyMessage = "Thanks for reaching out! We're currently closed but will get back to you first thing tomorrow. - SudsyCo Rentals 🫧";
  const messageId = await sendSMS(senderNumber, replyMessage);
  
  if (messageId) {
    await logAutoText(senderNumber, 'after_hours', messageId);
    console.log(`Sent after-hours reply to ${senderNumber}`);
  }
}

/**
 * Main webhook handler
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  const event = req.body as QuoEvent;
  
  // Validate basic event structure
  if (!event?.id || !event?.type || !event?.data?.object) {
    console.error('Invalid webhook payload:', JSON.stringify(req.body).slice(0, 500));
    res.status(400).json({ error: 'Invalid payload' });
    return;
  }
  
  console.log(`Received Quo event: ${event.type} (${event.id})`);
  
  // Log the event to Supabase for audit/debugging
  const { error: insertError } = await supabase
    .from('quo_events')
    .insert({
      event_id: event.id,
      event_type: event.type,
      payload: event,
    })
    .select()
    .single();
  
  // Handle duplicate events gracefully (Quo may retry)
  if (insertError) {
    if (insertError.code === '23505') { // Unique violation
      console.log(`Duplicate event ${event.id}, skipping`);
      res.status(200).json({ status: 'duplicate', eventId: event.id });
      return;
    }
    console.error('Error logging event:', insertError);
  }
  
  // Process the event based on type
  try {
    switch (event.type) {
      case 'call.completed':
        await handleMissedCall(event.data.object as unknown as CallData);
        break;
        
      case 'message.received':
        await handleIncomingMessage(event.data.object as unknown as MessageData);
        break;
        
      case 'call.summary.completed':
      case 'call.transcript.completed':
        // Phase 4: Log to Notion (TODO)
        console.log(`Received ${event.type} - Notion logging not yet implemented`);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Mark event as processed
    await supabase
      .from('quo_events')
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq('event_id', event.id);
      
  } catch (error) {
    console.error('Error processing event:', error);
    // Still return 200 to prevent Quo from retrying
    // We've logged the event and can reprocess later if needed
  }
  
  // Return 200 quickly (Quo expects fast response)
  res.status(200).json({ status: 'ok', eventId: event.id });
}
