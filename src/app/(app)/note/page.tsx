"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveNote } from "@/app/actions/note";

interface SelectorProps {
  label: string;
  leftEmoji: string;
  rightEmoji: string;
  value: number;
  onChange: (value: number) => void;
}

function FiveStepSelector({
  label,
  leftEmoji,
  rightEmoji,
  value,
  onChange,
}: SelectorProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-slate-800">{label}</h2>
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>
          {leftEmoji}
        </span>
        <div className="flex flex-1 items-center justify-between gap-2">
          {[1, 2, 3, 4, 5].map((step) => {
            const selected = value === step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => onChange(step)}
                className={`flex min-h-12 min-w-12 items-center justify-center rounded-xl border text-lg font-semibold transition ${
                  selected
                    ? "border-sky-500 bg-sky-100 text-sky-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                aria-label={`${label} ${step}`}
                aria-pressed={selected}
              >
                {step}
              </button>
            );
          })}
        </div>
        <span className="text-2xl" aria-hidden>
          {rightEmoji}
        </span>
      </div>
    </section>
  );
}

export default function NotePage() {
  const router = useRouter();
  const [sleepQuality, setSleepQuality] = useState(3);
  const [mood, setMood] = useState(3);
  const [busyness, setBusyness] = useState(3);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setIsSaving(true);
    setError(null);

    const result = await saveNote({
      checkSessionId: null,
      sleepQuality,
      mood,
      busyness,
    });

    setIsSaving(false);

    if ("error" in result) {
      setError(result.error ?? "保存に失敗しました");
      return;
    }

    setSaved(true);
    setTimeout(() => {
      router.push("/home");
    }, 2000);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-800">ひとこと記録</h1>

      <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <FiveStepSelector
          label="睡眠"
          leftEmoji="😴"
          rightEmoji="😊"
          value={sleepQuality}
          onChange={setSleepQuality}
        />

        <FiveStepSelector
          label="気分"
          leftEmoji="😔"
          rightEmoji="😊"
          value={mood}
          onChange={setMood}
        />

        <FiveStepSelector
          label="忙しさ"
          leftEmoji="🏖️"
          rightEmoji="🔥"
          value={busyness}
          onChange={setBusyness}
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving || saved}
        className="w-full rounded-xl bg-sky-500 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        記録する
      </button>

      {saved && (
        <p className="rounded-xl border border-green-200 bg-green-50 p-4 text-lg text-slate-700">
          記録しました！
        </p>
      )}

      {error && (
        <p className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-lg text-slate-700">
          {error}
        </p>
      )}
    </div>
  );
}
