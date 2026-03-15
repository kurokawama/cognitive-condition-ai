import Link from "next/link";
import { getRecentSessions, getTodaySession } from "@/app/actions/check";
import { ScoreComparison } from "@/components/score/score-comparison";

export const dynamic = "force-dynamic";

type Point = { x: number; y: number };

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

function SubScoreBar({
  label,
  score,
  barClassName,
  borderClassName,
}: {
  label: string;
  score: number;
  barClassName: string;
  borderClassName: string;
}) {
  return (
    <div className={`rounded-xl border-l-[3px] bg-white p-4 shadow-sm ${borderClassName}`}>
      <div className="flex items-center justify-between">
        <span className="text-lg text-slate-700">{label}</span>
        <span className="text-base font-semibold text-slate-600">{score}</span>
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200">
        <div className={`h-1.5 rounded-full ${barClassName}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default async function ResultPage() {
  const [todaySession, recentSessions] = await Promise.all([getTodaySession(), getRecentSessions(14)]);
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
  const trendValuesRaw = recentSessions.slice(-14).map((session) => session.score_total);
  const trendValues =
    trendValuesRaw.length > 0
      ? trendValuesRaw
      : [totalScore, totalScore, totalScore, totalScore, totalScore, totalScore, totalScore];
  while (trendValues.length < 14) trendValues.unshift(trendValues[0] ?? totalScore);

  const chartWidth = 240;
  const chartHeight = 64;
  const chartInset = 8;
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

  const gaugeSize = 200;
  const gaugeStroke = 12;
  const gaugeRadius = (gaugeSize - gaugeStroke) / 2;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const normalizedScore = Math.max(0, Math.min(100, totalScore));
  const gaugeOffset = gaugeCircumference - (normalizedScore / 100) * gaugeCircumference;

  return (
    <div className="mx-auto w-full max-w-[28rem] space-y-5 bg-slate-50 p-5">
      <section className="rounded-3xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
        <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-green-100/70 animate-ping" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-500">
            ✓
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-800">チェック完了！</h1>
        <p className="mx-auto mt-3 inline-flex min-h-12 items-center rounded-full bg-green-100 px-4 py-2 text-lg text-green-500">
          お疲れさまでした
        </p>

        <div className="mt-5 flex justify-center">
          <div className="relative h-[200px] w-[200px]">
            <svg
              width={gaugeSize}
              height={gaugeSize}
              viewBox={`0 0 ${gaugeSize} ${gaugeSize}`}
              role="img"
              aria-label={`現在スコア ${normalizedScore}`}
            >
              <circle
                cx={gaugeSize / 2}
                cy={gaugeSize / 2}
                r={gaugeRadius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth={gaugeStroke}
              />
              <circle
                cx={gaugeSize / 2}
                cy={gaugeSize / 2}
                r={gaugeRadius}
                fill="none"
                stroke="#2D5016"
                strokeWidth={gaugeStroke}
                strokeLinecap="round"
                strokeDasharray={gaugeCircumference}
                strokeDashoffset={gaugeOffset}
                transform={`rotate(-90 ${gaugeSize / 2} ${gaugeSize / 2})`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[64px] font-bold leading-none text-slate-800">{totalScore}</p>
              <p className="text-base text-slate-500">/100</p>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-base text-slate-500">前日比</span>
          <ScoreComparison
            currentScore={totalScore}
            previousScore={previousSession?.score_total ?? null}
          />
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-3">
          <svg
            width="100%"
            height="64"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="14日間のスコア推移"
          >
            <path d={areaPath} fill="#0EA5E9" opacity="0.1" />
            <path d={linePath} fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-4">
          <SubScoreBar
            label="反応速度"
            score={reactionScore}
            barClassName="bg-sky-400"
            borderClassName="border-sky-400"
          />
          <SubScoreBar
            label="短期記憶"
            score={memoryScore}
            barClassName="bg-green-300"
            borderClassName="border-green-300"
          />
          <SubScoreBar
            label="注意切替"
            score={attentionScore}
            barClassName="bg-violet-300"
            borderClassName="border-violet-300"
          />
        </div>
      </section>

      <section className="rounded-xl border-l-[3px] border-transparent bg-white p-5 shadow-sm [border-image:linear-gradient(to_bottom,#8B5CF6,#0EA5E9)_1]">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-xl text-violet-500">
            <span aria-hidden>✨</span>
          </div>
          <p className="flex-1 text-lg leading-relaxed text-slate-700">{aiComment}</p>
        </div>
      </section>

      <div className="space-y-3">
        <Link
          href="/ai-analysis"
          className="block min-h-14 w-full rounded-xl bg-gradient-to-r from-sky-500 to-green-500 py-4 text-center text-lg font-semibold text-white shadow-md transition hover:shadow-lg"
        >
          AI分析を見る
        </Link>
        <Link
          href="/note"
          className="block min-h-14 w-full rounded-xl border-2 border-sky-500 bg-white py-4 text-center text-lg font-semibold text-sky-500"
        >
          ひとこと記録する
        </Link>
      </div>
    </div>
  );
}
