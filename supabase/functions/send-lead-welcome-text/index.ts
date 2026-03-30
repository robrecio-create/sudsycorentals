// Supabase Edge Function: send-lead-welcome-text
// Triggered by database webhook on leads table INSERT
// Sends welcome SMS via Quo (OpenPhone) API

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip_code?: string;
  quo_message_sent: boolean;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: LeadRecord;
  schema: string;
  old_record: LeadRecord | null;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: WebhookPayload = await req.json();
    
    // Only process INSERT events
    if (payload.type !== "INSERT") {
      return new Response(JSON.stringify({ message: "Not an INSERT event, skipping" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const lead = payload.record;
    
    // Skip if already sent (shouldn't happen on INSERT, but safety check)
    if (lead.quo_message_sent) {
      return new Response(JSON.stringify({ message: "Message already sent, skipping" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Validate phone number exists
    if (!lead.phone) {
      console.error("No phone number for lead:", lead.id);
      return new Response(JSON.stringify({ error: "No phone number" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Format phone number (ensure E.164 format for Quo)
    let formattedPhone = lead.phone.replace(/\D/g, "");
    if (formattedPhone.length === 10) {
      formattedPhone = `+1${formattedPhone}`;
    } else if (formattedPhone.length === 11 && formattedPhone.startsWith("1")) {
      formattedPhone = `+${formattedPhone}`;
    } else if (!formattedPhone.startsWith("+")) {
      formattedPhone = `+${formattedPhone}`;
    }

    // Get first name for personalization
    const firstName = lead.name.split(" ")[0];

    // Compose welcome message
    const welcomeMessage = `Hi ${firstName}! 🫧 Thanks for checking out SudsyCo Rentals! We serve your area and would love to help. One of our team members will reach out shortly to discuss washer & dryer rental options. Questions? Just reply here! - SudsyCo`;

    // Get environment variables
    const quoApiKey = Deno.env.get("QUO_API_KEY");
    const quoPhoneId = Deno.env.get("QUO_PHONE_ID") || "PN7CvX9yYl";

    if (!quoApiKey) {
      console.error("QUO_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Quo API key not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Send SMS via Quo API
    const quoResponse = await fetch("https://api.openphone.com/v1/messages", {
      method: "POST",
      headers: {
        "Authorization": quoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: quoPhoneId,
        to: [formattedPhone],
        content: welcomeMessage,
      }),
    });

    const quoResult = await quoResponse.json();

    if (!quoResponse.ok) {
      console.error("Quo API error:", quoResult);
      return new Response(JSON.stringify({ error: "Failed to send SMS", details: quoResult }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Update the lead record to mark message as sent
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: updateError } = await supabase
      .from("leads")
      .update({
        quo_message_sent: true,
        quo_message_sent_at: new Date().toISOString(),
      })
      .eq("id", lead.id);

    if (updateError) {
      console.error("Failed to update lead record:", updateError);
      // Don't fail the request - SMS was sent successfully
    }

    console.log(`Welcome SMS sent to ${formattedPhone} for lead ${lead.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Welcome SMS sent",
        leadId: lead.id,
        phone: formattedPhone,
        quoMessageId: quoResult.data?.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
