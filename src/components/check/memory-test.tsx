"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { MemoryTrial } from "@/types/check";

interface MemoryTestProps {
  onComplete: (trials: MemoryTrial[]) => void;
}

const DIGIT_LENGTHS = [3, 3, 4, 4, 5] as const;

function generateDigits(length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 10));
}

export function MemoryTest({ onComplete }: MemoryTestProps) {
  const [phase, setPhase] = useState<"intro" | "preview" | "input" | "completed">("intro");
  const [trialIndex, setTrialIndex] = useState(0);
  const [currentDigits, setCurrentDigits] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [trials, setTrials] = useState<MemoryTrial[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startTrial = useCallback(
    (index: number) => {
      clearTimer();
      const digits = generateDigits(DIGIT_LENGTHS[index]);
      setCurrentDigits(digits);
      setInputValue("");
      setPhase("preview");

      timeoutRef.current = setTimeout(() => {
        setPhase("input");
      }, 2000);
    },
    [clearTimer]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "input") return;

    const userInput = inputValue
      .replace(/\D/g, "")
      .split("")
      .map(Number)
      .slice(0, currentDigits.length);

    const correct =
      userInput.length === currentDigits.length &&
      userInput.every((value, index) => value === currentDigits[index]);

    const nextTrials = [
      ...trials,
      {
        digits: currentDigits,
        userInput,
        correct,
      },
    ];

    setTrials(nextTrials);

    if (nextTrials.length >= DIGIT_LENGTHS.length) {
      setPhase("completed");
      onComplete(nextTrials);
      return;
    }

    const nextTrialIndex = trialIndex + 1;
    setTrialIndex(nextTrialIndex);
    startTrial(nextTrialIndex);
  };

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">短期記憶</h2>
      <p className="mt-2 text-lg text-slate-500">表示された数字を覚えて入力</p>
      <p className="mt-2 text-base text-slate-500">
        試行 {Math.min(trialIndex + 1, DIGIT_LENGTHS.length)}/{DIGIT_LENGTHS.length}
      </p>

      {phase === "intro" ? (
        <button
          type="button"
          onClick={() => startTrial(0)}
          className="mt-6 w-full rounded-xl bg-sky-500 py-4 text-lg font-semibold text-white"
        >
          はじめる
        </button>
      ) : (
        <div className="mt-6">
          <div className="rounded-xl bg-slate-100 p-6 text-center">
            {phase === "preview" ? (
              <p className="text-5xl font-bold tracking-[0.2em] text-slate-800">
                {currentDigits.join("")}
              </p>
            ) : (
              <p className="text-lg text-slate-500">数字を入力してください</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={phase !== "input"}
              maxLength={8}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg text-slate-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={phase !== "input" || inputValue.trim() === ""}
              className="w-full rounded-xl bg-sky-500 py-4 text-lg font-semibold text-white disabled:bg-slate-300"
            >
              回答する
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
