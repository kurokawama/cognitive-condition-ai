"use client";

import { useEffect, useState } from "react";
import { getAiAnalysis } from "@/app/actions/ai-analysis";
import { getRecentSessions } from "@/app/actions/check";
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
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-800">AIが分析しました</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">7日間のスコア推移</h2>
        <div className="mt-4">
          {isLoading ? (
            <div className="h-[200px] animate-pulse rounded-xl bg-slate-100" />
          ) : (
            <ScoreChart data={chartData} mode="analysis" height={200} />
          )}
        </div>
      </section>

      <section className="relative rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="space-y-4">
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">傾向サマリ</h2>
            <p className="mt-2 text-lg text-slate-700">{summaryText}</p>
          </article>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-800">仮説</h2>
            {hypothesisTexts.map((hypothesis, index) => (
              <HypothesisCard key={`${hypothesis}-${index}`} text={hypothesis} />
            ))}
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-800">アクション提案</h2>
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

        {isPremiumPreview && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm">
            <p className="rounded-full bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-sm">
              プレミアムで全て見る
            </p>
          </div>
        )}
      </section>

      {!isPremiumPreview && error && (
        <p className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-lg text-slate-700">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={() => window.alert("AIトーク機能は準備中です")}
        className="w-full rounded-xl bg-sky-500 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600"
      >
        AIトークで詳しく聞く
      </button>
    </div>
  );
}
