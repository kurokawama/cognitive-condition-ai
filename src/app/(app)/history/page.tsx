import Link from "next/link";
import { getRecentSessions } from "@/app/actions/check";
import { ScoreChart, type ScoreChartPoint } from "@/components/chart/score-chart";
import { isPremium } from "@/lib/subscription";
import { PremiumBanner } from "@/components/premium/premium-banner";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@/types/database";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  let premiumUser = false;
  if (authUser) {
    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (profile) {
      premiumUser = isPremium(profile as User);
    }
  }

  const sessions7 = await getRecentSessions(7);
  const sevenDayData: ScoreChartPoint[] = sessions7.map((session) => ({
    date: formatDate(session.created_at),
    score: session.score_total,
    reaction: session.score_reaction,
    memory: session.score_memory,
    attention: session.score_attention,
  }));

  const sessions90 = premiumUser ? await getRecentSessions(90) : [];
  const ninetyDayData: ScoreChartPoint[] = sessions90.map((session) => ({
    date: formatDate(session.created_at),
    score: session.score_total,
    reaction: session.score_reaction,
    memory: session.score_memory,
    attention: session.score_attention,
  }));

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-5xl space-y-6 px-4 pb-8 pt-6 sm:px-6">
        <header className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-white p-6 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">推移グラフ</h1>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-800">7日推移</h2>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-base font-semibold text-sky-700">
              無料
            </span>
          </div>
          <p className="mt-1 text-base text-slate-500">総合スコア / 反応 / 記憶 / 注意</p>
          <div className="mt-4 rounded-xl bg-slate-50 p-3">
            <ScoreChart data={sevenDayData} mode="history" height={240} />
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-800">90日推移</h2>
            <span className="rounded-full bg-green-100 px-3 py-1 text-base font-semibold text-green-700">
              プレミアム
            </span>
          </div>

          {premiumUser ? (
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <ScoreChart data={ninetyDayData} mode="history" height={240} />
            </div>
          ) : (
            <Link
              href="/subscription"
              className="relative mt-4 block overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition active:scale-[0.99] hover:shadow-md"
            >
              <div className="pointer-events-none blur-[1px]">
                <div className="mx-auto h-[220px] w-full max-w-3xl rounded-xl bg-gradient-to-br from-sky-100 via-white to-green-50" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="rounded-full bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-sm">
                  タップして90日トレンドを見る
                </span>
                <span className="text-base text-slate-500">月額580円 / 年額なら1日13円</span>
              </div>
            </Link>
          )}
        </section>
        {!premiumUser && <PremiumBanner variant="history" />}
      </div>
    </div>
  );
}
