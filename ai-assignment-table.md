# AI振り分け表: 認知コンディション AI

> Step 4a | 2026-03-14 | Gate 1 通過証拠
> Perplexity 技術選定済み（sonar-reasoning）

## 技術選定（Perplexity reasoning 結果）

| 選定項目 | 選択 | 理由 |
|---------|------|------|
| Router | App Router | Server Components + Server Actions。2026標準。Pages Routerはレガシー |
| Auth | Supabase Auth | RLS連携シームレス、Edge Functions低レイテンシ、PWA認証に強い |
| Charts | recharts | React ネイティブ、SSR親和性高い、hydration短縮。Chart.jsはバンドル大 |
| UI | shadcn/ui + Tailwind | design-handoff.md のトークン直適用。コンポーネント単位でカスタム可能 |
| AI | Claude Messages API (Haiku) | スコア解釈¥0.3/回。Sonnetは法人分析のみ（Phase 2） |
| Payment | Stripe（Phase 1モック） | Stripe Elements → Checkout Session。Phase 1はモックUI |
| DB | Supabase PostgreSQL + RLS | org_id列Phase 1から設計。マルチテナント準備 |

## Wave並列設計

```
Wave 0: 調査・設計（完了済み — Step 1-3）
  └── 市場調査 + フロー図 + デザイン + トークン定義

Wave 1: Claude Code 基盤実装（Step 4b）
  ├── プロジェクト初期化（Next.js 15 + TypeScript）
  ├── Supabase設定（テーブル・RLS・Auth）
  ├── 型定義（TypeScript types）
  ├── API骨格（Server Actions）
  ├── 認知テストロジック（3テスト: 反応速度・短期記憶・注意切替）
  ├── Claude Messages API統合（スコア解釈・AI分析）
  └── 共通レイアウト・ナビゲーション骨格

Wave 2: Cursor Agent 並列UI実装（Step 4c）
  ├── Agent A: 認証 + オンボーディング + 設定
  ├── Agent B: ホーム + チェック + 結果
  └── Agent C: AI分析 + 課金 + 履歴

Wave 3: 統合・テスト（Step 4d-5）
  ├── Playwright検証（Critical 100% / High 90%）
  ├── PR統合・ビルド確認
  └── 全導線テスト
```

## Claude Code 担当（Wave 1 — Step 4b）

