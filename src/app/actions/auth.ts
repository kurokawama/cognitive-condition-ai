"use server";

import { createClient, createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
});

const otpSchema = z.object({
  email: z.string().email(),
  token: z.string().length(6, "確認コードは6桁です"),
});

export async function sendOtp(formData: FormData) {
  const parsed = emailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error("[OTP Send Error]", error.message, error.status);
    if (error.status === 429) {
      return { error: "送信制限に達しました。1時間ほどお待ちいただくか、前回送信されたコードをご確認ください" };
    }
    return { error: "確認コードの送信に失敗しました。しばらくしてからお試しください" };
  }

  return { success: true };
}

export async function verifyOtp(formData: FormData) {
  const parsed = otpSchema.safeParse({
    email: formData.get("email"),
    token: formData.get("token"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email: parsed.data.email,
    token: parsed.data.token,
    type: "email",
  });

  if (error) {
    return { error: "確認コードが正しくありません" };
  }

  // Ensure user profile exists (use service client to bypass RLS)
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const serviceClient = await createServiceClient();
    const { data: existing } = await serviceClient
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existing) {
      await serviceClient.from("users").insert({
        id: user.id,
        email: user.email!,
        display_name: null,
        subscription_plan: "free",
        streak_days: 0,
        notification_enabled: false,
      });
    }
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}
