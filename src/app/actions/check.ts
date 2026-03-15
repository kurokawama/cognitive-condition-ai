"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { generateScoreComment } from "@/lib/claude";
import type { CheckSession } from "@/types/database";

const scoreSchema = z.object({
  scoreTotal: z.number().min(0).max(100),
  scoreReaction: z.number().min(0).max(100),
  scoreMemory: z.number().min(0).max(100),
  scoreAttention: z.number().min(0).max(100),
  reactionTimes: z.array(z.number()),
  memoryCorrect: z.number().min(0),
  memoryTotal: z.number().min(0),
  attentionCorrect: z.number().min(0),
  attentionTotal: z.number().min(0),
  durationMs: z.number().min(0),
});

export async function saveCheckResult(input: z.infer<typeof scoreSchema>) {
  const parsed = scoreSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "入力データが不正です" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "認証が必要です" };

  // Check daily limit (1 check per day)
  const today = new Date().toISOString().slice(0, 10);
  const { data: existing } = await supabase
    .from("check_sessions")
    .select("id")
    .eq("user_id", user.id)
    .gte("created_at", `${today}T00:00:00`)
    .lt("created_at", `${today}T23:59:59`)
    .limit(1);

  if (existing && existing.length > 0) {
    return { error: "今日のチェックは完了済みです" };
  }

  // Get previous score for AI comment
  const { data: previousSession } = await supabase
    .from("check_sessions")
    .select("score_total")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const previousScore = previousSession?.score_total ?? null;

  // Generate AI comment
  let aiComment = "";
  let aiCommentTier: "positive" | "neutral" | "reflective" = "neutral";
  try {
    const result = await generateScoreComment(
      parsed.data.scoreTotal,
      parsed.data.scoreReaction,
      parsed.data.scoreMemory,
      parsed.data.scoreAttention,
      previousScore
    );
    aiComment = result.comment;
    aiCommentTier = result.tier;
  } catch {
    aiComment = "お疲れさまでした！";
  }

  // Save check session
  const { data: session, error } = await supabase
    .from("check_sessions")
    .insert({
      user_id: user.id,
      score_total: parsed.data.scoreTotal,
      score_reaction: parsed.data.scoreReaction,
      score_memory: parsed.data.scoreMemory,
      score_attention: parsed.data.scoreAttention,
      reaction_times: parsed.data.reactionTimes,
      memory_correct: parsed.data.memoryCorrect,
      memory_total: parsed.data.memoryTotal,
      attention_correct: parsed.data.attentionCorrect,
      attention_total: parsed.data.attentionTotal,
      ai_comment: aiComment,
      ai_comment_tier: aiCommentTier,
      duration_ms: parsed.data.durationMs,
    })
    .select()
    .single();

  if (error) return { error: "保存に失敗しました" };

  // Update streak
  await updateStreak(supabase, user.id, today);

  return { success: true, session };
}

async function updateStreak(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  today: string
) {
  const { data: profile } = await supabase
    .from("users")
    .select("last_check_date, streak_days")
    .eq("id", userId)
    .single();

  if (!profile) return;

  const lastDate = profile.last_check_date;
  const yesterday = new Date(new Date(today).getTime() - 86400000)
    .toISOString()
    .slice(0, 10);

  let newStreak = 1;
  if (lastDate === yesterday) {
    newStreak = profile.streak_days + 1;
  } else if (lastDate === today) {
    newStreak = profile.streak_days;
  }

  await supabase
    .from("users")
    .update({
      streak_days: newStreak,
      last_check_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
}

export async function getRecentSessions(days: number = 7): Promise<CheckSession[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const since = new Date(Date.now() - days * 86400000).toISOString();

  const { data } = await supabase
    .from("check_sessions")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  return (data as CheckSession[]) || [];
}

export async function getTodaySession(): Promise<CheckSession | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const today = new Date().toISOString().slice(0, 10);

  const { data } = await supabase
    .from("check_sessions")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", `${today}T00:00:00`)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return data as CheckSession | null;
}
