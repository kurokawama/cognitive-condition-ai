-- 001_initial.sql: Core tables for cognitive-condition-ai
-- 7 tables: users, check_sessions, ai_conversations, daily_notes, organizations, api_keys, org_analytics_cache

-- Organizations (Phase 2 active, Phase 1 schema only)
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'basic' CHECK (plan IN ('basic', 'premium', 'whitelabel')),
  member_limit INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Users (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  subscription_plan TEXT NOT NULL DEFAULT 'free' CHECK (subscription_plan IN ('free', 'premium')),
  subscription_expires_at TIMESTAMPTZ,
  org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'org_admin')),
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_check_date DATE,
  skip_passes_remaining INTEGER NOT NULL DEFAULT 1,
  notification_enabled BOOLEAN NOT NULL DEFAULT false,
  notification_time TIME,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Check sessions (daily cognitive check results)
CREATE TABLE IF NOT EXISTS check_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  score_total SMALLINT NOT NULL CHECK (score_total BETWEEN 0 AND 100),
  score_reaction SMALLINT NOT NULL CHECK (score_reaction BETWEEN 0 AND 100),
  score_memory SMALLINT NOT NULL CHECK (score_memory BETWEEN 0 AND 100),
  score_attention SMALLINT NOT NULL CHECK (score_attention BETWEEN 0 AND 100),
  reaction_times JSONB NOT NULL DEFAULT '[]',
  memory_correct SMALLINT NOT NULL DEFAULT 0,
  memory_total SMALLINT NOT NULL DEFAULT 0,
  attention_correct SMALLINT NOT NULL DEFAULT 0,
  attention_total SMALLINT NOT NULL DEFAULT 0,
  ai_comment TEXT,
  ai_comment_tier TEXT DEFAULT 'neutral' CHECK (ai_comment_tier IN ('positive', 'neutral', 'reflective')),
  duration_ms INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for check_sessions
CREATE INDEX idx_check_sessions_user_date ON check_sessions (user_id, created_at DESC);
CREATE INDEX idx_check_sessions_org ON check_sessions (org_id, created_at DESC) WHERE org_id IS NOT NULL;

-- AI conversations (analysis + talk)
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES check_sessions(id) ON DELETE SET NULL,
  conversation_type TEXT NOT NULL CHECK (conversation_type IN ('analysis', 'talk')),
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_conversations_user ON ai_conversations (user_id, created_at DESC);

-- Daily notes (mood/sleep/busyness)
CREATE TABLE IF NOT EXISTS daily_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  check_session_id UUID REFERENCES check_sessions(id) ON DELETE SET NULL,
  sleep_quality SMALLINT NOT NULL CHECK (sleep_quality BETWEEN 1 AND 5),
  mood SMALLINT NOT NULL CHECK (mood BETWEEN 1 AND 5),
  busyness SMALLINT NOT NULL CHECK (busyness BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_daily_notes_user ON daily_notes (user_id, created_at DESC);

-- API Keys (Phase 2)
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ
);

-- Org Analytics Cache (Phase 2)
CREATE TABLE IF NOT EXISTS org_analytics_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  department TEXT,
  avg_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  participation_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  trend_direction TEXT NOT NULL DEFAULT 'stable' CHECK (trend_direction IN ('up', 'stable', 'down')),
  cached_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create user profile on auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
