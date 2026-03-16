import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

export const PRICE_IDS = {
  monthly: process.env.STRIPE_PRICE_MONTHLY || "price_1TBA2ZFujjNYtMrth9d5XQYv",
  yearly: process.env.STRIPE_PRICE_YEARLY || "price_1TBNTNFujjNYtMrtnJidUIpQ",
} as const;
