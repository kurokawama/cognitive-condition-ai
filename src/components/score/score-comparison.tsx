import { getScoreComparison } from "@/lib/scoring";

interface ScoreComparisonProps {
  currentScore: number;
  previousScore: number | null;
}

export function ScoreComparison({ currentScore, previousScore }: ScoreComparisonProps) {
  const { diff, direction } = getScoreComparison(currentScore, previousScore);

  const text =
    direction === "up" ? `+${diff}` : direction === "down" ? `−${Math.abs(diff)}` : "±0";

  const colorClass =
    direction === "up"
      ? "bg-green-50 text-green-500"
      : direction === "down"
        ? "bg-slate-100 text-slate-500"
        : "bg-slate-100 text-slate-400";

  return (
    <span
      className={`inline-flex min-h-12 items-center rounded-full px-3 py-1 text-base font-semibold ${colorClass}`}
    >
      {text}
    </span>
  );
}
