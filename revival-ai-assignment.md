# Revival AI振り分け表: 認知コンディション AI（v2 — revival-flow.md準拠）
> 2026-03-15 | レベル: L4（ビジネス改善 → L3デザイン → L2 UX → L1コード → Final）
> 前提: B2Cオンリー、1人+AI運用、SEO重視、LINE LIFF準備
> Gate R: revival-plan.json 生成済み ✅

## カスケード実行順序（revival-flow.md §レベル定義）

```
L4: ビジネス改善 ─── Wave 0-1
  ↓
L3: デザイン改善 ─── Wave 2-3
  ↓
L2: UX改善 ─────── Wave 4
  ↓
L1: コード改善 ─── Wave 5-6
  ↓
Final: 最終確認 ── Wave 7
```

## 変更規模の見積もり

| カテゴリ | 変更量 | 説明 |
|---------|-------|------|
| 戦略文書 | 3ファイル書き直し | impl_instructions, flow-diagram, design_brief |
| DB | テーブル3個削除、全テーブルからorg_id削除 | organizations, api_keys, org_analytics_cache |
| SEO基盤 | 新規5ファイル + 全ページmetadata追加 | sitemap, robots, OG画像, JSON-LD, SEOページ |
| SEOコンテンツ | 新規5ページ | about, blog, blog/[slug], check-demo, ランディング書き直し |
| モバイルUI | 全ページ修正 | globals.css, 全コンポーネント |
| デザイン | Stitch再デザイン + 3名採点 | モバイルファーストで再生成 |
| LIFF準備 | 新規4ファイル | lib/liff.ts, 認証抽象化, ドキュメント |
| 価格 | 1ファイル修正 | subscription画面 ¥980→¥580 |

---

## L4: ビジネス改善

### Wave 0: 情報収集（Perplexity + Gemini+Playwright 並列）

| # | ツール | タスク | 状態 |
|---|--------|-------|------|
| 0-1 | Perplexity pro-search | Next.js SEOベストプラクティス | ✅ 完了（本セッション） |
| 0-2 | Perplexity pro-search | 日本ヘルスケアアプリ価格帯調査 | ✅ 完了（本セッション） |
| 0-3 | Perplexity pro-search | LINE LIFF × Next.js技術統合 | ✅ 完了（本セッション） |
| 0-4 | Perplexity pro-search | 競合AwarefyのSEO戦略分析 | ✅ 完了（本セッション） |
| 0-5 | **Gemini+Playwright** | **競合サイト再スクレイピング（Docker内SPA対応）** | ⬜ 未実施 |
| | | 対象: Awarefy最新UI/料金、CogniFit日本語版、BrainHQ料金更新 | |
| | | Docker: mcr.microsoft.com/playwright:v1.52.0-noble | |

### Wave 1: 企画再討論（4名Agent並列 — F-P20違反防止）

**前回の共通記憶（Supabase）を全員に配布すること。**

| # | ツール | タスク |
|---|--------|-------|
| 1-1 | **TeamCreate → 4名Agent並列** | 企画再討論 |
| | 田中誠 📈 (`agents/marketing-pro.md`) | B2C集客戦略、SEO×広告の最適配分、¥580価格検証 |
| | 佐藤美咲 🎨 (`agents/ux-design-pro.md`) | モバイルファーストUI方針、SEOランディング設計 |
| | 鈴木陽子 💭 (`agents/emotion-journey-pro.md`) | B2C感情設計の再検討（法人感情設計を削除）、チェックデモの感情フロー |
| | 山田健太郎 📊 (`agents/planning-pro.md`) | B2Cオンリー収益計画、LINE LIFF統合の事業判断 |
| | **議題**: | |
| | - B2B/B2B2C 3層構造 → B2Cオンリーへの変更影響 | |
| | - SEO戦略（キーワード選定、コンテンツ計画） | |
| | - 価格変更 ¥980→¥580 の妥当性 | |
| | - LINE LIFF統合パス（個人フェーズ→会社統合） | |
| | - 感情設計の再検討（法人ユーザー削除、チェックデモ追加） | |
| | **配布資料**: Supabase共通記憶 + revival-research-2026-03-15.md | |
| 1-2 | **Product Architect** (`agents/product-architect.md`) | flow-diagram.json 更新 |
| | | org_admin ロール削除、SEOページ5つ追加、ロール2つに整理 |
| 1-3 | Claude Code | implementation_instructions.md 更新（4名合議結果を反映） |
| 1-4 | Claude Code | design_brief.md 更新（ターゲット再定義、SEO追加） |
| 1-5 | Claude Code | SEOキーワードマップ作成 → docs/seo-keyword-map.md |
| 1-6 | Claude Code | DB移行設計（org関連テーブル・カラム削除） |

---

## L3: デザイン改善

### Wave 2: デザイン再生成（Perplexity + Stitch + 3名採点）

