"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, logout } from "@/app/actions/auth";
import { updateNotification, exportUserData } from "@/app/actions/settings";
import { getSubscriptionLabel } from "@/lib/subscription";
import type { User } from "@/types/database";

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifSaving, setNotifSaving] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportMsg, setExportMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const user = await getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setProfile(user as User);
      setNotifEnabled((user as User).notification_enabled);
      setIsLoading(false);
    }
    void load();
  }, [router]);

  async function handleNotifToggle() {
    const newValue = !notifEnabled;
    setNotifEnabled(newValue);
    setNotifSaving(true);
    await updateNotification(newValue);
    setNotifSaving(false);
  }

  async function handleExport() {
    setExportLoading(true);
    setExportMsg(null);
    const result = await exportUserData();
    if (result.success) {
      const blob = new Blob(["\uFEFF" + result.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cognitive-check-data-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setExportMsg("ダウンロードしました");
    } else {
      setExportMsg(result.error);
    }
    setExportLoading(false);
  }

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  if (isLoading) {
    return (
      <div className="bg-slate-50">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-8 pt-6 sm:px-6">
          <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    );
  }

  const displayName = profile?.display_name ?? "未設定";
  const email = profile?.email ?? "未設定";
  const planLabel = profile?.subscription_plan
    ? getSubscriptionLabel(profile.subscription_plan)
    : "無料プラン";
  const isPremiumPlan = profile?.subscription_plan === "premium";

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
          {isPremiumPlan ? (
            <div className="mt-4">
              <Link
                href="/subscription"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-green-800 bg-white px-5 py-3 text-lg font-semibold text-green-900 transition hover:bg-green-50"
              >
                プラン管理
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-base text-slate-500">無料プランで利用中</p>
                <ul className="mt-2 space-y-1.5 text-base text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-sky-500">&#x2713;</span> 毎日の認知チェック
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-500">&#x2713;</span> 7日間の推移グラフ
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span>&#x2717;</span> AI詳細分析・AIトーク無制限
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span>&#x2717;</span> 90日長期トレンド
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span>&#x2717;</span> CSVデータエクスポート
                  </li>
                </ul>
              </div>
              <Link
                href="/subscription"
                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600 active:scale-[0.98]"
              >
                月額580円でプレミアムにする
              </Link>
              <p className="text-center text-base text-slate-400">年額プランなら1日たった13円</p>
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-text-primary">通知設定</h2>
              <p className="text-base text-text-secondary">
                {notifSaving ? "保存中..." : "チェックリマインダーを受け取る"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void handleNotifToggle()}
              className="relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors"
              style={{
                backgroundColor: notifEnabled ? "hsl(199 89% 48%)" : "#cbd5e1",
                minHeight: "48px",
                minWidth: "56px",
              }}
              role="switch"
              aria-checked={notifEnabled}
              aria-label="通知設定トグル"
            >
              <span
                className="inline-block h-6 w-6 rounded-full bg-white shadow transition-transform"
                style={{ transform: notifEnabled ? "translateX(28px)" : "translateX(4px)" }}
              />
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-text-primary">データエクスポート</h2>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-xl">
              📁
            </span>
          </div>
          <p className="mt-2 text-base text-text-secondary">
            チェック履歴をCSVファイルでダウンロード
          </p>
          {exportMsg && (
            <p className="mt-2 text-base text-slate-600">{exportMsg}</p>
          )}
          <button
            type="button"
            onClick={() => void handleExport()}
            disabled={!isPremiumPlan || exportLoading}
            className={`mt-4 inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-lg font-semibold transition ${
              isPremiumPlan
                ? "border border-green-800 bg-white text-green-900 hover:bg-green-50"
                : "cursor-not-allowed border border-slate-300 bg-slate-100 text-slate-500"
            }`}
          >
            {exportLoading ? "ダウンロード中..." : isPremiumPlan ? "CSVダウンロード" : "プレミアム限定"}
          </button>
        </section>

        <button
          type="button"
          onClick={() => void handleLogout()}
          className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 bg-surface px-6 py-3 text-lg font-semibold text-text-primary shadow-sm transition hover:bg-slate-50"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
