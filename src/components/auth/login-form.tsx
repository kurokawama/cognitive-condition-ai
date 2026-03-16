"use client";

import { useRouter } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import { signIn, signUp } from "@/app/actions/auth";

type FormState = {
  success: boolean;
  error: string;
};

const initialState: FormState = { success: false, error: "" };

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [state, formAction, pending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const action = mode === "signin" ? signIn : signUp;
      const result = await action(formData);
      if (result.error) return { success: false, error: result.error };
      return { success: true, error: "" };
    },
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/home");
    }
  }, [router, state.success]);

  return (
    <form action={formAction} noValidate className="space-y-5">
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

      <div className="space-y-2">
        <label htmlFor="password" className="text-lg font-medium text-text-primary">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          placeholder="6文字以上"
          className="min-h-12 w-full rounded-lg border border-slate-300 bg-surface px-4 text-lg text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {state.error ? (
        <p className="text-base text-warning">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending
          ? "処理中..."
          : mode === "signin"
            ? "ログイン"
            : "新規登録"}
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
        }}
        className="flex min-h-12 w-full items-center justify-center text-lg text-primary hover:underline"
      >
        {mode === "signin"
          ? "アカウントをお持ちでない方はこちら"
          : "既にアカウントをお持ちの方はこちら"}
      </button>
    </form>
  );
}