| # | ツール | タスク |
|---|--------|-------|
| 2-1 | Perplexity | デザイントレンド調査（✅ Wave 0-1で実施済み — 結果をDesign Directorに配布） |
| 2-2 | **UX Architect** (`agents/ux-architect.md`) | design_brief.md の導線・ロール整合性チェック |
| 2-3 | **Design Director** (`agents/design-director.md`) | Stitch再デザインの方針策定 |
| 2-4 | **Stitch** | 改善対象画面の再デザイン（**バリアント2つ以上**） |
| | | 対象: ランディング、ホーム、チェック結果、課金画面（モバイルファースト375px） |
| | | **🚫 Stitchプロンプト1行目にテーマ宣言必須** |
| 2-5 | **3名Agent並列採点** | 30点画像採点（**Stitch screenshot URL使用 — コードベース採点禁止 F-P22**） |
| | | ≥24点: 自動承認 → Wave 3へ → LINE「🎨 自動承認 {score}/30」 |
| | | 21-23点: Perplexity改善ヒント → Stitch再生成 |
| | | ≤20点 × 3回: LINE「⏳ 3回再生成後も{score}点」→ 停止 |
| 2-6 | Claude Code | design-handoff.md 更新（承認デザインの仕様書） |

### Wave 3: デザイン実装 + SEO基盤（Claude Code + Cursor Agent並列）

| # | ツール | タスク |
|---|--------|-------|
| **3-A** | **Claude Code** | **SEO基盤 + モバイルUI基盤**（Cursor前に完了必須） |
| 3-A1 | | globals.css 全面修正（攻撃的ルール撤廃、モバイルファースト） |
| 3-A2 | | app/layout.tsx — metadataBase, next/font最適化, セマンティックHTML |
| 3-A3 | | app/sitemap.ts — 動的サイトマップ生成 |
| 3-A4 | | app/robots.ts — クローラー制御 |
| 3-A5 | | app/og/[...slug]/route.tsx — 動的OG画像生成(1200x630) |
| 3-A6 | | lib/seo.ts — JSON-LD構造化データヘルパー(FAQ, Article, WebApp) |
| 3-A7 | | lib/liff.ts — LINE LIFF初期化・環境検出ヘルパー |
| 3-A8 | | lib/auth-provider.ts — 認証抽象化（Supabase/LINE切り替え可能） |
| 3-A9 | | components/layout/bottom-nav.tsx — 絵文字→Lucide SVGアイコン |
| 3-A10 | | supabase/migrations — org関連テーブル・カラム削除 |
| 3-A11 | | PWA: public/manifest.json, service-worker |
| 3-A12 | | **Cursorバトン**: ① memory-save → ② design-handoff追記 → ③ git push |
| **3-B** | **Cursor Agent 3名並列** | **承認デザインのUI実装**（Claude Code基盤完了後） |
| 3-B1 | Agent A | SEOコンテンツ5ページ新規 + ランディング書き直し |
| | | `/` ランディング: H1/H2構造、FAQ JSON-LD、セマンティックHTML |
| | | `/about` サービス紹介: FAQ Schema、PMDA準拠表記 |
| | | `/blog` + `/blog/[slug]` ブログ: Article JSON-LD |
| | | `/check-demo` チェック体験: 認証不要、3問デモ → 登録CTA |
| 3-B2 | Agent B | ホーム/チェック/結果のモバイル修正 + Stitchデザイン反映 |
| 3-B3 | Agent C | AI分析/課金(¥580)/履歴/設定のモバイル修正 + Stitchデザイン反映 |
| **3-C** | Claude Code | **7項目比較チェック**: Stitch元デザイン vs 実装（preview_snapshot使用） |

### ファイル競合回避マップ

```
Agent A (SEOコンテンツ — 新規ページ):
  app/page.tsx              ← Agent A 専有（ランディング書き直し）
  app/about/                ← Agent A 新規
  app/blog/                 ← Agent A 新規
  app/blog/[slug]/          ← Agent A 新規
  app/check-demo/           ← Agent A 新規

Agent B (メインフロー — 既存修正):
  app/(app)/home/           ← Agent B 専有
  app/(app)/check/          ← Agent B 専有
  app/(app)/result/         ← Agent B 専有
  components/check/         ← Agent B 専有
  components/score/         ← Agent B 専有

Agent C (AI・課金・履歴 — 既存修正):
  app/(app)/ai-analysis/    ← Agent C 専有
  app/(app)/subscription/   ← Agent C 専有
  app/(app)/history/        ← Agent C 専有
  app/(app)/settings/       ← Agent C 専有
  app/(app)/note/           ← Agent C 専有
  components/ai/            ← Agent C 専有
  components/chart/         ← Agent C 専有

共有（Claude Code が Wave 0-3A で作成、Cursor は読み取りのみ）:
  lib/                      ← SEOヘルパー、LIFFヘルパー、認証抽象化
  types/                    ← 型定義
  components/ui/            ← shadcn/ui
  components/layout/        ← ボトムナビ（Wave 3Aで修正済み）
  app/layout.tsx            ← ルートレイアウト（Wave 3Aで修正済み）
  app/(app)/layout.tsx      ← 認証済みレイアウト
  app/globals.css           ← Wave 3Aで修正済み
  app/sitemap.ts            ← Wave 3Aで作成済み
  app/robots.ts             ← Wave 3Aで作成済み
  app/og/                   ← Wave 3Aで作成済み
```

