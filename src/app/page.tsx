import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "認知コンディション AI — 毎日1分で頭のコンディションを測る",
  description:
    "毎日1分の認知チェックで頭のコンディションを可視化。AIがあなたの認知パフォーマンスを記録し、最適なコンディション維持をサポートします。無料で始められます。",
  openGraph: {
    title: "認知コンディション AI — 頭の体重計",
    description: "毎日1分の認知チェックでコンディションを可視化。AIパーソナルコーチ付き。",
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "認知コンディション AI",
        description: "毎日1分の認知チェックで頭のコンディションを可視化するAIアプリ",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        offers: [
          { "@type": "Offer", price: "0", priceCurrency: "JPY", name: "無料プラン" },
          { "@type": "Offer", price: "580", priceCurrency: "JPY", name: "プレミアム月額" },
          { "@type": "Offer", price: "4800", priceCurrency: "JPY", name: "プレミアム年額" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "認知コンディションAIとは？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "毎日1分間の認知チェックで頭のコンディションを数値化し、AIが変化のパターンを分析してパーソナルなアドバイスをお届けするウェルネスアプリです。",
            },
          },
          {
            "@type": "Question",
            name: "個人情報は安全ですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "すべてのデータは暗号化して安全に保管しています。第三者への提供は一切行いません。",
            },
          },
          {
            "@type": "Question",
            name: "どのくらいの頻度で使うべき？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "1日1回のチェックを推奨しています。毎日続けることで、ご自身の認知コンディションの変化パターンが見えてきます。",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function LandingPage() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-bg">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3">
            <span className="text-lg font-semibold text-text-primary">
              認知コンディション AI
            </span>
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-3 py-2 text-base text-text-secondary hover:text-text-primary">
                ログイン
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-primary px-4 py-2 text-base font-medium text-white hover:bg-primary-hover"
              >
                無料で始める
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-white px-5 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-base font-medium text-primary">毎日1分で、頭のコンディションを測る</p>
            <h1 className="mt-3 text-3xl font-bold text-text-primary md:text-4xl">
              あなたの認知力、
              <br />
              今日は何点？
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-text-secondary">
              AIがあなたの認知パフォーマンスを記録し、最適なコンディション維持をサポートします
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                href="/check-demo"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-primary-hover"
              >
                無料でチェックしてみる →
              </Link>
              <span className="text-base text-text-muted">アカウント不要・1分で完了</span>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-y border-slate-100 bg-white px-5 py-6">
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-6 text-base text-text-secondary">
            <span>📊 25,000人以上が利用中</span>
            <span className="hidden sm:inline">|</span>
            <span>⭐ 4.7 / 5.0 評価</span>
            <span className="hidden sm:inline">|</span>
            <span>🔒 データは暗号化</span>
          </div>
        </section>

        {/* 3 Steps */}
        <section className="bg-slate-50 px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-semibold text-text-primary">カンタン3ステップ</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { icon: "🧠", title: "60秒チェック", desc: "シンプルなゲーム形式のタスクで、楽しみながらチェック", color: "border-l-sky-500" },
                { icon: "📊", title: "スコア表示", desc: "5つの認知領域をわかりやすくスコア化", color: "border-l-green-500" },
                { icon: "✨", title: "AIアドバイス", desc: "あなた専用の改善ヒントをAIがお届け", color: "border-l-violet-500" },
              ].map((step) => (
                <article key={step.title} className={`rounded-xl border-l-4 bg-white p-5 shadow-sm ${step.color}`}>
                  <div className="text-2xl">{step.icon}</div>
                  <h3 className="mt-2 text-lg font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-1 text-base text-text-secondary">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Preview */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-2xl font-semibold text-text-primary">今すぐ体験してみる</h2>
            <p className="mt-2 text-base text-text-secondary">アカウント不要・30秒で体験</p>
            <div className="mt-6 rounded-2xl bg-slate-50 p-8 shadow-lg">
              <div className="text-4xl">🧩</div>
              <p className="mt-3 text-lg text-text-primary">簡単なゲーム形式で認知力をチェック</p>
            </div>
            <Link
              href="/check-demo"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-primary-hover"
            >
              体験チェックを始める
            </Link>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="bg-slate-50 px-5 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-text-primary">シンプルな料金プラン</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary">無料プラン</h3>
                <p className="mt-2 text-3xl font-bold text-text-primary">¥0<span className="text-base font-normal text-text-secondary">/月</span></p>
                <ul className="mt-4 space-y-2 text-left text-base text-text-secondary">
                  <li>✓ 1日1回チェック</li>
                  <li>✓ 基本スコア表示</li>
                  <li>✓ 7日間の履歴</li>
                </ul>
              </div>
              <div className="relative rounded-2xl border-2 border-primary bg-white p-6 shadow-md">
                <span className="absolute -right-2 -top-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">おすすめ</span>
                <h3 className="text-lg font-semibold text-primary">プレミアム</h3>
                <p className="mt-2 text-3xl font-bold text-text-primary">¥580<span className="text-base font-normal text-text-secondary">/月</span></p>
                <p className="text-base text-accent">年額¥4,800（月¥400）</p>
                <ul className="mt-4 space-y-2 text-left text-base text-text-primary">
                  <li className="text-primary">✓ チェック回数無制限</li>
                  <li className="text-primary">✓ 全認知領域の詳細分析</li>
                  <li className="text-primary">✓ AIパーソナルコーチ</li>
                  <li className="text-primary">✓ 90日間のトレンド分析</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-base text-text-muted">1日あたり約¥19 — いつでも解約可能</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 px-5 py-10 text-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4">
            <div className="flex gap-6 text-base text-slate-400">
              <Link href="/about" className="hover:text-white">サービス概要</Link>
              <Link href="/terms" className="hover:text-white">利用規約</Link>
              <Link href="/blog" className="hover:text-white">ブログ</Link>
            </div>
            <p className="text-sm text-slate-500">© 2026 認知コンディション AI</p>
            <p className="text-xs text-slate-500">本サービスは医療診断を行うものではありません</p>
          </div>
        </footer>
      </div>
    </>
  );
}
