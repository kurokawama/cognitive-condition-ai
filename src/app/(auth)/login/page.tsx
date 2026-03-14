import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="space-y-6 rounded-xl bg-surface p-6 shadow-sm md:p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-text-primary">ログイン</h1>
        <p className="text-lg text-text-secondary">メールアドレスとパスワードを入力してください</p>
      </div>
      <LoginForm />
    </div>
  );
}
