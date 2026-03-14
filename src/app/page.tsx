import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          認知コンディション AI
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          毎日1分の認知チェックで
          <br />
          頭のコンディションを可視化
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/auth/register"
            className="flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            無料で始める
          </Link>
          <Link
            href="/auth/login"
            className="flex min-h-12 items-center justify-center rounded-xl border-2 border-primary px-6 py-4 text-lg font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
