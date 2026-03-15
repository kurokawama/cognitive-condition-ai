// Database types for Supabase (cognitive-condition-ai)
// v3 B2C-only: 4 tables — users, check_sessions, ai_conversations, daily_notes

export type SubscriptionPlan = "free" | "premium";

export interface User {
  id: string;
  email: string;
  display_name: string | null;
  subscription_plan: SubscriptionPlan;
  subscription_expires_at: string | null;
  streak_days: number;
  last_check_date: string | null;
  notification_enabled: boolean;
  notification_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface CheckSession {
  id: string;
  user_id: string;
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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}
