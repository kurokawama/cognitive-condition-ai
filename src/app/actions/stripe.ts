"use server";

import { createClient } from "@/lib/supabase/server";
import { stripe, PRICE_IDS } from "@/lib/stripe";

export async function createCheckoutSession(plan: "monthly" | "yearly") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "認証が必要です" };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const priceId = plan === "monthly" ? PRICE_IDS.monthly : PRICE_IDS.yearly;

  try {
    // Find or create Stripe customer
    const { data: profile } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/subscription?status=success`,
      cancel_url: `${appUrl}/subscription?status=cancel`,
      metadata: { supabase_user_id: user.id },
    });

    return { url: session.url };
  } catch {
    return { error: "決済セッションの作成に失敗しました" };
  }
}

export async function createPortalSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "認証が必要です" };

  const { data: profile } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return { error: "サブスクリプションが見つかりません" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${appUrl}/settings`,
    });

    return { url: session.url };
  } catch {
    return { error: "ポータルセッションの作成に失敗しました" };
  }
}
