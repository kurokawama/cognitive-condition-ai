"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateNotification(enabled: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "認証が必要です" };

  const { error } = await supabase
    .from("users")
    .update({ notification_enabled: enabled })
    .eq("id", user.id);

  if (error) return { error: "設定の保存に失敗しました" };
  return { success: true };
}

export async function exportUserData(): Promise<
  { success: true; csv: string } | { success: false; error: string }
> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "認証が必要です" };

  const { data: profile } = await supabase
    .from("users")
    .select("subscription_plan")
    .eq("id", user.id)
    .single();

  if (profile?.subscription_plan !== "premium") {
    return { success: false, error: "データエクスポートはプレミアムプランの機能です" };
  }

  const { data: sessions } = await supabase
    .from("check_sessions")
    .select("created_at, score_total, score_reaction, score_memory, score_attention, duration_ms")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (!sessions || sessions.length === 0) {
    return { success: false, error: "エクスポートするデータがありません" };
  }

  const header = "日時,総合スコア,反応,記憶,注意,所要時間(秒)";
  const rows = sessions.map((s) => {
    const date = new Date(s.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    return `${date},${s.score_total},${s.score_reaction},${s.score_memory},${s.score_attention},${(s.duration_ms / 1000).toFixed(1)}`;
  });

  return { success: true, csv: [header, ...rows].join("\n") };
}
