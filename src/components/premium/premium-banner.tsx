import Link from "next/link";

type BannerVariant = "home" | "result" | "history" | "settings";

interface PremiumBannerProps {
  variant: BannerVariant;
}

const VARIANTS: Record<BannerVariant, { icon: string; title: string; description: string }> = {
  home: {
    icon: "\u2728",
    title: "AIがスコアの傾向を読み解きます",
    description: "7日間の変化からAIが気づきをまとめます",
  },
  result: {
    icon: "\uD83D\uDCAC",
    title: "今日のスコア、AIならもっと深く読み解けます",
    description: "改善のヒントをAIが一緒に考えます",
  },
  history: {
    icon: "\uD83D\uDCC8",
    title: "3ヶ月分の変化、見てみませんか？",
    description: "長期的なパターンが見えてきます",
  },
  settings: {
    icon: "\uD83D\uDCC1",
    title: "もっと詳しく知りたい方へ",
    description: "AI分析・AIトーク・90日トレンド・CSV出力",
  },
};

export function PremiumBanner({ variant }: PremiumBannerProps) {
  const v = VARIANTS[variant];

  return (
    <Link
      href="/subscription"
      className="block overflow-hidden rounded-2xl border-2 border-sky-300 bg-gradient-to-r from-sky-50 via-white to-green-50 p-5 shadow-md transition active:scale-[0.98] hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-100 text-2xl">
          {v.icon}
        </span>
        <div className="flex-1">
          <p className="text-lg font-bold text-slate-800">{v.title}</p>
          <p className="mt-0.5 text-base text-slate-500">{v.description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-semibold text-sky-600">7日間無料で試す</span>
        <span className="inline-flex min-h-10 items-center rounded-full bg-sky-500 px-5 py-2 text-base font-semibold text-white shadow-sm">
          詳しく見る →
        </span>
      </div>
    </Link>
  );
}
