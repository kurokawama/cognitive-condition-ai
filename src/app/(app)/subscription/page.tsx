"use client";

import { useState } from "react";
import { PRICING } from "@/lib/subscription";

type BillingCycle = "monthly" | "yearly";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const yearlyMonthlyEquivalent = Math.round(PRICING.yearly / 12);
  const savingsRate = Math.round((1 - PRICING.yearly / (PRICING.monthly * 12)) * 100);
  const yearlySavingsLabel = `年間 ¥${PRICING.yearlySavings.toLocaleString()} お得`;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-5xl space-y-8 px-4 pb-40 pt-6 sm:px-6">
        <header className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-green-50 p-6 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
          <div className="grid gap-5 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div className="space-y-3">
              <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-base font-semibold text-sky-700">
                プレミアムプラン
              </p>
              <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                あなたの認知コンディションを、もっと深く理解する
              </h1>
              <p className="text-lg text-slate-600">こんなことが分かるようになります</p>
            </div>
            <div className="relative mx-auto h-36 w-36">
              <div className="absolute inset-0 rounded-full bg-sky-100 blur-xl" />
              <div className="absolute -right-1 top-3 h-12 w-12 rounded-full bg-green-100" />
              <div className="absolute bottom-1 left-2 h-10 w-10 rounded-full bg-amber-100" />
              <div className="relative flex h-full items-center justify-center rounded-[2rem] border border-white/70 bg-white/80 text-5xl shadow-md">
                🧠
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              AIがあなたの傾向を分析
            </h2>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">睡眠との関連を発見</h2>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">最適な行動を提案</h2>
          </article>
        </section>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`min-h-12 rounded-full px-5 py-2 text-lg font-semibold transition ${
                  billingCycle === "monthly"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-700 hover:bg-slate-200"
                }`}
              >
                月額
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`min-h-12 rounded-full px-5 py-2 text-lg font-semibold transition ${
                  billingCycle === "yearly"
                    ? "bg-sky-500 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-200"
                }`}
              >
                年額
              </button>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-base font-semibold text-green-700">
              {savingsRate}%おトク
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article
              className={`relative rounded-xl border bg-white p-5 ${
                billingCycle === "yearly"
                  ? "border-2 border-sky-500 shadow-[0_8px_30px_rgba(14,165,233,0.12)]"
                  : "border-[1.5px] border-slate-200 shadow-sm"
              }`}
            >
              <span className="absolute right-4 top-4 rounded-full bg-sky-500 px-3 py-1 text-base font-semibold text-white">
                おすすめ
              </span>
              <h3 className="text-xl font-semibold text-slate-800">年額</h3>
              <p className="mt-2 text-4xl font-bold text-slate-800">
                ¥{PRICING.yearly.toLocaleString()}
                <span className="ml-1 text-lg font-medium text-slate-600">/年</span>
              </p>
              <p className="mt-1 text-base text-slate-500">
                （月あたり¥{yearlyMonthlyEquivalent.toLocaleString()}）
              </p>
              <p className="mt-2 text-base text-slate-400 line-through">
                ¥{PRICING.monthly.toLocaleString()}
              </p>
              <p className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-base font-semibold text-green-700">
                {yearlySavingsLabel}
              </p>
              <p className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-base text-slate-700">
                <span aria-hidden className="text-amber-500">
                  ☕
                </span>
                1日あたり約¥{PRICING.dailyCost} — コーヒー1杯より手軽に
              </p>

              <ul className="mt-4 space-y-2">
                {[
                  "AIがあなたの傾向を分析",
                  "睡眠との関連を発見",
                  "最適な行動を提案",
                  "7日間のスコア推移",
                  "AIトーク",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-base text-slate-700">
                    <span
                      aria-hidden
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700"
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => window.alert("決済機能は準備中です")}
                className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-green-800 px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-green-900"
              >
                年額プランで始める
              </button>
            </article>

            <article
              className={`rounded-xl border bg-white p-5 ${
                billingCycle === "monthly"
                  ? "border-2 border-sky-500 shadow-[0_8px_30px_rgba(14,165,233,0.12)]"
                  : "border-[1.5px] border-slate-200 shadow-sm"
              }`}
            >
              <h3 className="text-xl font-semibold text-slate-800">月額</h3>
              <p className="mt-2 text-4xl font-bold text-slate-800">
                ¥{PRICING.monthly.toLocaleString()}
                <span className="ml-1 text-lg font-medium text-slate-600">/月</span>
              </p>
              <p className="mt-1 text-base text-slate-500">いつでもキャンセルできます</p>
              <button
                type="button"
                onClick={() => window.alert("決済機能は準備中です")}
                className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-green-800 bg-white px-6 py-3 text-lg font-semibold text-green-900 shadow-sm transition hover:bg-green-50"
              >
                月額プランで始める
              </button>
            </article>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-base leading-6 text-slate-700">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-800">機能</th>
                <th className="px-4 py-3 font-semibold text-slate-800">無料</th>
                <th className="px-4 py-3 font-semibold text-slate-800">プレミアム</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["7日推移", "○", "○"],
                ["90日推移", "—", "○"],
                ["AI分析", "一部", "○"],
                ["AIトーク", "—", "○"],
                ["データエクスポート", "—", "○"],
              ].map((row, index) => (
                <tr key={row[0]} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-3">{row[0]}</td>
                  <td className="px-4 py-3">{row[1]}</td>
                  <td className="px-4 py-3">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: "🔒", label: "解約自由", bg: "bg-sky-100 text-sky-700" },
            { icon: "💳", label: "安全決済", bg: "bg-green-100 text-green-700" },
            { icon: "📱", label: "全デバイス", bg: "bg-violet-100 text-violet-700" },
          ].map((signal) => (
            <article
              key={signal.label}
              className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <span
                className={`mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full text-xl ${signal.bg}`}
                aria-hidden
              >
                {signal.icon}
              </span>
              <p className="mt-2 text-lg font-semibold text-slate-700">{signal.label}</p>
            </article>
          ))}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {[
            {
              q: "プレミアムで見られる内容は何ですか？",
              a: "AI分析や90日推移、AIトークなどをまとめて利用できます。",
            },
            {
              q: "年額と月額はいつでも切り替えできますか？",
              a: "次回更新タイミングで切り替えできます。",
            },
            {
              q: "無料で使える範囲はありますか？",
              a: "7日推移などの基本機能は無料で利用できます。",
            },
          ].map((faq, index) => (
            <details
              key={faq.q}
              className={`group px-4 py-3 ${index !== 0 ? "border-t border-slate-200" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-lg font-semibold text-slate-800">
                {faq.q}
                <span className="text-slate-500 transition group-open:rotate-180">⌃</span>
              </summary>
              <p className="pt-2 text-base text-slate-600">{faq.a}</p>
            </details>
          ))}
        </section>

        <button
          type="button"
          onClick={() => window.alert("決済機能は準備中です")}
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600"
        >
          プレミアムを始める
        </button>

        <p className="text-center text-base text-slate-500">いつでもキャンセルできます</p>
      </div>

      <div className="fixed inset-x-0 bottom-20 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
        <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            onClick={() => window.alert("決済機能は準備中です")}
            className="flex min-h-12 w-full flex-col items-center justify-center rounded-xl bg-green-800 px-4 py-3 text-white"
          >
            <span className="text-lg font-semibold">
              年額プランで始める — ¥{PRICING.yearly.toLocaleString()}/年
            </span>
            <span className="text-base text-green-100">7日間の無料トライアル付き</span>
          </button>
        </div>
      </div>
    </div>
  );
}
