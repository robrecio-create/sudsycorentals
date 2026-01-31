import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "resend";

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

    const resend = new Resend(resendApiKey);
    const data: ContactNotificationRequest = await req.json();

    console.log("Sending contact notification for:", data.email);

    // Build the email content
    let detailsHtml = "";

    if (data.inquiry_type === "repair" && data.appliance) {
      detailsHtml += `
        <p><strong>Appliance:</strong> ${data.appliance}</p>
        <p><strong>Problem:</strong> ${data.problem_description || "Not specified"}</p>
      `;
    }

    if (data.preferred_date) {
      detailsHtml += `
        <p><strong>Preferred Date:</strong> ${data.preferred_date}</p>
        <p><strong>Preferred Time:</strong> ${data.preferred_time || "Not specified"}</p>
      `;
    }

    if (data.message) {
      detailsHtml += `<p><strong>Message:</strong> ${data.message}</p>`;
    }

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <hr />
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
      <p><strong>Inquiry Type:</strong> ${inquiryLabels[data.inquiry_type] || data.inquiry_type}</p>
      ${detailsHtml}
      <hr />
      <p style="color: #666; font-size: 12px;">
        This notification was sent from your Sudsy Co. Rentals contact form.
      </p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Sudsy Co. Rentals <onboarding@resend.dev>",
      to: ["rob@sudsycorentals.com"],
      subject: `New ${inquiryLabels[data.inquiry_type] || "Contact"} from ${data.name}`,
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
