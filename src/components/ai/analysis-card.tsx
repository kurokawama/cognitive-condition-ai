import type { AiSuggestion } from "@/types/ai";

const categoryIcon: Record<AiSuggestion["category"], string> = {
  sleep: "😴",
  exercise: "🚶",
  rest: "🛌",
  activity: "🌿",
  general: "🧠",
};

interface AnalysisCardProps {
  title: string;
  description: string;
  category: AiSuggestion["category"];
}

export function AnalysisCard({ title, description, category }: AnalysisCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden>
          {categoryIcon[category]}
        </span>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <p className="text-lg text-slate-600">{description}</p>
        </div>
      </div>
    </article>
  );
}
