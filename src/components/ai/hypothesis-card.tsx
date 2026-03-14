interface HypothesisCardProps {
  text: string;
}

function toTrendText(text: string) {
  const normalized = text.trim().replace(/[。!！?？\s]+$/g, "");
  if (normalized.includes("傾向があります")) {
    return normalized;
  }
  return `${normalized}傾向があります`;
}

export function HypothesisCard({ text }: HypothesisCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-lg text-slate-700">💡 {toTrendText(text)}</p>
    </article>
  );
}
