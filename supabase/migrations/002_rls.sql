-- 002_rls.sql: Row Level Security policies
-- Principle: users see only their own data. Org admins see aggregated org data only.

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_analytics_cache ENABLE ROW LEVEL SECURITY;

-- Users: own profile only
CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Check sessions: own sessions only
CREATE POLICY "check_sessions_select_own" ON check_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "check_sessions_insert_own" ON check_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AI conversations: own + premium only for read
CREATE POLICY "ai_conversations_select_own" ON ai_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "ai_conversations_insert_own" ON ai_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily notes: own only
CREATE POLICY "daily_notes_select_own" ON daily_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "daily_notes_insert_own" ON daily_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Organizations: org members can view their org
CREATE POLICY "organizations_select_member" ON organizations
  FOR SELECT USING (
    id IN (SELECT org_id FROM users WHERE users.id = auth.uid())
  );

-- API Keys: org admins only (Phase 2)
CREATE POLICY "api_keys_select_admin" ON api_keys
  FOR SELECT USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE users.id = auth.uid() AND users.role = 'org_admin'
    )
  );

-- Org Analytics Cache: org admins only (Phase 2)
CREATE POLICY "org_analytics_select_admin" ON org_analytics_cache
  FOR SELECT USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE users.id = auth.uid() AND users.role = 'org_admin'
    )
  );
