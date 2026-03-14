import { getRecentSessions } from "@/app/actions/check";
import { ScoreChart, type ScoreChartPoint } from "@/components/chart/score-chart";
import { isPremium } from "@/lib/subscription";
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
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-800">推移グラフ</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">7日推移</h2>
        <p className="mt-1 text-base text-slate-500">
          総合スコア / 反応 / 記憶 / 注意
        </p>
        <div className="mt-4">
          <ScoreChart data={sevenDayData} mode="history" height={200} />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">90日推移</h2>

        {premiumUser ? (
          <div className="mt-4">
            <ScoreChart data={ninetyDayData} mode="history" height={200} />
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-lg font-semibold text-slate-700">
              プレミアムで90日履歴を見る
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
