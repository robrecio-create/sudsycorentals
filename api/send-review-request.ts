import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/send-review-request
 * 
 * Called by Supabase scheduled job or webhook 24h after delivery completion.
 * Sends a review request SMS to the customer.
 * 
 * Body: { customer_id: string, phone: string, first_name?: string }
 */

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const QUO_API_KEY = process.env.QUO_API_KEY!;
const QUO_PHONE_ID = process.env.QUO_PHONE_ID!;
const GOOGLE_REVIEW_LINK = 'https://g.page/r/CeHbve1aGmfBEBM/review';

interface RequestBody {
  customer_id: string;
  phone: string;
  first_name?: string;
}

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
  // Don't send more than one review request per 30 days
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
    return true; // Fail safe
  }
  
  return data && data.length > 0;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Simple auth check - require a secret header
  const authHeader = req.headers['x-api-secret'];
  if (authHeader !== process.env.INTERNAL_API_SECRET) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { customer_id, phone, first_name } = req.body as RequestBody;

  if (!customer_id || !phone) {
    res.status(400).json({ error: 'Missing customer_id or phone' });
    return;
  }

  // Normalize phone number
  const normalizedPhone = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;

  // Check if we've already sent a review request recently
  if (await hasRecentReviewRequest(normalizedPhone)) {
    console.log(`Skipping review request to ${normalizedPhone} - sent recently`);
    res.status(200).json({ status: 'skipped', reason: 'recent_request' });
    return;
  }

  // Compose message
  const greeting = first_name ? `Hi ${first_name}! ` : '';
  const message = `${greeting}Thanks for choosing SudsyCo! 🫧 How did we do? We'd love a quick review: ${GOOGLE_REVIEW_LINK}`;

  const messageId = await sendSMS(normalizedPhone, message);

  if (messageId) {
    // Log the auto-text
    await supabase
      .from('quo_auto_texts')
      .insert({
        phone_number: normalizedPhone,
        auto_text_type: 'review_request',
        quo_message_id: messageId,
        customer_id,
      });

    console.log(`Sent review request to ${normalizedPhone} for customer ${customer_id}`);
    res.status(200).json({ status: 'sent', messageId });
  } else {
    res.status(500).json({ status: 'failed', error: 'Failed to send SMS' });
  }
}
