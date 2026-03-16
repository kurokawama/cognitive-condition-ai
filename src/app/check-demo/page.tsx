"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AttentionTest } from "@/components/check/attention-test";
import { MemoryTest } from "@/components/check/memory-test";
import { ReactionTest } from "@/components/check/reaction-test";
import { calculateScore } from "@/lib/scoring";
import type { AttentionTrial, MemoryTrial, ReactionTrial, ScoreResult } from "@/types/check";

const TEST_LABELS = ["反応速度", "短期記憶", "注意切替"] as const;

type DemoPhase = "intro" | "testing" | "result";

export default function CheckDemoPage() {
  const startedAtRef = useRef(0);
  const reactionTrialsRef = useRef<ReactionTrial[]>([]);
  const memoryTrialsRef = useRef<MemoryTrial[]>([]);

  const [phase, setPhase] = useState<DemoPhase>("intro");
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [score, setScore] = useState<ScoreResult | null>(null);

  const progressText = `${currentTestIndex + 1}/3`;
  const progressWidth = `${((currentTestIndex + 1) / 3) * 100}%`;

  function startDemo() {
    startedAtRef.current = Date.now();
    setCurrentTestIndex(0);
    setScore(null);
    setPhase("testing");
  }

  function transitionTo(nextIndex: number) {
    setIsTransitioning(true);
    window.setTimeout(() => {
      setCurrentTestIndex(nextIndex);
      setIsTransitioning(false);
    }, 200);
  }

  function handleReactionComplete(trials: ReactionTrial[]) {
    reactionTrialsRef.current = trials;
    transitionTo(1);
  }

  function handleMemoryComplete(trials: MemoryTrial[]) {
    memoryTrialsRef.current = trials;
    transitionTo(2);
  }

  function handleAttentionComplete(trials: AttentionTrial[]) {
    const result = calculateScore(
      reactionTrialsRef.current,
      memoryTrialsRef.current,
      trials,
      startedAtRef.current
    );
    setScore(result);
    setPhase("result");
  }

  // Intro screen
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-slate-50 px-5 py-12">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-sky-100 bg-gradient-to-b from-sky-50 to-white p-8 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
            <h1 className="text-center text-2xl font-bold text-slate-800">
              無料チェック体験
            </h1>
            <p className="mt-3 text-center text-lg text-slate-600">
              3つの簡単なゲームで、今の認知コンディションをチェック
            </p>

            <div className="mt-8 space-y-4">
              {TEST_LABELS.map((label, i) => (
                <div key={label} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-lg font-bold text-sky-600">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-medium text-slate-800">{label}</p>
                    <p className="text-base text-slate-500">
                      {i === 0 && "画面が変わったらすぐタップ"}
                      {i === 1 && "表示された数字を覚えて回答"}
                      {i === 2 && "条件に合う方をすばやく選択"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-base text-slate-500">
              所要時間: 約1分 / アカウント不要
            </p>

            <button
              type="button"
              onClick={startDemo}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-sky-600"
            >
              チェックを始める
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Testing screen
  if (phase === "testing") {
    return (
      <div className="mx-auto flex w-full max-w-[28rem] flex-col gap-6 bg-slate-50 p-5">
        <header className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-base font-semibold text-amber-700">
              体験版
            </span>
            <h1 className="text-2xl font-bold text-slate-800">認知チェック</h1>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg text-slate-500">{TEST_LABELS[currentTestIndex]}</p>
            <span className="inline-flex min-h-12 items-center rounded-full bg-sky-50 px-3 py-1 text-lg font-semibold text-sky-600">
              {progressText}
            </span>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-green-500 transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
        </header>

        <div
          className={`rounded-3xl bg-white p-4 shadow-sm transition-opacity duration-200 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentTestIndex === 0 && <ReactionTest onComplete={handleReactionComplete} />}
          {currentTestIndex === 1 && <MemoryTest onComplete={handleMemoryComplete} />}
          {currentTestIndex === 2 && <AttentionTest onComplete={handleAttentionComplete} />}
        </div>
      </div>
    );
  }

  // Result screen (no save)
  return (
    <div className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-md space-y-6">
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-b from-sky-50 to-white p-8 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
          <p className="text-center text-base text-slate-500">あなたの認知コンディション</p>
          <p className="mt-2 text-center text-7xl font-bold text-sky-500">
            {score?.total ?? 0}
          </p>
          <p className="mt-1 text-center text-lg text-slate-500">/ 100</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "反応", value: score?.reaction ?? 0 },
              { label: "記憶", value: score?.memory ?? 0 },
              { label: "注意", value: score?.attention ?? 0 },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white p-3 text-center shadow-sm">
                <p className="text-base text-slate-500">{item.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">もっと詳しく知りたい方へ</h2>
          <ul className="mt-3 space-y-2 text-lg text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-sky-500">✓</span>
              <span>毎日の変化をグラフで追跡</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-sky-500">✓</span>
              <span>AIが傾向を分析してアドバイス</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-sky-500">✓</span>
              <span>生活習慣との関連を可視化</span>
            </li>
          </ul>
          <Link
            href="/login"
            className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-sky-600"
          >
            無料アカウントを作成
          </Link>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={startDemo}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            もう一度チェック
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
