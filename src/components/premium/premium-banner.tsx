import Link from "next/link";

type BannerVariant = "home" | "result" | "history" | "settings";

interface PremiumBannerProps {
  variant: BannerVariant;
}

const VARIANTS: Record<BannerVariant, { icon: string; title: string; description: string; cta: string }> = {
  home: {
    icon: "\u2728",
    title: "AIがあなたの傾向を分析",
    description: "7日間のデータからAIが仮説と改善提案をお届けします",
    cta: "プレミアムを見る",
  },
  result: {
    icon: "\uD83D\uDCAC",
    title: "AIにもっと詳しく相談",
    description: "スコアの背景や改善のヒントをAIが一緒に考えます",
    cta: "AI分析を体験する",
  },
  history: {
    icon: "\uD83D\uDCC8",
    title: "90日間の長期トレンド",
    description: "長期的な変化のパターンを把握して日々の習慣に活かせます",
    cta: "長期トレンドを見る",
  },
  settings: {
    icon: "\uD83D\uDCC1",
    title: "データエクスポート & AI分析",
    description: "プレミアムならCSV出力やAI詳細分析が使い放題",
    cta: "プレミアムを見る",
  },
};

export function PremiumBanner({ variant }: PremiumBannerProps) {
  const v = VARIANTS[variant];

  return (
    <Link
      href="/subscription"
      className="block rounded-xl border border-sky-100 bg-gradient-to-r from-sky-50 to-white p-4 shadow-sm transition active:scale-[0.99] hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-lg">
          {v.icon}
        </span>
        <div className="flex-1">
          <p className="text-lg font-semibold text-slate-800">{v.title}</p>
          <p className="mt-0.5 text-base text-slate-500">{v.description}</p>
        </div>
        <span className="mt-1 shrink-0 rounded-full bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white">
          {v.cta}
        </span>
      </div>
    </Link>
  );
}
