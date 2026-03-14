// Subscription utilities (Phase 1: mock, Phase 2: Stripe)
import type { User, SubscriptionPlan } from "@/types/database";

export function isPremium(user: User): boolean {
  if (user.subscription_plan !== "premium") return false;
  if (!user.subscription_expires_at) return false;
  return new Date(user.subscription_expires_at) > new Date();
}

export function canAccessAiAnalysis(user: User, checkCount: number): boolean {
  // Premium users always have access
  if (isPremium(user)) return true;
  // Free users get 1 free trial on Day 7 (after 7th check)
  if (checkCount === 7) return true;
  return false;
}

export function canAccessAiTalk(user: User): boolean {
  return isPremium(user);
}

export function getSubscriptionLabel(plan: SubscriptionPlan): string {
  return plan === "premium" ? "プレミアム" : "無料プラン";
}

// Phase 1: Mock pricing
export const PRICING = {
  monthly: 980,
  yearly: 7800,
  yearlySavings: 3920, // 980*12 - 7800
} as const;
