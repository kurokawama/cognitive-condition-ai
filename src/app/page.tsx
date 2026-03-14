import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg px-6 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10">
        <section className="w-full max-w-2xl space-y-4 text-center">
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
            認知コンディション AI
          </h1>
          <p className="text-lg text-text-secondary">
            毎日1分の認知チェックで頭のコンディションを可視化
          </p>
        </section>

        <section className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
          <article className="rounded-xl bg-surface p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-text-primary">1分で完了</h2>
            <p className="mt-2 text-lg text-text-secondary">毎日続けやすい短時間チェックです。</p>
          </article>
          <article className="rounded-xl bg-surface p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-text-primary">AIが解釈</h2>
            <p className="mt-2 text-lg text-text-secondary">その日のスコア変化を丁寧に解釈します。</p>
          </article>
          <article className="rounded-xl bg-surface p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-text-primary">変化を可視化</h2>
            <p className="mt-2 text-lg text-text-secondary">日々の推移を見ながら振り返りできます。</p>
          </article>
        </section>

        <div className="flex w-full max-w-md flex-col gap-4">
          <Link
            href="/register"
            className="flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            無料で始める
          </Link>
          <Link
            href="/login"
            className="flex min-h-12 items-center justify-center rounded-xl border-2 border-primary px-6 py-4 text-lg font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