| # | 作業 | ファイル | 優先度 |
|---|------|---------|--------|
| 1 | Next.js 15 プロジェクト初期化 | package.json, tsconfig.json, next.config.ts, tailwind.config.ts | Critical |
| 2 | Supabase クライアント設定 | lib/supabase/client.ts, lib/supabase/server.ts | Critical |
| 3 | DB マイグレーション（7テーブル） | supabase/migrations/*.sql | Critical |
| 4 | RLS ポリシー定義 | supabase/migrations/*_rls.sql | Critical |
| 5 | 型定義 | types/database.ts, types/check.ts, types/ai.ts | Critical |
| 6 | 認証 Server Actions | app/(auth)/actions.ts | Critical |
| 7 | チェック Server Actions | app/actions/check.ts | Critical |
| 8 | AI分析 Server Actions | app/actions/ai-analysis.ts | High |
| 9 | スコア計算ロジック | lib/scoring.ts | Critical |
| 10 | Claude Messages API 統合 | lib/claude.ts | High |
| 11 | 共通レイアウト骨格 | app/layout.tsx, app/(app)/layout.tsx | High |
| 12 | ボトムナビ（スケルトン） | components/layout/bottom-nav.tsx | High |
| 13 | デザイントークン CSS | app/globals.css | High |
| 14 | 環境変数テンプレート | .env.example | Medium |
| 15 | 課金モック | lib/subscription.ts | Medium |

## Cursor Agent 担当（Wave 2 — Step 4c）

### Agent A: 認証 + オンボーディング + 設定（4ページ）

| ページ | パス | design-handoff参照 | 主要コンポーネント |
|--------|------|-------------------|-------------------|
| ランディング | `/` | — | ヒーロー、CTA、特徴説明 |
| ログイン | `/auth/login` | — | メール+パスワードフォーム |
| 新規登録 | `/auth/register` | — | 登録フォーム、利用規約チェック |
| 設定 | `/settings` | — | プロフィール、通知設定、ログアウト |

**指示ポイント**:
- Supabase Auth の signInWithPassword / signUp を使用
- 3タップでオンボーディング完了
- PMDA免責事項を利用規約に含める
- design-handoff.md のカラー・タイポグラフィ・角丸を厳守

### Agent B: ホーム + チェック + 結果（3ページ — メインフロー）

| ページ | パス | design-handoff参照 | 主要コンポーネント |
|--------|------|-------------------|-------------------|
| ホーム | `/home` | Screen 1 (Stitch) | 円形スコアゲージ(SVG)、ストリーク、AIコメント、D7バナー |
| チェック | `/check` | — | 3テスト順次表示、プログレス(1/3)、タイマー非表示 |
| 結果 | `/result` | Screen 2 (Stitch) | 総合スコア(72px)、3サブスコアバー、主CTA「AI分析」、副CTA「記録」 |

**指示ポイント**:
- 円形スコアゲージ: SVG conic-gradient、外径200px、ストローク12px
- 前日比: 正→green-500、ゼロ→slate-400、負→slate-500（**赤色禁止**）
- チェック画面: テスト切替0.2秒フェード、タイマー非表示、やり直しボタンなし
- 結果画面CTA順序: 「AI分析を見る」(青ベタ主CTA) → 「ひとこと記録」(白枠副CTA)
- **Stitch HTMLを参照**: Screen 1, Screen 2 の HTML ファイルIDあり

### Agent C: AI分析 + 課金 + 履歴 + 記録（4ページ）

| ページ | パス | design-handoff参照 | 主要コンポーネント |
|--------|------|-------------------|-------------------|
| AI分析 | `/ai-analysis` | Screen 3 (Stitch) | 7日折れ線(recharts)、仮説カード、プレミアムプレビュー(ぼかし) |
| 課金 | `/subscription` | Screen 4 (Stitch) | 月額/年額トグル、プランカード、「年間3,920円お得」 |
| 履歴 | `/history` | — | 7日推移(無料)/90日(有料)、recharts折れ線 |
| 記録 | `/note` | — | 睡眠/気分/忙しさ 各5段階セレクター |

**指示ポイント**:
- AI分析: 無料ユーザーは1セクションのみ表示、残りぼかし(backdrop-blur)
- 課金: ストーリー訴求「こんなことが分かるようになります」（機能リスト→体験価値）
- recharts: `<LineChart>` + `<Line stroke="#0EA5E9">` でスコア推移
- 全ページ: フォント17px以上、タップ48x48px以上、赤色禁止

## ファイル競合回避マップ

```
Agent A (認証):
  app/(auth)/          ← Agent A 専有
  app/(app)/settings/  ← Agent A 専有
  components/auth/     ← Agent A 専有

Agent B (メインフロー):
  app/(app)/home/      ← Agent B 専有
  app/(app)/check/     ← Agent B 専有
  app/(app)/result/    ← Agent B 専有
  components/check/    ← Agent B 専有
  components/score/    ← Agent B 専有

Agent C (AI・課金・履歴):
  app/(app)/ai-analysis/ ← Agent C 専有
  app/(app)/subscription/ ← Agent C 専有
  app/(app)/history/    ← Agent C 専有
  app/(app)/note/       ← Agent C 専有
  components/ai/        ← Agent C 専有
  components/chart/     ← Agent C 専有

共有（Claude Code が Wave 1 で作成、Cursor は読み取りのみ）:
  lib/                 ← 全 Server Actions・ユーティリティ
  types/               ← 型定義
  components/ui/       ← shadcn/ui コンポーネント
  components/layout/   ← 共通レイアウト
  app/layout.tsx       ← ルートレイアウト
  app/(app)/layout.tsx ← 認証済みレイアウト
  app/globals.css      ← デザイントークン
```

## セキュリティ5項目チェック（4b完了前に確認）

| # | 項目 | 対策 |
|---|------|------|
| 1 | 入力サニタイゼーション | Server Action内でzodバリデーション。ilike/eq値はエスケープ |
| 2 | 所有権検証 | 全クエリに `.eq("user_id", userId)`。RLSで二重防御 |
| 3 | 外部認証トークン検証 | Supabase Auth JWT検証。Edge Function内でsupabase.auth.getUser() |
| 4 | Rate limiting | AI分析: 有料ユーザーのみ。チェック: 1日1回制限（DB制約） |
| 5 | エラーメッセージ | 内部ID・スタック非公開。ユーザー向けは汎用メッセージ |

## Cursorバトン（4b完了後の順序）

1. `node ~/.claude/scripts/memory-save.mjs "cognitive-condition-ai" "4" "api_contract" "{型定義・API契約}"`
2. implementation_instructions.md + design-handoff.md にサマリー追記
3. `git push`（Cursorが読める状態にする）

## 参照ドキュメント

- `design-handoff.md` — Stitch画面仕様・カラー・タイポグラフィ・改善項目
- `CLAUDE.md` — デザイントークン（CSS変数 + Tailwind拡張）
- `flow-diagram.json` — 全18ページ・9フロー・3ロール定義
- `implementation_instructions.md` — 事業仕様・DB設計・API設計・感情設計
