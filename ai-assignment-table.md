# AI振り分け表: 認知コンディション AI Revival v3

> Generated: 2026-03-15 | Wave 3 実装フェーズ | Gate 1 通過証拠

## Wave並列設計

| Wave | 担当 | 内容 | 依存関係 |
|------|------|------|---------|
| Wave 3-2a | Claude Code | SEO基盤 + DB/型定義修正 + Auth OTP化 | なし |
| Wave 3-2b | Claude Code | サーバーアクション修正 + 新ページスケルトン | 3-2a完了後 |
| Wave 3-3 | Cursor Agent x3並列 | UI実装（design-handoff.md準拠） | 3-2b git push後 |
| Wave 3-4 | Claude Code | 統合 + ビルド確認 | 3-3 PR merge後 |

## Wave 3-2a: Claude Code — 基盤修正（先行実施）

### 1. DB/型定義（B2B削除 + 4テーブル化）
- [ ] `types/database.ts` — Organization, ApiKey, OrgAnalyticsCache 型を削除
- [ ] `types/database.ts` — User型から org_id, role を削除
- [ ] `types/database.ts` — blog_posts 型を追加
- [ ] `types/check.ts` — 変更なし
- [ ] `types/ai.ts` — 変更なし

### 2. Supabase/Auth（Email OTP化）
- [ ] `app/actions/auth.ts` — signInWithOtp / verifyOtp に変更
- [ ] `app/(auth)/login/page.tsx` — OTPフロー（Email入力→コード入力）
- [ ] `app/(auth)/register/page.tsx` — 削除（OTPで統合）
- [ ] `components/auth/login-form.tsx` — OTPフォームに書き換え

### 3. SEO基盤
- [ ] `app/sitemap.ts` — 新規作成
- [ ] `app/robots.ts` — 新規作成
- [ ] `app/opengraph-image.tsx` — 動的OG画像（1200x630）
- [ ] `app/layout.tsx` — generateMetadata追加（サイト全体）
- [ ] `app/page.tsx` — generateMetadata + JSON-LD (WebApplication + FAQ)

### 4. 新ページスケルトン
- [ ] `app/check-demo/page.tsx` — 認証不要チェックデモ（3問）
- [ ] `app/about/page.tsx` — サービス紹介（SEO）
- [ ] `app/blog/page.tsx` — ブログ一覧（SEO）
- [ ] `app/blog/[slug]/page.tsx` — ブログ記事（SEO）

### 5. BottomNav修正
- [ ] `components/layout/bottom-nav.tsx` — タブ変更: ホーム/チェック/レポート/設定

### 6. middleware更新
- [ ] `lib/middleware.ts` — public paths に /check-demo, /about, /blog 追加

## Wave 3-2b: Claude Code — サーバーアクション修正

- [ ] `app/actions/check.ts` — org_id参照削除
- [ ] `lib/subscription.ts` — 価格定数更新（¥580/月, ¥4,800/年）
- [ ] git push（Cursor Agent用の土台確定）

## Wave 3-3: Cursor Agent x3 — UI実装

**共通指示:** design-handoff.md参照, PMDA準拠, Tailwind CSS v4, フォント17px+, タッチ48px+

### Agent A: SEOページ群
- `app/page.tsx` — SEOランディング全面書き換え
- `app/check-demo/page.tsx` — チェックデモUI
- `app/about/page.tsx` — サービス紹介UI
- `app/blog/page.tsx` — ブログ一覧UI
- `app/blog/[slug]/page.tsx` — ブログ記事UI

### Agent B: コアアプリUI
- `app/(app)/home/page.tsx` — ホーム画面リデザイン
- `app/(app)/result/page.tsx` — チェック結果リデザイン
- `app/(app)/check/page.tsx` — チェック画面リデザイン
- `components/score/score-gauge.tsx` — ゲージ改善

### Agent C: プレミアム + 設定
- `app/(app)/subscription/page.tsx` — 課金ページリデザイン
- `app/(app)/ai-analysis/page.tsx` — AI分析リデザイン
- `app/(app)/history/page.tsx` — 推移グラフリデザイン
- `app/(app)/settings/page.tsx` — 設定画面リデザイン
- `components/chart/*.tsx` — チャート改善

## Wave 3-4: Claude Code — 統合

- [ ] Cursor Agent PR確認 + マージ
- [ ] `npm run build` + `npm run lint` = エラーゼロ
- [ ] 共通記憶保存（topic: api_contract）

## セキュリティ5項目

| # | 項目 | 対象 |
|---|------|------|
| 1 | 入力サニタイゼーション | OTP入力、ブログslugパラメータ |
| 2 | 所有権検証 | check_sessions.user_id, daily_notes.user_id |
| 3 | 外部認証トークン検証 | Supabase Auth OTP検証 |
| 4 | Rate limiting | OTP送信（Supabase側 2通/時間） |
| 5 | エラーメッセージ漏洩防止 | 内部IDやスタックトレースを返さない |
