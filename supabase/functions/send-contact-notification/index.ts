import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message?: string;
  appliance?: string;
  problem_description?: string;
  preferred_date?: string;
  preferred_time?: string;
}

const inquiryLabels: Record<string, string> = {
  general: "General Question",
  repair: "Repair Request",
  pickup: "Pick Up Request",
};

// Rate limit: max emails per IP within time window
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ipRequestLog = new Map<string, { count: number; resetAt: number }>();

/**
 * Check if the request is rate limited by IP
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestLog.get(ip);
  
  if (!record || now > record.resetAt) {
    // Reset or create new record
    ipRequestLog.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  record.count++;
  return false;
}

/**
 * Escape HTML special characters to prevent XSS attacks in email content
 */
function escapeHtml(unsafe: string | null | undefined): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validate that the submission exists in the database, was created recently,
 * and hasn't already been notified. Returns the submission ID if valid.
 */
async function validateSubmission(
  supabaseClient: any,
  submissionData: ContactNotificationRequest
): Promise<string | null> {
  // Calculate the timestamp for 2 minutes ago (allow some delay for edge function invocation)
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  
  // Verify the submission exists, was created recently, and hasn't been notified yet
  const { data, error } = await supabaseClient
    .from("contact_submissions")
    .select("id, created_at, notification_sent")
    .eq("email", submissionData.email)
    .eq("name", submissionData.name)
    .eq("phone", submissionData.phone)
    .eq("inquiry_type", submissionData.inquiry_type)
    .eq("notification_sent", false)
    .gte("created_at", twoMinutesAgo)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error validating submission:", error);
    return null;
  }

  return data?.id || null;
}

/**
 * Mark a submission as notified to prevent duplicate emails
 */
async function markAsNotified(
  supabaseClient: any,
  submissionId: string
): Promise<void> {
  const { error } = await supabaseClient
    .from("contact_submissions")
    .update({ notification_sent: true })
    .eq("id", submissionId);

  if (error) {
    console.error("Error marking submission as notified:", error);
  }
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limit check by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    if (isRateLimited(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ success: false, error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Create Supabase client using service role to verify submission exists
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration is missing");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const data: ContactNotificationRequest = await req.json();

    // Validate required fields before proceeding
    if (!data.name || !data.email || !data.phone || !data.inquiry_type) {
      console.warn("Missing required fields in request");
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate that this submission exists, is recent, and hasn't been notified
    // This prevents direct API abuse and duplicate emails
    const submissionId = await validateSubmission(supabaseClient, data);
    if (!submissionId) {
      console.warn("Submission validation failed - no matching recent un-notified record");
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or already processed submission" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Sending contact notification for validated submission:", data.email);

    const resend = new Resend(resendApiKey);

    // Build the email content with escaped HTML to prevent XSS
    let detailsHtml = "";

    if (data.inquiry_type === "repair" && data.appliance) {
      detailsHtml += `
        <p><strong>Appliance:</strong> ${escapeHtml(data.appliance)}</p>
        <p><strong>Problem:</strong> ${escapeHtml(data.problem_description) || "Not specified"}</p>
      `;
    }

    if (data.preferred_date) {
      detailsHtml += `
        <p><strong>Preferred Date:</strong> ${escapeHtml(data.preferred_date)}</p>
        <p><strong>Preferred Time:</strong> ${escapeHtml(data.preferred_time) || "Not specified"}</p>
      `;
    }

    if (data.message) {
      detailsHtml += `<p><strong>Message:</strong> ${escapeHtml(data.message)}</p>`;
    }

    // Escape all user-provided data in the email HTML
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = escapeHtml(data.phone);
    const safeInquiryType = escapeHtml(inquiryLabels[data.inquiry_type] || data.inquiry_type);

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <hr />
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
      <p><strong>Inquiry Type:</strong> ${safeInquiryType}</p>
      ${detailsHtml}
      <hr />
      <p style="color: #666; font-size: 12px;">
        This notification was sent from your Sudsy Co. Rentals contact form.
      </p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Sudsy Co. Rentals <onboarding@resend.dev>",
      to: ["rob@sudsycorentals.com"],
      subject: `New ${inquiryLabels[data.inquiry_type] || "Contact"} from ${safeName}`,
      html: emailHtml,
      reply_to: data.email,
    });

    console.log("Email sent successfully:", emailResponse);

    // Mark the submission as notified to prevent duplicate emails
    await markAsNotified(supabaseClient, submissionId);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error sending contact notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
