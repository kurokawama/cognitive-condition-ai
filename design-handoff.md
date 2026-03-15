# Design Handoff: 認知コンディション AI (Revival v3 — B2Cオンリー)

> Revival Wave 2 D3b | 2026-03-15 | Score: 24.0/30 (Landing v2改善後)
> Stitch Project ID: 7910963353588602480

## デザインスコア詳細

| 採点者 | 観点 | スコア |
|--------|------|--------|
| Agent A | ブランド一貫性・視覚的インパクト | 8.7 / 10 |
| Agent B | UX導線・操作性 | 7.8 / 10 |
| Agent C | 感情設計・ターゲット適合性 | 7.5 / 10 |
| **合計** | | **24.0 / 30** |

### 採点フィードバック要約
- Landing v1のダークテーマ → v2でライトテーマに修正 → ブランド統一性改善
- Check ResultのカテゴリカラーをTailwindパレット内に限定すること
- Subscriptionの比較表フォントサイズ拡大（シニア対応）
- PMDA違反: なし（全Agent確認済み）

## Stitch 画面一覧

### Screen 1: Landing Page (SEOランディング) — v2
- **Screen ID**: `451e7cbc11014c0d8415d6ef07e8d7d9`
- **Screenshot**: `https://lh3.googleusercontent.com/aida/AOfcidXJhuWB6fR0iFJJjvZXEnOW3CTao-VXQ2EltYPEXluaeWWbQkpDmigTbcBmBR78N--KNOEJVXnEF73JC5r7hjMuvO3MWlVp8Qj5sAQd7Gm6uyNKuqcC42n-jp0ei_e73QDFFaroxFoacvpDatqNZ4DVk6ltnjPR6Zc53Xf_jDGbB9_L0vuxcQbbxEcDOCS31juGlkdJz6TAqRGQtgFNW3qztiOhMnkGTwg4QjIibSxtnynyYDRc0pqj5bc`
- **HTML**: `projects/7910963353588602480/files/0edeb0a2d9154b229a61ff173b72238e`
- **実装パス**: `/` (SEOランディング、認証不要)

### Screen 2: Home Screen (ログイン後ホーム)
- **Screen ID**: `2dfbeaba64174992af97b8529ae2da92`
- **Screenshot**: `https://lh3.googleusercontent.com/aida/AOfcidVce0QRj4UoDKHBFUMRCZRMOP73fb8EdaRc0KnzU6NVAzjW2PvBuQkO9aOZGDLsDgSRSUsCUWP-uE9pU46DlwjMknPLW-rTTZYHSKu1HBqtKd5j_dAEJIeduQun8dDXGJ7zAZkFhzvtlXCc35jg6bHAICOcXmRYkCFMdjzS3KVLWGJprAp1H4BZlxN2TzgoBvTNQTuYIO5Q07fMlHLIC7iTzZZE-YLxUDmbeQU6jOrsO7nvX-9YBVPPpxQ`
- **HTML**: `projects/7910963353588602480/files/71e53d488a3b47ac89226e6929833b08`
- **実装パス**: `/home` (認証必須)

### Screen 3: Check Result (チェック結果)
- **Screen ID**: `0e51c338f57f40a39850d9efc7f9ef59`
- **Screenshot**: `https://lh3.googleusercontent.com/aida/AOfcidU9ajHxVFYQ7nnqFxGdkG3xNlD2XPHADWGWrdq8jg_HVnjpnhZ-RlSme-NXU9489E1XcEt5MAsfaplszWkkbUcnV7c6YpiyO4JXRSU0yAfVwlvxDKhJs4VWykDeH9uh1NTjjlBWji2OTbs62dIbT3zELjmNCSG0cOk2U53s7EkdNA_hIr6tajftnOp0ppciDJgFuSGVuX73ZDXrtXo-RXEe45YpkjiF0XAXFHwVWIl_j65t9lscTU9zAQ`
- **HTML**: `projects/7910963353588602480/files/5fdc8606e3de45d4bdcd21cb39bb9414`
- **実装パス**: `/result` (認証必須)

### Screen 4: Subscription (課金ページ)
- **Screen ID**: `d1f4f0ae5e094055a55b8d5942cf6be6`
- **Screenshot**: `https://lh3.googleusercontent.com/aida/AOfcidWnoDv-XFW5ZPMIQxRxiFG8Ks2AT3ulR7-wO4yBYmwkk4_8tNmDpl0at8b6qMpnIkvDtF16vFMzbZkKO9Yx7rxMI9InJlAgTuiP9fZatddYJjKSMdpyBEZ-BtCtOJZWtFPyZ-pdFT8X524xCfRxSKATc7R2DXa8o4SuPOJUq39UKgmQbLIRTKyd_JP_eAkdjqyW8bVJv1XjwmzThnlaE1mSxArDxFB74BcCvEcQDVlGUhE-RSCq9GE4RLc`
- **HTML**: `projects/7910963353588602480/files/560eb4a0a28641b483d65ec991af2ed1`
- **実装パス**: `/subscription` (認証不要でも閲覧可、決済は認証必須)

