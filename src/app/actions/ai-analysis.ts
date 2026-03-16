"use server";

import { createClient } from "@/lib/supabase/server";
import { generateAnalysis, chat } from "@/lib/claude";
import { canAccessAiAnalysis, canAccessAiTalk } from "@/lib/subscription";
import type { User } from "@/types/database";
import type { AiAnalysisResult, ClaudeMessage } from "@/types/ai";

export async function getAiAnalysis(): Promise<
  { success: true; analysis: AiAnalysisResult } | { success: false; error: string }
> {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) return { success: false, error: "認証が必要です" };

  // Check subscription
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (!profile) return { success: false, error: "プロフィールが見つかりません" };

  // Count total checks for D7 free trial
  const { count } = await supabase
    .from("check_sessions")
    .select("id", { count: "exact" })
    .eq("user_id", authUser.id);

  if (!canAccessAiAnalysis(profile as User, count || 0)) {
    return { success: false, error: "AI分析はプレミアムプランの機能です" };
  }

  // Get last 7 days of sessions
  const since = new Date(Date.now() - 7 * 86400000).toISOString();
  const { data: sessions } = await supabase
    .from("check_sessions")
    .select("score_total, score_reaction, score_memory, score_attention, created_at")
    .eq("user_id", authUser.id)
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  const { data: notes } = await supabase
    .from("daily_notes")
    .select("sleep_quality, mood, busyness, created_at")
    .eq("user_id", authUser.id)
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  if (!sessions || sessions.length === 0) {
    return { success: false, error: "分析に必要なデータがありません。チェックを続けてください" };
  }

  try {
    const analysis = await generateAnalysis(sessions, notes || []);

    // Save conversation
    await supabase.from("ai_conversations").insert({
      user_id: authUser.id,
      conversation_type: "analysis",
      messages: [
        { role: "assistant", content: JSON.stringify(analysis), created_at: new Date().toISOString() },
      ],
    });

    return { success: true, analysis };
  } catch {
    return { success: false, error: "AI分析の生成に失敗しました" };
  }
}

export async function sendAiTalkMessage(
  conversationId: string | null,
  messages: ClaudeMessage[],
  userMessage: string
): Promise<
  { success: true; reply: string; conversationId: string } | { success: false; error: string }
> {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) return { success: false, error: "認証が必要です" };

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  // Count existing talk conversations
  const { count: talkCount } = await supabase
    .from("ai_conversations")
    .select("id", { count: "exact" })
    .eq("user_id", authUser.id)
    .eq("conversation_type", "talk");

  if (!profile || !canAccessAiTalk(profile as User, talkCount || 0)) {
    return { success: false, error: "AIトークはプレミアムプランの機能です" };
  }

  // Get recent scores for context
  const { data: recentSession } = await supabase
    .from("check_sessions")
    .select("score_total, score_reaction, score_memory, score_attention")
    .eq("user_id", authUser.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const context = recentSession
    ? `最新スコア: ${recentSession.score_total}/100 (反応${recentSession.score_reaction} 記憶${recentSession.score_memory} 注意${recentSession.score_attention})`
    : "スコアデータなし";

  const newMessages: ClaudeMessage[] = [
    ...messages,
    { role: "user" as const, content: userMessage },
  ];

  try {
    const reply = await chat(newMessages, context);

    // Save or update conversation
    const allMessages = [
      ...newMessages,
      { role: "assistant" as const, content: reply },
    ].map((m) => ({ ...m, created_at: new Date().toISOString() }));

    if (conversationId) {
      await supabase
        .from("ai_conversations")
        .update({ messages: allMessages })
        .eq("id", conversationId)
        .eq("user_id", authUser.id);
    } else {
      const { data } = await supabase
        .from("ai_conversations")
        .insert({
          user_id: authUser.id,
          conversation_type: "talk",
          messages: allMessages,
        })
        .select("id")
        .single();

      conversationId = data?.id || null;
    }

    return { success: true, reply, conversationId: conversationId! };
  } catch {
    return { success: false, error: "AIの応答生成に失敗しました" };
  }
}
