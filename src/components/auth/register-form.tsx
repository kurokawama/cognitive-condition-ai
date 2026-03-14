"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { z } from "zod";
import { register } from "@/app/actions/auth";

const registerSchema = z.object({
  displayName: z.string().min(1, "表示名を入力してください").max(50, "表示名は50文字以内です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上です"),
  agreeToTerms: z.boolean().refine((value) => value, {
    message: "利用規約に同意してください",
  }),
});

type RegisterFormState = {
  success: boolean;
  formError: string;
  fieldErrors: {
    displayName?: string;
    email?: string;
    password?: string;
    agreeToTerms?: string;
  };
};

const initialState: RegisterFormState = {
  success: false,
  formError: "",
  fieldErrors: {},
};

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (_prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> => {
      const payload = {
        displayName: String(formData.get("displayName") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        agreeToTerms: formData.get("agreeToTerms") === "on",
      };

      const parsed = registerSchema.safeParse(payload);
      if (!parsed.success) {
        return {
          success: false,
          formError: "",
          fieldErrors: {
            displayName: parsed.error.flatten().fieldErrors.displayName?.[0],
            email: parsed.error.flatten().fieldErrors.email?.[0],
            password: parsed.error.flatten().fieldErrors.password?.[0],
            agreeToTerms: parsed.error.flatten().fieldErrors.agreeToTerms?.[0],
          },
        };
      }

      const result = await register(formData);
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
      <div className="rounded-xl border border-sky-100 bg-sky-50/70 px-4 py-3 shadow-sm">
        <p className="text-lg font-semibold text-text-primary">3タップでオンボーディング完了</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="displayName" className="text-lg font-medium text-text-primary">
          表示名
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="name"
          className="min-h-12 w-full rounded-lg border border-slate-300 bg-surface px-4 text-lg text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-invalid={Boolean(state.fieldErrors.displayName)}
        />
        {state.fieldErrors.displayName ? (
          <p className="text-base text-warning">{state.fieldErrors.displayName}</p>
        ) : null}
      </div>

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
          autoComplete="new-password"
          className="min-h-12 w-full rounded-lg border border-slate-300 bg-surface px-4 text-lg text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-invalid={Boolean(state.fieldErrors.password)}
        />
        {state.fieldErrors.password ? (
          <p className="text-base text-warning">{state.fieldErrors.password}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-3 text-lg text-text-primary">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/40"
            aria-invalid={Boolean(state.fieldErrors.agreeToTerms)}
          />
          <span>利用規約に同意します</span>
        </label>
        <Link
          href="/terms"
          className="inline-flex items-center justify-center px-3 py-2 text-lg font-medium text-primary underline-offset-4 hover:underline"
        >
          利用規約
        </Link>
        {state.fieldErrors.agreeToTerms ? (
          <p className="text-base text-warning">{state.fieldErrors.agreeToTerms}</p>
        ) : null}
      </div>

      {state.formError ? <p className="text-base text-warning">{state.formError}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "登録中..." : "新規登録"}
      </button>
    </form>
  );
}
