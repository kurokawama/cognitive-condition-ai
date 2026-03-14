"use client";

import { useState } from "react";
import { PRICING } from "@/lib/subscription";

type BillingCycle = "monthly" | "yearly";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-slate-800">
          あなたの認知コンディションを、もっと深く理解する
        </h1>
        <p className="text-lg text-slate-600">こんなことが分かるようになります</p>
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

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`flex-1 rounded-xl px-4 py-3 text-lg font-semibold transition ${
              billingCycle === "monthly"
                ? "bg-sky-500 text-white"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            月額
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className={`flex-1 rounded-xl px-4 py-3 text-lg font-semibold transition ${
              billingCycle === "yearly"
                ? "bg-sky-500 text-white"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            年額
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article
            className={`rounded-xl border p-4 shadow-sm ${
              billingCycle === "monthly"
                ? "border-sky-500 bg-sky-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold text-slate-800">月額</h3>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              ¥{PRICING.monthly}
              <span className="ml-1 text-lg font-medium text-slate-600">/月</span>
            </p>
          </article>

          <article
            className={`rounded-xl border p-4 shadow-sm ${
              billingCycle === "yearly"
                ? "border-sky-500 bg-sky-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-semibold text-slate-800">年額</h3>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-base font-semibold text-amber-700">
                年間3,920円お得
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              ¥{PRICING.yearly}
              <span className="ml-1 text-lg font-medium text-slate-600">/年</span>
            </p>
          </article>
        </div>
      </section>

      <button
        type="button"
        onClick={() => window.alert("決済機能は準備中です")}
        className="w-full rounded-xl bg-sky-500 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600"
      >
        プレミアムを始める
      </button>

      <p className="text-center text-base text-slate-500">いつでもキャンセルできます</p>
    </div>
  );
}
