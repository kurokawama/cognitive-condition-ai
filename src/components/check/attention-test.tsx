"use client";

import { useMemo, useState } from "react";
import type { AttentionOption, AttentionTrial } from "@/types/check";

interface AttentionTestProps {
  onComplete: (trials: AttentionTrial[]) => void;
}

interface ColorDef {
  instruction: string;
  label: string;
}

interface ShapeDef {
  instruction: string;
  label: string;
}

interface GeneratedTrial {
  instruction: string;
  trial: Omit<AttentionTrial, "userChoice" | "correct">;
}

const TRIAL_COUNT = 8;

const COLORS: ColorDef[] = [
  { instruction: "青い", label: "青い" },
  { instruction: "緑の", label: "緑の" },
  { instruction: "黄色い", label: "黄色い" },
  { instruction: "紫の", label: "紫の" },
];

const SHAPES: ShapeDef[] = [
  { instruction: "丸い", label: "丸" },
  { instruction: "四角い", label: "四角" },
  { instruction: "三角の", label: "三角" },
  { instruction: "星形の", label: "星" },
];

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  const copied = [...items];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function toLabel(color: ColorDef, shape: ShapeDef): string {
  return `${color.label}${shape.label}`;
}

function generateTrial(): GeneratedTrial {
  const targetType: "color" | "shape" = Math.random() > 0.5 ? "color" : "shape";

  if (targetType === "color") {
    const targetColor = randomItem(COLORS);
    const targetShape = randomItem(SHAPES);
    const correctLabel = toLabel(targetColor, targetShape);
    const otherColors = shuffle(COLORS.filter((color) => color.label !== targetColor.label)).slice(0, 3);

    const options: AttentionOption[] = shuffle([
      { label: correctLabel, isTarget: true },
      ...otherColors.map((color) => ({
        label: toLabel(color, randomItem(SHAPES)),
        isTarget: false,
      })),
    ]);

    return {
      instruction: `${targetColor.instruction}ものをタップ`,
      trial: {
        targetType: "color",
        options,
        correctIndex: options.findIndex((option) => option.isTarget),
      },
    };
  }

  const targetShape = randomItem(SHAPES);
  const targetColor = randomItem(COLORS);
  const correctLabel = toLabel(targetColor, targetShape);
  const otherShapes = shuffle(SHAPES.filter((shape) => shape.label !== targetShape.label)).slice(0, 3);

  const options: AttentionOption[] = shuffle([
    { label: correctLabel, isTarget: true },
    ...otherShapes.map((shape) => ({
      label: toLabel(randomItem(COLORS), shape),
      isTarget: false,
    })),
  ]);

  return {
    instruction: `${targetShape.instruction}ものをタップ`,
    trial: {
      targetType: "shape",
      options,
      correctIndex: options.findIndex((option) => option.isTarget),
    },
  };
}

export function AttentionTest({ onComplete }: AttentionTestProps) {
  const [trialIndex, setTrialIndex] = useState(0);
  const [results, setResults] = useState<AttentionTrial[]>([]);
  const [current, setCurrent] = useState<GeneratedTrial>(() => generateTrial());
  const [locked, setLocked] = useState(false);

  const progressText = useMemo(
    () => `${Math.min(trialIndex + 1, TRIAL_COUNT)}/${TRIAL_COUNT}`,
    [trialIndex]
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (choiceIndex: number) => {
    if (locked) return;
    setLocked(true);
    setSelectedIndex(choiceIndex);

    // Haptic feedback
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }

    const correct = choiceIndex === current.trial.correctIndex;
    const nextResults: AttentionTrial[] = [
      ...results,
      {
        ...current.trial,
        userChoice: choiceIndex,
        correct,
      },
    ];
    setResults(nextResults);

    if (nextResults.length >= TRIAL_COUNT) {
      onComplete(nextResults);
      return;
    }

    setTimeout(() => {
      setTrialIndex((prev) => prev + 1);
      setCurrent(generateTrial());
      setSelectedIndex(null);
      setLocked(false);
    }, 300);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">注意切替</h2>
      <p className="mt-2 text-lg text-slate-500">指示に合ったものをタップ</p>
      <p className="mt-2 text-base text-slate-500">試行 {progressText}</p>

      <div className="mt-6 rounded-xl bg-slate-100 p-4 text-center">
        <p className="text-xl font-semibold text-slate-800">{current.instruction}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {current.trial.options.map((option, index) => (
          <button
            key={`${option.label}-${index}`}
            type="button"
            onClick={() => handleSelect(index)}
            disabled={locked}
            className={`rounded-xl border px-3 py-4 text-lg font-medium transition-all duration-100 ${
              selectedIndex === index
                ? "scale-95 border-green-500 bg-green-100 text-green-700"
                : "border-slate-300 bg-white text-slate-800 active:scale-95 active:border-sky-500 active:bg-sky-50 disabled:opacity-70"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
