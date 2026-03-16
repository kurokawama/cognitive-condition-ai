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

export function canAccessAiTalk(user: User, talkCount: number): boolean {
  // Premium users always have access
  if (isPremium(user)) return true;
  // Free users get 1 free trial
  if (talkCount === 0) return true;
  return false;
}

export function getSubscriptionLabel(plan: SubscriptionPlan): string {
  return plan === "premium" ? "プレミアム" : "無料プラン";
}

// v3 B2C pricing: ¥580/month, ¥4,800/year
export const PRICING = {
  monthly: 580,
  yearly: 4800,
  yearlySavings: 2160, // 580*12 - 4800
  dailyCost: 13, // 4800/365
} as const;
