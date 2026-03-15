import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ — 認知ウェルネスの知識",
  description: "認知コンディション、脳の健康、日々のパフォーマンス向上に役立つ記事をお届けします。",
};

const posts = [
  {
    slug: "what-is-cognitive-conditioning",
    title: "認知コンディションとは？毎日のチェックが大切な理由",
    description: "体重を毎日測るように、頭のコンディションも毎日チェック。その理由と効果を解説します。",
    date: "2026-03-10",
  },
  {
    slug: "improve-focus-at-work",
    title: "仕事中の集中力を高める5つの習慣",
    description: "35-59歳のビジネスパーソン向け。AIデータから見えた集中力向上のパターンを紹介。",
    date: "2026-03-05",
  },
  {
    slug: "sleep-and-cognition",
    title: "睡眠と認知パフォーマンスの深い関係",
    description: "睡眠の質がスコアにどう影響するか。利用者データから見えた傾向をお伝えします。",
    date: "2026-02-28",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bg px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-text-primary">ブログ</h1>
        <p className="mt-2 text-lg text-text-secondary">認知ウェルネスの知識をお届けします</p>

        <div className="mt-8 space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <article className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
                <time className="text-sm text-text-muted">{post.date}</time>
                <h2 className="mt-1 text-xl font-semibold text-text-primary">{post.title}</h2>
                <p className="mt-2 text-base text-text-secondary">{post.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
