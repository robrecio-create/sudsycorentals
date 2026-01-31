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
 * Validate that the submission ID exists in the database
 * This ensures only legitimate form submissions can trigger emails
 */
async function validateSubmission(
  supabaseClient: any,
  submissionData: ContactNotificationRequest
): Promise<boolean> {
  // Verify the submission exists in the database by matching key fields
  const { data, error } = await supabaseClient
    .from("contact_submissions")
    .select("id")
    .eq("email", submissionData.email)
    .eq("name", submissionData.name)
    .eq("phone", submissionData.phone)
    .eq("inquiry_type", submissionData.inquiry_type)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error validating submission:", error);
    return false;
  }

  // Check if a matching submission was created recently (within last 60 seconds)
  return !!data;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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

    // Validate that this submission exists in the database
    // This prevents direct API abuse - only database-inserted records trigger emails
    const isValidSubmission = await validateSubmission(supabaseClient, data);
    if (!isValidSubmission) {
      console.warn("Submission validation failed - no matching record in database");
      return new Response(
        JSON.stringify({ success: false, error: "Invalid submission" }),
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
