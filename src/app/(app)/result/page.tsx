import Link from "next/link";
import { getRecentSessions, getTodaySession } from "@/app/actions/check";
import { ScoreComparison } from "@/components/score/score-comparison";

export const dynamic = "force-dynamic";

function SubScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-lg text-slate-700">{label}</span>
        <span className="text-base font-semibold text-slate-600">{score}</span>
      </div>
      <div className="mt-2 h-3 w-full rounded-full bg-slate-200">
        <div className="h-3 rounded-full bg-sky-500" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default async function ResultPage() {
  const [todaySession, recentSessions] = await Promise.all([getTodaySession(), getRecentSessions(7)]);
  const latestSession =
    todaySession ?? (recentSessions.length > 0 ? recentSessions[recentSessions.length - 1] : null);
  const previousSession = latestSession
    ? recentSessions.filter((session) => session.id !== latestSession.id).at(-1) ?? null
    : null;

  const totalScore = latestSession?.score_total ?? 0;
  const reactionScore = latestSession?.score_reaction ?? 0;
  const memoryScore = latestSession?.score_memory ?? 0;
  const attentionScore = latestSession?.score_attention ?? 0;
  const aiComment = latestSession?.ai_comment ?? "お疲れさまでした！";

  return (
    <div className="mx-auto w-full max-w-md space-y-5 p-6">
      <section className="rounded-xl bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-500">
          ✓
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-800">チェック完了！</h1>
        <p className="mt-2 text-lg text-slate-500">お疲れさまでした</p>

        <div className="mt-5">
          <p className="text-[68px] font-bold leading-none text-slate-800">{totalScore}</p>
          <p className="text-base text-slate-500">/100</p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-base text-slate-500">前日比</span>
          <ScoreComparison
            currentScore={totalScore}
            previousScore={previousSession?.score_total ?? null}
          />
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <div className="space-y-4">
          <SubScoreBar label="反応速度" score={reactionScore} />
          <SubScoreBar label="短期記憶" score={memoryScore} />
          <SubScoreBar label="注意切替" score={attentionScore} />
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
            <span aria-hidden>🤖</span>
          </div>
          <p className="flex-1 text-lg leading-relaxed text-slate-700">{aiComment}</p>
        </div>
      </section>

      <div className="space-y-3">
        <Link
          href="/ai-analysis"
          className="block w-full rounded-xl bg-sky-500 py-4 text-center text-lg font-semibold text-white"
        >
          AI分析を見る
        </Link>
        <Link
          href="/note"
          className="block w-full rounded-xl border-2 border-sky-500 py-4 text-center text-lg font-semibold text-sky-500"
        >
          ひとこと記録する
        </Link>
      </div>
    </div>
  );
}
