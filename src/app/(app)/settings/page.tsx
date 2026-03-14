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
  const notificationEnabled = profile?.notification_enabled ?? false;

  async function logoutAndRedirect() {
    "use server";
    await logout();
    redirect("/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-text-primary">設定</h1>

      <section className="rounded-xl bg-surface p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-text-primary">プロフィール</h2>
        <dl className="mt-4 space-y-4">
          <div className="space-y-1">
            <dt className="text-base text-text-secondary">表示名</dt>
            <dd className="text-lg font-medium text-text-primary">{displayName}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-base text-text-secondary">メール</dt>
            <dd className="text-lg font-medium text-text-primary">{email}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-text-primary">通知設定</h2>
            <p className="text-base text-text-secondary">通知を受け取る</p>
          </div>
          <label className="inline-flex cursor-pointer items-center">
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

      <section className="rounded-xl bg-surface p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-text-primary">プランステータス</h2>
        <p className="mt-3 inline-flex rounded-full bg-sky-50 px-4 py-2 text-lg font-semibold text-primary">
          {planLabel}
        </p>
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
  );
}
