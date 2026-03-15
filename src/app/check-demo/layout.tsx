import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "認知コンディション 無料チェック",
  description:
    "アカウント不要で今すぐ認知チェックを体験。3問の簡単なゲームで頭のコンディションをチェックできます。",
};

export default function CheckDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
