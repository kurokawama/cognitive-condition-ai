"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/home", label: "ホーム", icon: "🏠" },
  { href: "/check", label: "チェック", icon: "🧠" },
  { href: "/history", label: "レポート", icon: "📊" },
  { href: "/settings", label: "設定", icon: "⚙️" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-md">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center py-3 text-sm transition-colors ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
