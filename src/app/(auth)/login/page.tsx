import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function LoginPage() {
  return (
    <div className="space-y-6 rounded-xl bg-surface p-6 shadow-sm md:p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-text-primary">ログイン / 新規登録</h1>
        <p className="text-lg text-text-secondary">メールアドレスで簡単ログイン</p>
      </div>
      <LoginForm />
    </div>
  );
}
