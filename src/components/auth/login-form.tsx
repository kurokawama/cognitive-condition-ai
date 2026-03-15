"use client";

import { useRouter } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import { sendOtp, verifyOtp } from "@/app/actions/auth";

type FormState = {
  success: boolean;
  error: string;
};

const initialState: FormState = { success: false, error: "" };

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");

  const [emailState, emailAction, emailPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const result = await sendOtp(formData);
      if (result.error) return { success: false, error: result.error };
      setEmail(String(formData.get("email") ?? ""));
      setStep("otp");
      return { success: true, error: "" };
    },
    initialState
  );

  const [otpState, otpAction, otpPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const result = await verifyOtp(formData);
      if (result.error) return { success: false, error: result.error };
      return { success: true, error: "" };
    },
    initialState
  );

  useEffect(() => {
    if (otpState.success) {
      router.push("/home");
    }
  }, [router, otpState.success]);

  if (step === "email") {
    return (
      <form action={emailAction} noValidate className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-lg font-medium text-text-primary">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            className="min-h-12 w-full rounded-lg border border-slate-300 bg-surface px-4 text-lg text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {emailState.error ? (
          <p className="text-base text-warning">{emailState.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={emailPending}
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {emailPending ? "送信中..." : "確認コードを送信"}
        </button>

        <p className="text-center text-base text-text-secondary">
          パスワード不要 — メールに届く6桁コードでログイン
        </p>
      </form>
    );
  }

  return (
    <form action={otpAction} noValidate className="space-y-5">
      <input type="hidden" name="email" value={email} />

      <p className="text-center text-lg text-text-secondary">
        <span className="font-medium text-text-primary">{email}</span>
        <br />に確認コードを送信しました
      </p>

      <div className="space-y-2">
        <label htmlFor="token" className="text-lg font-medium text-text-primary">
          確認コード（6桁）
        </label>
        <input
          id="token"
          name="token"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          autoComplete="one-time-code"
          placeholder="000000"
          className="min-h-12 w-full rounded-lg border border-slate-300 bg-surface px-4 text-center text-2xl font-mono tracking-[0.5em] text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {otpState.error ? (
        <p className="text-base text-warning">{otpState.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={otpPending}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {otpPending ? "確認中..." : "ログイン"}
      </button>

      <button
        type="button"
        onClick={() => setStep("email")}
        className="flex min-h-12 w-full items-center justify-center text-lg text-primary hover:underline"
      >
        メールアドレスを変更
      </button>
    </form>
  );
}
