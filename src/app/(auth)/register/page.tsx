import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="space-y-6 rounded-xl bg-surface p-6 shadow-sm md:p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-text-primary">新規登録</h1>
        <p className="text-lg text-text-secondary">
          毎日1分の認知チェックで頭のコンディションを可視化
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
