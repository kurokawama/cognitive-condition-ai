import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "認知コンディション 無料チェック体験",
  description: "アカウント不要で今すぐ認知チェックを体験。3問の簡単なゲームで頭のコンディションをチェックできます。",
};

export default function CheckDemoPage() {
  return (
    <div className="min-h-screen bg-bg px-5 py-12">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold text-text-primary">無料チェック体験</h1>
        <p className="mt-3 text-lg text-text-secondary">
          3問の簡単なゲームで、認知コンディションを体験チェック
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-5xl">🧠</div>
          <p className="mt-4 text-lg font-medium text-text-primary">準備はできましたか？</p>
          <p className="mt-2 text-base text-text-secondary">所要時間: 約30秒</p>
          <button className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-primary-hover">
            チェックを始める
          </button>
        </div>

        <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
          <p className="text-base text-text-secondary">
            もっと詳しく知りたい方は
          </p>
          <Link
            href="/login"
            className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-primary px-6 py-3 text-lg font-semibold text-primary transition hover:bg-primary/5"
          >
            無料アカウントを作成
          </Link>
        </div>
      </div>
    </div>
  );
}
