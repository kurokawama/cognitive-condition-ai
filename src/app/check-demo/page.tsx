import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "認知コンディション 無料チェック",
  description: "アカウント不要で今すぐ認知チェックを体験。3問の簡単なゲームで頭のコンディションをチェックできます。",
};

export default function CheckDemoPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">無料チェック体験</h1>
          <p className="mt-3 text-lg text-text-secondary">
            3問の簡単なゲームで、認知コンディションを体験チェック
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
            <div className="flex items-center justify-between text-base text-text-secondary">
              <span>3 / 3</span>
              <span>所要時間: 約30秒</span>
            </div>
            <div className="mt-6 text-5xl">🧠</div>
            <p className="mt-4 text-lg font-medium text-text-primary">準備はできましたか？</p>
            <button className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-primary-hover">
              チェックを始める
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-left">
              <p className="text-lg font-medium text-text-primary">認知コンディションを体験チェック</p>
              <p className="mt-2 text-base text-text-secondary">3問の簡単なゲームで、認知コンディションを体験チェック</p>
            </div>
            <div className="mt-6 rounded-xl bg-slate-50 p-5 text-left">
              <p className="text-base text-text-secondary">もっと詳しく知りたい方は</p>
              <Link
                href="/login"
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-primary px-6 py-3 text-lg font-semibold text-primary transition hover:bg-primary/5"
              >
                無料アカウントを作成
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
