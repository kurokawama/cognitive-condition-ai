"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAiAnalysis } from "@/app/actions/ai-analysis";
import { getRecentSessions } from "@/app/actions/check";
import { AiTalk } from "@/components/ai/ai-talk";
import { AnalysisCard } from "@/components/ai/analysis-card";
import { HypothesisCard } from "@/components/ai/hypothesis-card";
import { ScoreChart, type ScoreChartPoint } from "@/components/chart/score-chart";
import type { AiAnalysisResult } from "@/types/ai";

const PREVIEW_SUMMARY =
  "AI分析では、日々の記録から傾向を読み解き、振り返りに役立つ気づきをまとめます。";

const PREVIEW_HYPOTHESES = [
  "生活リズムが整った日はスコアが安定する",
  "忙しさが高い日は注意スコアがゆるやかに変化する",
  "記録を続けるほど変化のパターンが見えやすくなる",
];

const PREVIEW_SUGGESTIONS = [
  {
    title: "睡眠の流れを確認する",
    description: "寝る時間と起きる時間を1週間だけそろえて変化を見てみましょう。",
    category: "sleep",
  },
  {
    title: "短い休憩を挟む",
    description: "日中に3分の休憩を入れると、切り替えがしやすくなるかもしれません。",
    category: "rest",
  },
  {
    title: "軽い活動を取り入れる",
    description: "短い散歩やストレッチを続けると、日々の安定につながるかもしれません。",
    category: "activity",
  },
] as const;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default function AiAnalysisPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPremiumPreview, setIsPremiumPreview] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [chartData, setChartData] = useState<ScoreChartPoint[]>([]);
  const [showTalk, setShowTalk] = useState(false);
  const [showPremiumInfo, setShowPremiumInfo] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      const [sessions, analysisResult] = await Promise.all([
        getRecentSessions(7),
        getAiAnalysis(),
      ]);

      if (!mounted) return;

      const mapped = sessions.map((session) => ({
        date: formatDate(session.created_at),
        score: session.score_total,
      }));
      setChartData(mapped);

      if (analysisResult.success) {
        setAnalysis(analysisResult.analysis);
        setError(null);
        setIsPremiumPreview(false);
      } else {
        setAnalysis(null);
        setError(analysisResult.error);
        setIsPremiumPreview(
          analysisResult.error === "AI分析はプレミアムプランの機能です"
        );
      }

      setIsLoading(false);
    }

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const summaryText = analysis?.summary ?? PREVIEW_SUMMARY;
  const hypothesisTexts = analysis
    ? analysis.hypotheses.map((hypothesis) => hypothesis.text)
    : PREVIEW_HYPOTHESES;
  const suggestions = analysis?.suggestions ?? PREVIEW_SUGGESTIONS;

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-4xl space-y-6 px-4 pb-8 pt-6 sm:px-6">
        <header className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-white p-6 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">AIが分析しました</h1>
          <p className="mt-2 text-lg text-slate-600">{summaryText}</p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-800">7日間のスコア推移</h2>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-base font-semibold text-sky-700">
              7日間
            </span>
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 p-3">
            {isLoading ? (
              <div className="h-[220px] animate-pulse rounded-xl bg-slate-100" />
            ) : (
              <ScoreChart data={chartData} mode="analysis" height={220} />
            )}
          </div>
        </section>

        <section className="space-y-4">
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-xl font-semibold text-slate-800">傾向サマリ</h2>
            <p className="mt-2 text-lg leading-relaxed text-slate-700">{summaryText}</p>
          </article>

          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className={isPremiumPreview ? "select-none blur-[2px]" : ""}>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800">仮説</h2>
                {hypothesisTexts.map((hypothesis, index) => (
                  <HypothesisCard key={`${hypothesis}-${index}`} text={hypothesis} />
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <h2 className="text-xl font-semibold text-slate-800">アクション提案</h2>
                <div className="grid gap-3 md:grid-cols-3">
                  {suggestions.map((suggestion, index) => (
                    <AnalysisCard
                      key={`${suggestion.title}-${index}`}
                      title={suggestion.title}
                      description={suggestion.description}
                      category={suggestion.category}
                    />
                  ))}
                </div>
              </div>
            </div>

            {isPremiumPreview && (
              <button
                type="button"
                onClick={() => setShowPremiumInfo(true)}
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/65 backdrop-blur-sm transition active:bg-white/75"
              >
                <span className="rounded-full bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600 active:scale-95">
                  タップしてプレミアムを見る
                </span>
              </button>
            )}
          </div>

          {/* Premium info panel */}
          {showPremiumInfo && (
            <div className="rounded-xl border border-sky-200 bg-gradient-to-b from-sky-50 to-white p-5 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800">プレミアムでできること</h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-base">
                    &#x1F4CA;
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">AI詳細分析</p>
                    <p className="text-base text-slate-500">7日間のデータからAIが傾向を分析し、仮説と改善提案をお届け</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-base">
                    &#x1F4AC;
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">AIトーク無制限</p>
                    <p className="text-base text-slate-500">あなたのスコアに基づいた個別アドバイスを毎日何度でも</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-base">
                    &#x1F4C8;
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">長期トレンド</p>
                    <p className="text-base text-slate-500">認知コンディションの変化を長期的に追跡・可視化</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/subscription"
                  className="flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 py-4 text-lg font-semibold text-white shadow-sm transition active:scale-[0.98] hover:bg-sky-600"
                >
                  月額580円ではじめる
                </Link>
                <p className="text-center text-base text-slate-400">年額プランなら1日たった13円</p>
                <button
                  type="button"
                  onClick={() => setShowPremiumInfo(false)}
                  className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-lg text-slate-500 transition hover:bg-slate-50"
                >
                  閉じる
                </button>
              </div>
            </div>
          )}
        </section>

        {!isPremiumPreview && error && (
          <p className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-lg text-slate-700">
            {error}
          </p>
        )}

        {showTalk ? (
          <AiTalk onClose={() => setShowTalk(false)} />
        ) : (
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-white to-sky-50 shadow-sm">
            <div className="px-5 pb-2 pt-5">
              <h2 className="text-xl font-semibold text-slate-800">AIに相談してみよう</h2>
              <p className="mt-1 text-base text-slate-500">あなたのスコアをもとにAIがアドバイス</p>
            </div>

            {/* Sample conversation preview */}
            <div className="mx-5 my-3 space-y-2 rounded-xl bg-white/80 p-4">
              <div className="flex justify-end">
                <span className="rounded-2xl bg-sky-500 px-4 py-2 text-base text-white">
                  最近スコアが下がり気味です
                </span>
              </div>
              <div className="flex justify-start">
                <span className="rounded-2xl bg-slate-100 px-4 py-2 text-base text-slate-700">
                  記録を拝見すると、注意力が少し変動している傾向がありますね。最近、睡眠のリズムに変化はありましたか？
                </span>
              </div>
              <div className="flex justify-end">
                <span className="rounded-2xl bg-sky-500 px-4 py-2 text-base text-white">
                  たしかに夜更かしが続いてます...
                </span>
              </div>
              <div className="flex justify-start">
                <span className="rounded-2xl bg-slate-100 px-4 py-2 text-base text-slate-700">
                  研究では、就寝時間を30分早めるだけでも翌日の注意力が改善する傾向があるそうですよ。まずは今週だけ試してみませんか？
                </span>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button
                type="button"
                onClick={() => setShowTalk(true)}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-4 text-lg font-semibold text-white shadow-sm transition active:scale-[0.98] hover:bg-sky-600"
              >
                無料でAIトークを体験する
              </button>
              <p className="mt-2 text-center text-base text-slate-400">
                初回1回無料 ・ プレミアムなら無制限
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
