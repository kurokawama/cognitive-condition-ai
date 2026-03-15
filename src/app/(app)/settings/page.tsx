import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, logout } from "@/app/actions/auth";
import { getSubscriptionLabel } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const profile = await getUser();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName = profile?.display_name ?? user.user_metadata?.display_name ?? "未設定";
  const email = profile?.email ?? user.email ?? "未設定";
  const planLabel = profile?.subscription_plan
    ? getSubscriptionLabel(profile.subscription_plan)
    : "無料プラン";
  const isPremiumPlan = profile?.subscription_plan === "premium";
  const notificationEnabled = profile?.notification_enabled ?? false;

  async function logoutAndRedirect() {
    "use server";
    await logout();
    redirect("/login");
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-8 pt-6 sm:px-6">
        <header className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-white p-6 shadow-[0_8px_30px_rgba(14,165,233,0.08)]">
          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">設定</h1>
        </header>

        <section className="rounded-xl border border-slate-200 bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-text-primary">プロフィール</h2>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-xl">
              👤
            </span>
          </div>
          <dl className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-1 rounded-xl bg-slate-50 p-4">
              <dt className="text-base text-text-secondary">表示名</dt>
              <dd className="text-lg font-medium text-text-primary">{displayName}</dd>
            </div>
            <div className="space-y-1 rounded-xl bg-slate-50 p-4">
              <dt className="text-base text-text-secondary">メール</dt>
              <dd className="text-lg font-medium text-text-primary">{email}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-text-primary">プランステータス</h2>
            <span className="rounded-full bg-sky-50 px-4 py-2 text-lg font-semibold text-primary">
              {planLabel}
            </span>
          </div>
          <div className="mt-4">
            <Link
              href="/subscription"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-green-800 bg-white px-5 py-3 text-lg font-semibold text-green-900 transition hover:bg-green-50"
            >
              プラン管理
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-text-primary">通知設定</h2>
              <p className="text-base text-text-secondary">通知を受け取る</p>
            </div>
            <label className="inline-flex min-h-12 cursor-pointer items-center">
              <input
                type="checkbox"
                defaultChecked={notificationEnabled}
                className="peer sr-only"
                aria-label="通知設定トグル"
              />
              <span className="relative h-8 w-14 rounded-full bg-slate-300 transition peer-checked:bg-primary">
                <span className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6" />
              </span>
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-text-primary">データエクスポート</h2>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-xl">
              📁
            </span>
          </div>
          <p className="mt-2 text-base text-text-secondary">CSV</p>
          <button
            type="button"
            disabled={!isPremiumPlan}
            className={`mt-4 inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-lg font-semibold transition ${
              isPremiumPlan
                ? "border border-green-800 bg-white text-green-900 hover:bg-green-50"
                : "cursor-not-allowed border border-slate-300 bg-slate-100 text-slate-500"
            }`}
          >
            データエクスポート
          </button>
        </section>

        <form action={logoutAndRedirect}>
          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 bg-surface px-6 py-3 text-lg font-semibold text-text-primary shadow-sm transition hover:bg-slate-50"
          >
            ログアウト
          </button>
        </form>
      </div>
    </div>
  );
}
