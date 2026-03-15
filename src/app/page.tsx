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
  const faqItems = [
    {
      question: "認知コンディションAIとは？",
      answer:
        "毎日1分間の認知チェックで頭のコンディションを数値化し、AIが変化のパターンを分析してパーソナルなアドバイスをお届けするウェルネスアプリです。",
    },
    {
      question: "個人情報は安全ですか？",
      answer: "すべてのデータは暗号化して安全に保管しています。第三者への提供は一切行いません。",
    },
    {
      question: "どのくらいの頻度で使うべき？",
      answer:
        "1日1回のチェックを推奨しています。毎日続けることで、ご自身の認知コンディションの変化パターンが見えてきます。",
    },
  ];

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
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
  const faqItems = [
    {
      question: "認知コンディションAIとは？",
      answer:
        "毎日1分間の認知チェックで頭のコンディションを数値化し、AIが変化のパターンを分析してパーソナルなアドバイスをお届けするウェルネスアプリです。",
    },
    {
      question: "個人情報は安全ですか？",
      answer: "すべてのデータは暗号化して安全に保管しています。第三者への提供は一切行いません。",
    },
    {
      question: "どのくらいの頻度で使うべき？",
      answer:
        "1日1回のチェックを推奨しています。毎日続けることで、ご自身の認知コンディションの変化パターンが見えてきます。",
    },
  ];

  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-slate-50 text-text-primary">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3">
            <span className="inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-text-primary">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sky-100 text-xl text-sky-600">
                🧠
              </span>
              認知コンディション AI
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center rounded-xl px-4 py-2 text-base text-text-secondary transition hover:bg-slate-100 hover:text-text-primary"
              >
                ログイン
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center rounded-xl bg-primary px-5 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-primary-hover"
              >
                無料で始める
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-b from-[#F0F7FF] to-white px-5 py-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <p className="text-base font-medium text-primary">毎日1分で、頭のコンディションを測る</p>
              <h1 className="mx-auto mt-4 max-w-[320px] text-[32px] font-bold leading-tight text-text-primary lg:mx-0">
                あなたの認知力、
                <br />
                今日は何点？
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary lg:mx-0">
                AIがあなたの認知パフォーマンスを記録し、最適なコンディション維持をサポートします
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
                <Link
                  href="/check-demo"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-primary-hover hover:shadow-lg"
                >
                  無料でチェックしてみる →
                </Link>
                <span className="text-base text-text-muted">アカウント不要・1分で完了</span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>スコア表示</span>
                  <span>今日</span>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="relative h-44 w-44">
                    <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
                      <circle cx="80" cy="80" r="64" strokeWidth="12" className="fill-none stroke-slate-200" />
                      <circle
                        cx="80"
                        cy="80"
                        r="64"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="fill-none stroke-sky-500"
                        strokeDasharray="402"
                        strokeDashoffset="72"
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <span className="text-5xl font-bold text-text-primary">82</span>
                      <span className="text-sm text-text-secondary">点</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-white p-3 text-center text-base text-text-secondary shadow-sm">
                  AIアドバイス
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-white px-5 py-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white sm:flex-row">
            <div className="flex min-h-12 flex-1 items-center justify-center px-4 py-3 text-base text-text-secondary">
              📊 25,000人以上が利用中
            </div>
            <div className="h-px bg-slate-200 sm:h-auto sm:w-px" />
            <div className="flex min-h-12 flex-1 items-center justify-center px-4 py-3 text-base text-text-secondary">
              ⭐ 4.7 / 5.0 評価
            </div>
            <div className="h-px bg-slate-200 sm:h-auto sm:w-px" />
            <div className="flex min-h-12 flex-1 items-center justify-center px-4 py-3 text-base text-text-secondary">
              🔒 データは暗号化
            </div>
          </div>
        </section>

        {/* 3 Steps */}
        <section className="bg-slate-100 px-5 py-16">
          <div className="mx-auto w-full max-w-5xl">
            <h2 className="text-center text-2xl font-bold text-text-primary">カンタン3ステップ</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { icon: "🧠", title: "60秒チェック", desc: "シンプルなゲーム形式のタスクで、楽しみながらチェック", color: "border-l-sky-500" },
                { icon: "📊", title: "スコア表示", desc: "5つの認知領域をわかりやすくスコア化", color: "border-l-green-500" },
                { icon: "✨", title: "AIアドバイス", desc: "あなた専用の改善ヒントをAIがお届け", color: "border-l-violet-500" },
              ].map((step) => (
                <article
                  key={step.title}
                  className={`rounded-xl border-l-4 bg-white p-5 shadow-sm ${step.color}`}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-2xl">
                    {step.icon}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-1 text-base text-text-secondary">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Preview */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-text-primary">今すぐ体験してみる</h2>
            <p className="mt-2 text-base text-text-secondary">アカウント不要・30秒で体験</p>
            <div className="mx-auto mt-6 w-full max-w-[340px] rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-lg">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-sky-100 text-3xl text-sky-600">
                🧩
              </div>
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
        <section className="bg-slate-100 px-5 py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-bold text-text-primary">シンプルな料金プラン</h2>
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
              <div className="relative rounded-2xl border-2 border-primary bg-white p-6 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
                <span className="absolute -right-2 -top-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  おすすめ
                </span>
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

        {/* FAQ */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="text-center text-2xl font-bold text-text-primary">よくある質問</h2>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
              {faqItems.map((faq, index) => (
                <details key={faq.question} className="group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 py-4 text-left text-lg font-semibold text-text-primary marker:content-none">
                    {faq.question}
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-5 w-5 text-text-secondary transition group-open:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-base text-text-secondary">{faq.answer}</div>
                  {index !== faqItems.length - 1 && <div className="h-px bg-slate-200" />}
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 px-5 py-10 text-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4">
            <div className="flex gap-6 text-base text-slate-400">
              <Link href="/about" className="inline-flex min-h-12 items-center hover:text-white">サービス概要</Link>
              <Link href="/terms" className="inline-flex min-h-12 items-center hover:text-white">利用規約</Link>
              <Link href="/blog" className="inline-flex min-h-12 items-center hover:text-white">ブログ</Link>
            </div>
            <p className="text-sm text-slate-500">© 2026 認知コンディション AI</p>
            <p className="text-xs text-slate-500">本サービスは医療診断を行うものではありません</p>
          </div>
        </footer>
      </div>
    </>
  );
}