---

## L2: UX改善

### Wave 4: UXスコアリング + 改善

| # | ツール | タスク |
|---|--------|-------|
| 4-1 | **3名Agent並列** | UXスコアリング 30点満点 |
| | | - 導線の自然さ (10点) |
| | | - 情報設計の適切さ (10点) |
| | | - 視覚的一貫性 (10点) |
| 4-2 | 自動判定 | ≥24点: 合格 → Wave 5へ |
| | | 21-23点: 部分改善 → 低スコア項目のみ修正 |
| | | ≤20点: 大幅改善 → 広範囲修正 |
| 4-3 | Claude Code + Cursor Agent | UX改善実装（低スコア項目のみ） |
| 4-4 | Playwright + Team Agent | 改善後の再テスト + ロール再動線テスト |

---

## L1: コード改善

### Wave 5: ビルド・テスト

| # | ツール | タスク |
|---|--------|-------|
| 5-1 | Bash | `npm run build` → エラー修正 |
| 5-2 | Bash | `npm run lint` → ESLintエラー修正 |
| 5-3 | Claude Code | Playwrightテスト更新（SEOページ追加分、モバイルビューポート追加） |
| 5-4 | **Playwright (Docker)** | E2Eテスト実行 → 全合格確認 |
| | | iPhone SE (375px), iPhone 14 (390px), Galaxy S24 (360px) |
| 5-5 | Claude Code | Lighthouse SEOスコア確認（全公開ページ90+目標） |
| 5-6 | Claude Code | 構造化データテスト（JSON-LD検証） |

### Wave 6: ロール別動線テスト

| # | ツール | タスク |
|---|--------|-------|
| 6-1 | **TeamCreate → 2名Agent並列** | ロール別動線テスト（org_admin削除後: user, user_premium の2ロール） |
| | user Agent | 無料ユーザー: ランディング → 登録 → チェック → 結果 → 7日推移 |
| | user_premium Agent | 有料ユーザー: AI分析 → AIトーク → 90日履歴 → 週次レポート |
| | 各Agent | preview_snapshot で全画面を歩き、UX問題を報告 |
| 6-2 | Claude Code | 発見された問題の修正 |
| 6-3 | **Spec Reviewer** (`agents/spec-reviewer.md`) | 全Gate証拠確認 |
| | | playwright-results.json (HMAC署名) |
| | | navigation-check.json (HMAC署名) |
| | | role-test-results.json (HMAC署名) |
| | | design-review-evidence.json (HMAC署名) |
| | | agent-review.json (Gate 2 — 6観点レビュー) |
| | | memory-log.json (全Step分エントリ) |

---

## Final: 最終確認

### Wave 7: デプロイ + 報告

| # | ツール | タスク |
|---|--------|-------|
| 7-1 | Bash | `npm run build` + `npm run lint` = エラーゼロ最終確認 |
| 7-2 | Playwright | 全テスト合格最終確認 |
| 7-3 | Claude Code | docs/liff-integration-guide.md — 社内エンジニア向け手順書 |
| 7-4 | Claude Code | Vercel本番デプロイ |
| 7-5 | Claude Code | **リバイバルレポート作成**（変更点・改善点・残課題・SEO状況） |
| 7-6 | Bash + n8n | `git push` + 共通記憶保存 + LINE通知「✅ 認知コンディションAI Revival完了」 |

---

## セキュリティチェック（Wave 3A完了時に確認）

| # | 項目 | 対策 |
|---|------|------|
| 1 | org関連コード完全削除 | grep で残存チェック |
| 2 | RLSポリシー見直し | org_id条件の削除漏れなし |
| 3 | SEOページの認証不要ルート | 機密データが公開ルートに漏れないこと |
| 4 | check-demo | デモ結果をDBに保存しない |
| 5 | LIFF ID | NEXT_PUBLIC_ prefix（クライアント公開OK） |

## 共通記憶保存（Gate M — 各Wave完了時）

| Wave | topic | 内容 |
|------|-------|------|
| 1 | requirements_v2 | B2Cオンリー戦略、4名合議結果、SEO方針 |
| 1 | market_research_v2 | --perplexity AND --gemini フラグ必須 |
| 2 | design_decision_v2 | 再デザイン採点結果、カラー・トークン変更 |
| 3A | api_contract_v2 | SEO基盤、LIFF準備、DB変更 |
| 6 | competitive_analysis_v2 | UXスコア、ロールテスト結果 |
| 7 | lesson_learned_v2 | リバイバル完了記録 |

## 参照ドキュメント

- `revival-plan.json` — revival-check.mjs 出力（Gate R通過証拠）
- `revival-research-2026-03-15.md` — Perplexity調査結果4件
- `design-handoff.md` — Stitch画面仕様（Wave 2で更新）
- `CLAUDE.md` — デザイントークン
- `flow-diagram.json` — 現行フロー図（Wave 1で更新）
- `implementation_instructions.md` — 現行仕様（Wave 1で書き換え）
- `rules/revival-flow.md` — リバイバルフロー定義
