"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const noteSchema = z.object({
  checkSessionId: z.string().uuid().nullable(),
  sleepQuality: z.number().min(1).max(5),
  mood: z.number().min(1).max(5),
  busyness: z.number().min(1).max(5),
});

export async function saveNote(input: z.infer<typeof noteSchema>) {
  const parsed = noteSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "入力データが不正です" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "認証が必要です" };

  const { error } = await supabase.from("daily_notes").insert({
    user_id: user.id,
    check_session_id: parsed.data.checkSessionId,
    sleep_quality: parsed.data.sleepQuality,
    mood: parsed.data.mood,
    busyness: parsed.data.busyness,
  });

  if (error) return { error: "保存に失敗しました" };
  return { success: true };
}

export async function getRecentNotes(days: number = 7) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const since = new Date(Date.now() - days * 86400000).toISOString();

  const { data } = await supabase
    .from("daily_notes")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  return data || [];
}
