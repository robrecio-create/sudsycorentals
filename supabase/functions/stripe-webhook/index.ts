import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");
    logStep("Keys verified");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logStep("Webhook signature verification failed", { error: errorMessage });
      return new Response(JSON.stringify({ error: `Webhook Error: ${errorMessage}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    logStep("Event verified", { type: event.type, id: event.id });

    // Initialize Supabase client with service role key for admin operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      logStep("Processing checkout.session.completed", { sessionId: session.id });

      // Get customer details from Stripe
      const customerId = session.customer as string;
      if (!customerId) {
        logStep("No customer ID in session, skipping");
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
      logStep("Retrieved customer from Stripe", { 
        customerId, 
        email: customer.email,
        name: customer.name,
        phone: customer.phone 
      });

      // Get user_id from metadata if available
      const userId = session.metadata?.user_id;
      logStep("User ID from metadata", { userId });

      // Check if customer already exists in our database by email
      const { data: existingCustomer, error: fetchError } = await supabase
        .from("customers")
        .select("id")
        .eq("email", customer.email)
        .maybeSingle();

      if (fetchError) {
        logStep("Error checking for existing customer", { error: fetchError.message });
      }

      if (existingCustomer) {
        logStep("Customer already exists in database", { existingId: existingCustomer.id });
        return new Response(JSON.stringify({ received: true, message: "Customer already exists" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      // Insert new customer
      const { data: newCustomer, error: insertError } = await supabase
        .from("customers")
        .insert({
          name: customer.name || customer.email?.split("@")[0] || "New Customer",
          email: customer.email || "",
          phone: customer.phone || "",
          notes: `Stripe Customer ID: ${customerId}. Auto-created from subscription on ${new Date().toLocaleDateString()}.`,
        })
        .select()
        .single();

      if (insertError) {
        logStep("ERROR inserting customer", { error: insertError.message });
        // Don't fail the webhook - Stripe would retry
        return new Response(JSON.stringify({ received: true, error: insertError.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      logStep("Customer created successfully", { customerId: newCustomer.id, email: newCustomer.email });
    }

    // Handle subscription updates for additional customer info
    if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      logStep("Subscription event received", { 
        subscriptionId: subscription.id, 
        status: subscription.status,
        customerId: subscription.customer 
      });
      // Additional handling can be added here if needed
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
