import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cognitive-condition.ai";

export const metadata: Metadata = {
  title: {
    default: "認知コンディション AI — 毎日1分で頭のコンディションを測る",
    template: "%s | 認知コンディション AI",
  },
  description:
    "毎日1分の認知チェックで頭のコンディションを可視化。AIがパターンを分析し、パーソナルなウェルネスアドバイスをお届けします。",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "認知コンディション AI",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-bg antialiased">{children}</body>
    </html>
  );
}
