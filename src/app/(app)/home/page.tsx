import Link from "next/link";
import { getRecentSessions, getTodaySession } from "@/app/actions/check";
import { getUser } from "@/app/actions/auth";
import { ScoreComparison } from "@/components/score/score-comparison";
import { ScoreGauge } from "@/components/score/score-gauge";

export const dynamic = "force-dynamic";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "おはようございます";
  if (hour < 18) return "こんにちは";
  return "お疲れさまです";
}

export default async function HomePage() {
  const [user, todaySession, recentSessions] = await Promise.all([
    getUser(),
    getTodaySession(),
    getRecentSessions(7),
  ]);

  const latestSession =
    todaySession ?? (recentSessions.length > 0 ? recentSessions[recentSessions.length - 1] : null);
  const previousSession = latestSession
    ? recentSessions.filter((session) => session.id !== latestSession.id).at(-1) ?? null
    : null;

  const score = latestSession?.score_total ?? 0;
  const aiComment = latestSession?.ai_comment ?? "今日も無理のないペースで続けていきましょう。";
  const streakDays = user?.streak_days ?? 0;
  const displayName = user?.display_name ?? "あなた";
  const completedToday = Boolean(todaySession);

  return (
    <div className="mx-auto w-full max-w-md space-y-5 p-6">
      <header className="rounded-xl bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          {getGreeting()}、{displayName}さん
        </h1>
      </header>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex justify-center">
          <ScoreGauge score={score} />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-base text-slate-500">前日比</span>
          <ScoreComparison
            currentScore={score}
            previousScore={previousSession?.score_total ?? null}
          />
        </div>
      </section>

      <section className="rounded-xl bg-white p-4 shadow-sm">
        <p className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <span aria-hidden>🔥</span>
          <span>{streakDays}日連続</span>
        </p>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
            <span aria-hidden>🤖</span>
          </div>
          <p className="flex-1 text-lg leading-relaxed text-slate-700">{aiComment}</p>
        </div>
      </section>

      {completedToday ? (
        <button
          type="button"
          disabled
          className="w-full rounded-xl bg-slate-200 py-4 text-lg font-semibold text-slate-500"
        >
          今日のチェックは完了です ✓
        </button>
      ) : (
        <Link
          href="/check"
          className="block w-full rounded-xl bg-sky-500 py-4 text-center text-lg font-semibold text-white"
        >
          今日のチェックを始める
        </Link>
      )}
    </div>
  );
}