## カラーパレット

| 用途 | カラー名 | HEX | Tailwind |
|------|---------|-----|----------|
| Primary | ティールブルー | #0EA5E9 | `sky-500` |
| Secondary | ウォームグレー | #64748B | `slate-500` |
| Accent | ソフトグリーン | #22C55E | `green-500` |
| Forest Green | フォレストグリーン | #2D5016 | `green-900` |
| Background | スレートホワイト | #F8FAFC | `slate-50` |
| Surface | ホワイト | #FFFFFF | `white` |
| Text Primary | ダークスレート | #1E293B | `slate-800` |
| Text Secondary | ミディアムグレー | #64748B | `slate-500` |
| Warning | ソフトアンバー | #F59E0B | `amber-500` |
| Success Light | ライトグリーン背景 | #F0FFF4 | `green-50` |
| **Danger/Error** | **赤色禁止** | — | — |

## タイポグラフィ

| 用途 | フォント | サイズ | ウェイト | Tailwind |
|------|---------|-------|---------|----------|
| スコア数値 | Inter | 64-72px | Bold | `text-7xl font-bold` |
| 見出し1 | Noto Sans JP | 24px | Bold | `text-2xl font-bold` |
| 見出し2 | Noto Sans JP | 20px | Semibold | `text-xl font-semibold` |
| 本文 | Noto Sans JP | 17px+ | Regular | `text-lg` |
| 補助テキスト | Noto Sans JP | 15px | Regular | `text-base text-slate-500` |
| ボタンラベル | Noto Sans JP | 17px | Semibold | `text-lg font-semibold` |

## コンポーネント仕様

### 角丸
- カード: `rounded-xl` (12px)
- ボタン: `rounded-xl` (12px)
- バッジ: `rounded-full`
- 入力フィールド: `rounded-lg` (8px)

### シャドウ
- カード: `shadow-sm`
- モーダル: `shadow-lg`
- ボタンホバー: `shadow-md`

### タップターゲット
- **全ボタン**: 最低 48x48px (`min-h-12 min-w-12`)
- **全リンク**: 最低 44x44pt パディング込み

### スコア円形ゲージ
- 外径: 200px
- ストローク幅: 12px
- 背景: `slate-200`
- プログレス: `sky-500` → `green-500` グラデーション
- 中央テキスト: スコア数値 (72px Bold)

## 画面別実装仕様

