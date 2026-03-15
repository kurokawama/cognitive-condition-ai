"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { saveCheckResult } from "@/app/actions/check";
import { AttentionTest } from "@/components/check/attention-test";
import { MemoryTest } from "@/components/check/memory-test";
import { ReactionTest } from "@/components/check/reaction-test";
import { calculateScore } from "@/lib/scoring";
import type { AttentionTrial, MemoryTrial, ReactionTrial } from "@/types/check";

const TEST_LABELS = ["反応速度", "短期記憶", "注意切替"] as const;

export default function CheckPage() {
  const router = useRouter();
  const startedAtRef = useRef(0);
  const reactionTrialsRef = useRef<ReactionTrial[]>([]);
  const memoryTrialsRef = useRef<MemoryTrial[]>([]);

  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const progressText = `${currentTestIndex + 1}/3`;
  const progressWidth = `${((currentTestIndex + 1) / 3) * 100}%`;

  const transitionTo = (nextIndex: number) => {
    setIsTransitioning(true);
    window.setTimeout(() => {
      setCurrentTestIndex(nextIndex);
      setIsTransitioning(false);
    }, 200);
  };

  const handleReactionComplete = (trials: ReactionTrial[]) => {
    reactionTrialsRef.current = trials;
    transitionTo(1);
  };

  const handleMemoryComplete = (trials: MemoryTrial[]) => {
    memoryTrialsRef.current = trials;
    transitionTo(2);
  };

  const handleAttentionComplete = async (trials: AttentionTrial[]) => {
    setErrorMessage(null);
    setIsSaving(true);

    const score = calculateScore(
      reactionTrialsRef.current,
      memoryTrialsRef.current,
      trials,
      startedAtRef.current
    );

    const result = await saveCheckResult({
      scoreTotal: score.total,
      scoreReaction: score.reaction,
      scoreMemory: score.memory,
      scoreAttention: score.attention,
      reactionTimes: score.reactionTimes,
      memoryCorrect: score.memoryCorrect,
      memoryTotal: score.memoryTotal,
      attentionCorrect: score.attentionCorrect,
      attentionTotal: score.attentionTotal,
      durationMs: score.durationMs,
    });

    if (result.error) {
      setIsSaving(false);
      setErrorMessage(result.error);
      return;
    }

    router.push("/result");
  };

  return (
    <div className="mx-auto flex w-full max-w-[28rem] flex-col gap-6 bg-slate-50 p-5">
      <header className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
        <h1 className="text-2xl font-bold text-slate-800">認知チェック</h1>
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
          isTransitioning || isSaving ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentTestIndex === 0 && <ReactionTest onComplete={handleReactionComplete} />}
        {currentTestIndex === 1 && <MemoryTest onComplete={handleMemoryComplete} />}
        {currentTestIndex === 2 && <AttentionTest onComplete={handleAttentionComplete} />}
      </div>

      {isSaving && (
        <div className="rounded-xl bg-white p-5 text-center shadow-sm">
          <p className="text-lg text-slate-700">結果を保存しています...</p>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
          <p className="text-base text-amber-700">{errorMessage}</p>
          <Link
            href="/result"
            className="mt-3 inline-flex min-h-12 items-center rounded-lg border border-sky-500 px-4 py-2 text-base font-semibold text-sky-600"
          >
            結果を見る
          </Link>
        </div>
      )}
    </div>
  );
}
