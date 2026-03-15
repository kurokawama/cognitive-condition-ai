import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const articles: Record<string, { title: string; description: string; content: string; date: string }> = {
  "what-is-cognitive-conditioning": {
    title: "認知コンディションとは？毎日のチェックが大切な理由",
    description: "体重を毎日測るように、頭のコンディションも毎日チェック。その理由と効果を解説します。",
    date: "2026-03-10",
    content: `認知コンディションとは、その日の頭の調子のこと。集中力、記憶力、判断力は日々変化しています。

体重計に毎日乗る習慣があるように、頭のコンディションも毎日チェックすることで、自分のパターンが見えてきます。

「昨日よりも集中できている」「今週は記憶力が安定している」——こうした気づきが、日常のパフォーマンス向上につながります。

認知コンディションAIでは、60秒間の簡単なゲーム形式のチェックで、反応速度・短期記憶・注意切替の3つの領域を測定します。`,
  },
  "improve-focus-at-work": {
    title: "仕事中の集中力を高める5つの習慣",
    description: "35-59歳のビジネスパーソン向け。AIデータから見えた集中力向上のパターンを紹介。",
    date: "2026-03-05",
    content: `多くのビジネスパーソンが「午後に集中力が落ちる」と感じています。

認知コンディションAIのデータから、集中力を高めるパターンが見えてきました。

1. 朝の90分を最重要タスクに充てる
2. 25分作業 + 5分休憩のリズムを作る
3. 午後のチェックで自分の状態を客観視する
4. 水分を十分にとる
5. 7時間以上の睡眠を確保する

これらの習慣を取り入れたユーザーは、平均して注意力スコアが改善する傾向がありました。`,
  },
  "sleep-and-cognition": {
    title: "睡眠と認知パフォーマンスの深い関係",
    description: "睡眠の質がスコアにどう影響するか。利用者データから見えた傾向をお伝えします。",
    date: "2026-02-28",
    content: `「今日は頭がぼんやりする」——その原因、睡眠にあるかもしれません。

認知コンディションAIでは、睡眠の質を記録することで、翌日のスコアとの相関を分析できます。

多くのユーザーのデータから、睡眠時間が6時間未満の翌日は反応速度スコアが平均で低くなる傾向が見られました。

一方で、7〜8時間の睡眠をとった翌日は全体的にスコアが安定する傾向があります。

自分に合った睡眠パターンを見つけるために、認知チェックと合わせて睡眠記録を続けてみましょう。`,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "記事が見つかりません" };

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: "認知コンディション AI" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50 px-5 py-12">
        <article className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center rounded-xl px-3 text-base text-primary transition hover:bg-sky-50 hover:underline"
            >
              ← ブログ一覧に戻る
            </Link>
            <time className="mt-4 block text-sm text-text-muted">{article.date}</time>
            <h1 className="mt-2 text-3xl font-bold text-text-primary">{article.title}</h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-text-secondary">
              {article.content.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
            <p className="text-lg font-medium text-text-primary">あなたの認知コンディションをチェック</p>
            <Link
              href="/check-demo"
              className="mt-3 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-primary-hover"
            >
              無料で体験する →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
