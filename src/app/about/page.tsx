import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サービス概要",
  description: "認知コンディションAIは毎日1分の認知チェックで頭のコンディションを可視化するウェルネスアプリです。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-text-primary">認知コンディション AIとは</h1>

        <section className="mt-8 space-y-4 text-lg text-text-secondary">
          <p>
            認知コンディション AIは、毎日たった1分の認知チェックで
            頭のコンディションを数値化し、AIがパターンを分析して
            パーソナルなアドバイスをお届けするウェルネスアプリです。
          </p>
          <p>
            「頭の体重計」というコンセプトのもと、
            日々の認知パフォーマンスの変化を可視化。
            体重計のように毎日測ることで、自分の状態をより深く理解できます。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-text-primary">特徴</h2>
          <ul className="mt-4 space-y-3 text-lg text-text-secondary">
            <li>✓ 60秒で完了する認知チェック（反応速度・記憶力・注意力）</li>
            <li>✓ AIによるスコア分析とパーソナルアドバイス</li>
            <li>✓ 日々の変化を見える化するトレンドグラフ</li>
            <li>✓ 継続を楽しくするストリーク機能</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-text-primary">安全性について</h2>
          <p className="mt-3 text-lg text-text-secondary">
            本サービスは医療診断を行うものではありません。
            認知機能のコンディションを日々のウェルネス習慣として
            把握するためのツールです。
            すべてのデータは暗号化して安全に保管しています。
          </p>
        </section>

        <div className="mt-10">
          <Link
            href="/check-demo"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-8 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-primary-hover"
          >
            無料で体験してみる →
          </Link>
        </div>
      </div>
    </div>
  );
}
