"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { z } from "zod";
import { login } from "@/app/actions/auth";

const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上です"),
});

type LoginFormState = {
  success: boolean;
  formError: string;
  fieldErrors: {
    email?: string;
    password?: string;
  };
};

const initialState: LoginFormState = {
  success: false,
  formError: "",
  fieldErrors: {},
};

export function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (_prevState: LoginFormState, formData: FormData): Promise<LoginFormState> => {
      const payload = {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      };

      const parsed = loginSchema.safeParse(payload);
      if (!parsed.success) {
        return {
          success: false,
          formError: "",
          fieldErrors: {
            email: parsed.error.flatten().fieldErrors.email?.[0],
            password: parsed.error.flatten().fieldErrors.password?.[0],
          },
        };
      }

      const result = await login(formData);
      if (result.error) {
        return {
          success: false,
          formError: result.error,
          fieldErrors: {},
        };
      }

      return {
        success: true,
        formError: "",
        fieldErrors: {},
      };
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
          className="min-h-12 w-full rounded-lg border border-slate-300 bg-surface px-4 text-lg text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-invalid={Boolean(state.fieldErrors.email)}
        />
        {state.fieldErrors.email ? (
          <p className="text-base text-warning">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-lg font-medium text-text-primary">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="min-h-12 w-full rounded-lg border border-slate-300 bg-surface px-4 text-lg text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-invalid={Boolean(state.fieldErrors.password)}
        />
        {state.fieldErrors.password ? (
          <p className="text-base text-warning">{state.fieldErrors.password}</p>
        ) : null}
      </div>

      {state.formError ? <p className="text-base text-warning">{state.formError}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "ログイン中..." : "ログイン"}
      </button>

      <div className="pt-1 text-center">
        <Link
          href="/auth/register"
          className="inline-flex items-center justify-center px-3 py-2 text-lg font-medium text-primary underline-offset-4 hover:underline"
        >
          新規登録はこちら
        </Link>
      </div>
    </form>
  );
}
