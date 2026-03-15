"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactionTrial } from "@/types/check";

interface ReactionTestProps {
  onComplete: (trials: ReactionTrial[]) => void;
}

const TRIAL_COUNT = 5;

export function ReactionTest({ onComplete }: ReactionTestProps) {
  const [phase, setPhase] = useState<"intro" | "waiting" | "ready" | "completed">("intro");
  const [trialIndex, setTrialIndex] = useState(0);
  const [trials, setTrials] = useState<ReactionTrial[]>([]);
  const [currentDelayMs, setCurrentDelayMs] = useState(0);
  const [tapped, setTapped] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startTrial = useCallback(() => {
    clearTimer();
    const delayMs = Math.floor(Math.random() * 2001) + 1000;
    setCurrentDelayMs(delayMs);
    setPhase("waiting");

    timeoutRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setPhase("ready");
    }, delayMs);
  }, [clearTimer]);

  const handleTap = () => {
    if (phase !== "ready") return;

    // Haptic + visual feedback
    setTapped(true);
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }

    const responseMs = Math.round(performance.now() - startRef.current);
    const nextTrials = [...trials, { delayMs: currentDelayMs, responseMs }];
    setTrials(nextTrials);

    if (nextTrials.length >= TRIAL_COUNT) {
      setPhase("completed");
      onComplete(nextTrials);
      return;
    }

    setTrialIndex((prev) => prev + 1);
    timeoutRef.current = setTimeout(() => {
      setTapped(false);
      startTrial();
    }, 400);
  };

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">反応速度</h2>
      <p className="mt-2 text-lg text-slate-500">表示されたらすぐタップ</p>
      <p className="mt-2 text-base text-slate-500">
        試行 {Math.min(trialIndex + 1, TRIAL_COUNT)}/{TRIAL_COUNT}
      </p>

      {phase === "intro" ? (
        <button
          type="button"
          onClick={startTrial}
          className="mt-6 w-full rounded-xl bg-sky-500 py-4 text-lg font-semibold text-white"
        >
          はじめる
        </button>
      ) : (
        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={handleTap}
            disabled={phase === "waiting" || phase === "completed"}
            className={`flex h-48 w-48 items-center justify-center rounded-full border-4 transition-all duration-100 ${
              tapped
                ? "scale-90 border-green-500 bg-green-500 text-white"
                : phase === "ready"
                  ? "border-sky-500 bg-sky-500 text-white active:scale-90 active:bg-green-500 active:border-green-500"
                  : "border-slate-200 bg-slate-100 text-slate-400"
            }`}
          >
            <span className="text-lg font-semibold">
              {tapped ? "✓" : phase === "ready" ? "タップ！" : phase === "completed" ? "完了" : "待機中..."}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
