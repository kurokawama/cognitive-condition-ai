import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

// Lazy-init to avoid build-time crash when env vars are missing
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      if (userId && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string,
          { expand: ["items.data"] }
        );
        const periodEnd = sub.items.data[0]?.current_period_end ?? 0;
        const expiresAt = new Date(periodEnd * 1000).toISOString();

        await getSupabaseAdmin()
          .from("users")
          .update({
            subscription_plan: "premium",
            subscription_expires_at: expiresAt,
            stripe_customer_id: session.customer as string,
          })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const itemPeriodEnd = subscription.items?.data[0]?.current_period_end ?? 0;
      const expiresAt = new Date(itemPeriodEnd * 1000).toISOString();
      const isActive = ["active", "trialing"].includes(subscription.status);

      await getSupabaseAdmin()
        .from("users")
        .update({
          subscription_plan: isActive ? "premium" : "free",
          subscription_expires_at: isActive ? expiresAt : null,
        })
        .eq("stripe_customer_id", customerId);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await getSupabaseAdmin()
        .from("users")
        .update({
          subscription_plan: "free",
          subscription_expires_at: null,
        })
        .eq("stripe_customer_id", customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