### `/` — SEOランディングページ (Screen 1)
- **SEO**: generateMetadata, JSON-LD (WebApplication + FAQ), OG画像動的生成
- ヘッダー: ロゴ + 「ログイン」リンク + 「無料で始める」ティールボタン
- ヒーロー: ライトグラデーション背景(#F0F7FF→#FFFFFF)
  - H1: 「あなたの認知力、今日は何点？」
  - サブ: AI分析の訴求テキスト
  - フォンモックアップ: スコア82の円形ゲージ表示
  - CTA: 「無料でチェックしてみる →」 `bg-sky-500 text-white rounded-xl py-4`
- ソーシャルプルーフ: 利用者数・評価・セキュリティ 3項目バー
- 3ステップ説明: チェック→分析→改善
- 特徴セクション: 3つの価値訴求（左右交互レイアウト）
- テスティモニアル: #F0FFF4背景、2つのレビューカード
- 料金プレビュー: 無料 vs プレミアム簡易比較
- FAQ: アコーディオン3つ（JSON-LDと連携）
- フッター: ポリシーリンク

### `/home` — ホーム画面 (Screen 2)
- 挨拶: 時間帯対応 + ユーザー名
- 円形スコア: SVG + CSS animation (conic-gradient)
- 前日比: 正→green-500、ゼロ→slate-400、負→slate-500 (赤禁止)
- ストリーク: 火アイコン + 連続日数バッジ
- CTA: 「今日のチェックを始める →」 `bg-sky-500 text-white rounded-xl py-4 text-lg font-semibold`
- AIコメント: Card + AIアイコン + テキスト
- 今週サマリー: チェック率・回数・最高スコア（**フォントサイズ拡大: 15px以上**）
- D7カウントダウンバナー（D1-D6のみ表示）
- ボトムナビ: 4タブ（ホーム/チェック/レポート/設定）

### `/check` — 60秒チェック画面
- 3テスト（反応速度/短期記憶/注意切替）を順次表示
- プログレス: 「1/3」「2/3」「3/3」
- タイマー非表示（焦り防止）
- やり直しボタンなし（迷い防止）
- テスト切替: 0.2秒フェードアニメーション

### `/result` — チェック結果画面 (Screen 3)
- 「チェック完了！」+ チェックマークアニメーション
- 総合スコア: 78表示、フォレストグリーンの円形ゲージ
- 「今日のコンディション」ラベル + 「良好な状態です 🌿」サブタイトル
- 5カテゴリ分解: 集中力/記憶力/判断力/処理速度/柔軟性
  - 各カテゴリ: アイコン + 名前 + 水平バー + スコア数値
  - **カラー制限**: sage(green-300) / teal(teal-400) / blue(sky-400) / lavender(violet-300) / amber(amber-400) のみ
- AIインサイトカード: #F0FFF4背景、「🧠 AIからのアドバイス」
- 7日間トレンドミニチャート: recharts折れ線
- アクションボタン2つ横並び:
  - 主CTA: 「🏋️ トレーニング」フォレストグリーン背景
  - 副CTA: 「📊 詳細レポート」白背景+グリーンボーダー
- ボトムナビ: チェックタブがアクティブ

### `/check-demo` — チェックデモ (認証不要、3問限定)
- SEO流入からの最重要ファネル
- 3問体験 → 簡易結果 → 「もっと詳しく知る」→ 会員登録誘導
- generateMetadata: 「認知コンディション 無料チェック」

### `/subscription` — 課金ページ (Screen 4)
- ヘッダー: 「プレミアムプラン」
- ヒーロー: 脳×自然のイラスト + 「もっと深く、自分を知る」
- プラントグル: 月額/年額切り替え（年額デフォルト選択、「17%おトク」バッジ）
- **年額カード(Primary)**: 2px green border、「おすすめ」リボン
  - ¥4,800/年（月あたり¥400）
  - 5つの特典チェックリスト（green checkmarks）
  - CTA: 「年額プランで始める」 `bg-green-800 text-white` full width
- **月額カード(Secondary)**: 1px gray border
  - ¥580/月
  - CTA: 白背景 + green border
- 無料 vs プレミアム比較表（**フォントサイズ15px以上、行間1.5rem以上**）
- 信頼要素: 🔒解約自由 / 💳安全決済 / 📱全デバイス
- FAQ アコーディオン 3つ
- Sticky底部CTA: 「年額プランで始める — ¥4,800/年」+ 「7日間の無料トライアル付き」

### `/about` — サービス紹介 (SEOページ)
- generateMetadata + JSON-LD (Article)
- サービス概要、チーム紹介、PMDA準拠の説明

### `/blog`, `/blog/[slug]` — ブログ (SEOページ)
- generateMetadata + JSON-LD (Article)
- 認知ウェルネス関連記事

### `/ai-analysis` — AI分析画面 (有料、D7は1回無料)
- 7日間傾向グラフ (recharts)
- 仮説カード: 「〜傾向があります」表現
- アクション提案: 3カード
- プレミアムプレビュー: 無料は1セクション、残りぼかし

### `/ai-talk` — AIトーク (有料)
- チャット形式: 1-3往復
- AIトーン: 丁寧な友人
- PMDA準拠表現のみ

### `/settings` — 設定画面
- プロフィール編集
- プラン管理
- 通知設定
- データエクスポート（プレミアム）

### `/history` — 推移グラフ
- 7日推移（無料）/ 90日（有料）

## ナビゲーション構造

### Public Header (認証前)
- ロゴ / ログイン / 無料で始める

### Auth Bottom Nav (認証後)
- ホーム(`/home`) / チェック(`/check`) / レポート(`/history`) / 設定(`/settings`)
- アクティブ: sky-500 fill + テキスト色
- 非アクティブ: slate-400

## 技術スタック
- **Framework**: Next.js 15 App Router + TypeScript
- **UI**: Tailwind CSS v4 (`@theme` directive) — shadcn/ui なし（軽量化）
- **Charts**: recharts
- **Auth**: Supabase Auth (Email OTP)
- **DB**: Supabase PostgreSQL (4テーブル: users, check_results, subscriptions, blog_posts)
- **AI**: Claude Messages API (Haiku) — スコア解釈・AI分析・AIトーク
- **Payment**: Stripe (Phase 1: モック、Phase 2: 実装)
- **SEO**: generateMetadata, JSON-LD, sitemap.ts, robots.ts, Dynamic OG
- **LINE LIFF**: Phase 2 準備（lib/liff.ts スタブのみ）

## PMDA準拠チェックリスト
- [ ] 赤色を一切使用していないか
- [ ] 下矢印を使用していないか
- [ ] 「リスク」「危険」「異常」「診断」「検査」等の表現がないか
- [ ] AI出力に「〜傾向があります」を使用しているか
- [ ] 診断・治療・服薬に関する示唆がないか
- [ ] 低スコア時も肯定的表現（「改善の余地があります」等）か

## 採点フィードバック → 実装改善項目

| # | 改善項目 | 指摘者 | 優先度 |
|---|---------|--------|--------|
| 1 | カテゴリスコアバーのカラーをパレット内5色に限定 | Agent A | Critical |
| 2 | Subscription比較表のフォントサイズ15px以上 + 行間拡大 | Agent B | Critical |
| 3 | Result画面のCTA優先順位: トレーニング(主) > 詳細レポート(副) | Agent B | High |
| 4 | Home「今週サマリー」数値フォントサイズ15px以上 | Agent B | High |
| 5 | D7無料体験カウントダウンバナー追加 | 前回合議 | High |
| 6 | Subscription「ストーリー訴求」追加 | 前回合議 | Medium |
| 7 | 年額プランの具体金額表示「年間で○円お得」 | 前回合議 | Medium |
