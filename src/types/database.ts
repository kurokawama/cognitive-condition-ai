// Database types for Supabase (cognitive-condition-ai)
// Phase 1: 7 tables — users, check_sessions, ai_conversations, daily_notes, organizations, api_keys, org_analytics_cache

export type SubscriptionPlan = "free" | "premium";
export type UserRole = "user" | "org_admin";
export type OrgPlan = "basic" | "premium" | "whitelabel";

export interface User {
  id: string;
  email: string;
  display_name: string | null;
  subscription_plan: SubscriptionPlan;
  subscription_expires_at: string | null;
  org_id: string | null;
  role: UserRole;
  streak_days: number;
  last_check_date: string | null;
  skip_passes_remaining: number;
  notification_enabled: boolean;
  notification_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface CheckSession {
  id: string;
  user_id: string;
  org_id: string | null;
  score_total: number;
  score_reaction: number;
  score_memory: number;
  score_attention: number;
  reaction_times: number[];
  memory_correct: number;
  memory_total: number;
  attention_correct: number;
  attention_total: number;
  ai_comment: string | null;
  ai_comment_tier: AiCommentTier;
  duration_ms: number;
  created_at: string;
}

export type AiCommentTier = "positive" | "neutral" | "reflective";

export interface AiConversation {
  id: string;
  user_id: string;
  session_id: string | null;
  conversation_type: "analysis" | "talk";
  messages: AiMessage[];
  created_at: string;
}

export interface AiMessage {
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface DailyNote {
  id: string;
  user_id: string;
  check_session_id: string | null;
  sleep_quality: number;
  mood: number;
  busyness: number;
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  plan: OrgPlan;
  member_limit: number;
  created_at: string;
  updated_at: string;
}

export interface ApiKey {
  id: string;
  org_id: string;
  key_hash: string;
  label: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
}

export interface OrgAnalyticsCache {
  id: string;
  org_id: string;
  period_start: string;
  period_end: string;
  department: string | null;
  avg_score: number;
  participation_rate: number;
  trend_direction: "up" | "stable" | "down";
  cached_at: string;
}
