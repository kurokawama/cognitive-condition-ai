import Link from "next/link";
import { getRecentSessions, getTodaySession } from "@/app/actions/check";
import { getUser } from "@/app/actions/auth";
import { isPremium } from "@/lib/subscription";
import { PremiumBanner } from "@/components/premium/premium-banner";
import { ScoreGauge } from "@/components/score/score-gauge";
import type { User } from "@/types/database";

export const dynamic = "force-dynamic";

type Point = { x: number; y: number };

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "おはようございます";
  if (hour < 18) return "こんにちは";
  return "お疲れさまです";
}

function buildSmoothLinePath(points: Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
  }

  const last = points[points.length - 1];
  d += ` T ${last.x} ${last.y}`;
  return d;
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
  const previousScore = previousSession?.score_total ?? null;
  const diff = previousScore === null ? 0 : score - previousScore;
  const isImproved = diff > 0;

  const trendValuesRaw = recentSessions.slice(-7).map((session) => session.score_total);
  const trendValues =
    trendValuesRaw.length > 0 ? trendValuesRaw : [score, score, score, score, score, score, score];
  while (trendValues.length < 7) trendValues.unshift(trendValues[0] ?? score);

  const chartWidth = 48;
  const chartHeight = 24;
  const chartInset = 2;
  const minValue = Math.min(...trendValues);
  const maxValue = Math.max(...trendValues);
  const range = Math.max(1, maxValue - minValue);
  const points = trendValues.map((value, index) => {
    const x = (index / (trendValues.length - 1 || 1)) * chartWidth;
    const normalized = (value - minValue) / range;
    const y = chartHeight - chartInset - normalized * (chartHeight - chartInset * 2);
    return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
  });
  const linePath = buildSmoothLinePath(points);
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  const averageScore = Math.round(trendValues.reduce((sum, value) => sum + value, 0) / trendValues.length);
  const highestScore = Math.max(...trendValues);
  const checkCount = trendValuesRaw.length;
  const premiumUser = user ? isPremium(user as User) : false;

  return (
    <div className="mx-auto w-full max-w-[28rem] space-y-5 bg-slate-50 p-5">
      <header className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">
            {getGreeting()}、{displayName}さん
          </h1>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-base font-semibold text-amber-900">
            🔥 {streakDays}日連続
          </span>
        </div>
      </header>

      {completedToday ? (
        <button
          type="button"
          disabled
          className="min-h-14 w-full rounded-xl bg-slate-200 py-4 text-lg font-semibold text-slate-500"
        >
          今日のチェックは完了です ✓
        </button>
      ) : (
        <Link
          href="/check"
          className="block min-h-14 w-full rounded-xl bg-gradient-to-r from-sky-500 to-green-500 py-4 text-center text-lg font-semibold text-white shadow-md transition hover:shadow-lg active:scale-[0.98]"
        >
          今日のチェックを始める
        </Link>
      )}

      <section className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
        <div className="flex justify-center">
          <ScoreGauge score={score} />
        </div>
        <div className="mt-4 flex items-center justify-center">
          <span className="inline-flex min-h-12 items-center rounded-full bg-green-100 px-4 py-2 text-base font-semibold text-green-500">
            /100
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
          <span className="text-base text-slate-500">前日比</span>
          <span
            className={`inline-flex min-h-12 items-center rounded-full px-3 py-1 text-base font-semibold ${
              isImproved ? "bg-green-50 text-green-500" : "bg-slate-100 text-slate-400"
            }`}
          >
            {isImproved ? `→ +${diff}` : "→ 変化なし"}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="text-base text-slate-500">平均</p>
            <p className="text-2xl font-bold text-slate-800">{averageScore}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="text-base text-slate-500">回数</p>
            <p className="text-2xl font-bold text-slate-800">{checkCount}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="text-base text-slate-500">最高</p>
            <p className="text-2xl font-bold text-slate-800">{highestScore}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-end">
          <svg width="48" height="24" viewBox="0 0 48 24" role="img" aria-label="7日間の推移">
            <path d={areaPath} fill="#E0F2FE" />
            <path d={linePath} fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex items-start gap-3 rounded-xl border-l-[3px] border-violet-500 bg-violet-50/30 p-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-xl text-violet-500">
            <span aria-hidden>✨</span>
          </div>
          <p className="flex-1 text-lg leading-relaxed text-slate-700">{aiComment}</p>
        </div>
      </section>

      {!premiumUser && <PremiumBanner variant="home" />}
    </div>
  );
}
