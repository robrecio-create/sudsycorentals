import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface DeliveryConfirmationRequest {
  customerEmail: string;
  customerName: string;
  scheduledDate: string;
  timeWindow: string;
  streetAddress: string;
  city: string;
  zipCode: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Authenticate the caller
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const {
      customerEmail,
      customerName,
      scheduledDate,
      timeWindow,
      streetAddress,
      city,
      zipCode,
    }: DeliveryConfirmationRequest = await req.json();

    console.log("Sending delivery confirmation to:", customerEmail);

    // Validate required fields
    if (!customerEmail || !scheduledDate || !timeWindow) {
      throw new Error("Missing required fields: customerEmail, scheduledDate, or timeWindow");
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      throw new Error("Invalid email format");
    }

    // Format the date for display
    const dateObj = new Date(scheduledDate + "T12:00:00");
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const escapeHtml = (str: string) =>
      String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const displayName = escapeHtml(customerName || "Valued Customer");
    const safeTimeWindow = escapeHtml(timeWindow);
    const fullAddress = escapeHtml(`${streetAddress}, ${city}, MS ${zipCode}`);

    const emailResponse = await resend.emails.send({
      from: "Sudsy Co <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Your Delivery is Scheduled! 🚚",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 32px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Delivery Confirmed! 🎉</h1>
              </div>
              
              <!-- Content -->
              <div style="padding: 32px;">
                <p style="font-size: 18px; color: #18181b; margin: 0 0 24px 0;">
                  Hi ${displayName},
                </p>
                
                <p style="font-size: 16px; color: #52525b; margin: 0 0 24px 0; line-height: 1.6;">
                  Great news! Your washer and dryer delivery and installation has been scheduled. Here are your delivery details:
                </p>
                
                <!-- Delivery Details Card -->
                <div style="background-color: #f0f9ff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #0ea5e9;">
                  <div style="margin-bottom: 16px;">
                    <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">📅 Date</p>
                    <p style="font-size: 18px; color: #18181b; font-weight: 600; margin: 0;">${formattedDate}</p>
                  </div>
                  
                  <div style="margin-bottom: 16px;">
                    <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">🕐 Time Window</p>
                    <p style="font-size: 18px; color: #18181b; font-weight: 600; margin: 0;">${safeTimeWindow}</p>
                  </div>
                  
                  <div>
                    <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">📍 Delivery Address</p>
                    <p style="font-size: 16px; color: #18181b; font-weight: 600; margin: 0;">${fullAddress}</p>
                  </div>
                </div>
                
                <!-- What to Expect -->
                <h3 style="font-size: 18px; color: #18181b; margin: 0 0 16px 0;">What to Expect</h3>
                <ul style="color: #52525b; font-size: 15px; line-height: 1.8; padding-left: 20px; margin: 0 0 24px 0;">
                  <li>Our team will arrive during your scheduled time window</li>
                  <li>Delivery and installation typically takes 30-45 minutes</li>
                  <li>We'll connect your machines and test them before leaving</li>
                  <li>Please ensure someone 18+ is home to receive the delivery</li>
                </ul>
                
                <!-- Contact Info -->
                <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                  <p style="font-size: 14px; color: #92400e; margin: 0;">
                    <strong>Need to reschedule?</strong> Contact us at <a href="tel:2289005544" style="color: #92400e;">(228) 900-5544</a> or reply to this email at least 24 hours before your scheduled delivery.
                  </p>
                </div>
                
                <p style="font-size: 16px; color: #52525b; margin: 0 0 8px 0;">
                  Thank you for choosing Sudsy Co!
                </p>
                <p style="font-size: 16px; color: #18181b; font-weight: 600; margin: 0;">
                  — The Sudsy Co Team
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f4f4f5; padding: 24px; text-align: center;">
                <p style="font-size: 14px; color: #71717a; margin: 0 0 8px 0;">
                  Sudsy Co Washer & Dryer Rentals
                </p>
                <p style="font-size: 12px; color: #a1a1aa; margin: 0;">
                  Serving the Mississippi Gulf Coast
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Delivery confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending delivery confirmation:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send confirmation email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
