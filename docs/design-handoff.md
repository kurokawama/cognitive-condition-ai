# Design Handoff: 認知コンディション AI

> Step 2 D3b | 2026-03-14 | Score: 24.3/30 (自動承認)
> Stitch Project ID: 4020146799459396826

## Screen Specifications & Brand Guidelines

## デザインスコア詳細

| 採点者 | ビジュアル | UX/導線 | ブランド | 合計 |
|--------|----------|---------|---------|------|
| 佐藤美咲 (UI/UX) | 8.5 | 8.5 | 9.0 | 26.0 |
| 鈴木陽子 (感情) | 7.6 | 7.75 | 8.1 | 23.5 |
| 田中誠 (マーケ) | 8.5 | 7.0 | 8.0 | 23.5 |
| **平均** | **8.2** | **7.75** | **8.37** | **24.3** |

## Stitch 画面一覧

### Screen 1: ホーム画面 (Home Dashboard)
- **Variant 1** (採用): `screens/25260f41e6e944ff936cac4268ca3d7d`
- **HTML**: `projects/4020146799459396826/files/560d2a7ee8ef44baa3b661ab971e2ed5`

### Screen 2: スコア結果画面 (Score Result)
- **Variant 1** (採用): `screens/1a843f108f254b19a97d7fe37cd3f6bd`
- **HTML**: `projects/4020146799459396826/files/f65e8069003d4fd2af9ee9b41ec71ee2`

### Screen 3: AI分析レポート (AI Analysis Report)
- **Variant 1** (採用): `screens/ab3b126a9d294554aedee493e5b0639c`
- **HTML**: `projects/4020146799459396826/files/b982a28981a04b62b1648741c149d2a1`

### Screen 4: 課金画面 (Subscription)
- **Variant 1** (採用): `screens/865c1ee2bf474893a166e17e3939add6`
- **HTML**: `projects/4020146799459396826/files/893ffc6b18cf463cb4f3e39c79b76a99`

## カラーパレット

| 用途 | カラー名 | HEX | Tailwind |
|------|---------|-----|----------|
| Primary | ティールブルー | #0EA5E9 | `sky-500` |
| Secondary | ウォームグレー | #64748B | `slate-500` |
| Accent | ソフトグリーン | #22C55E | `green-500` |
| Background | スレートホワイト | #F8FAFC | `slate-50` |
| Surface | ホワイト | #FFFFFF | `white` |
| Text Primary | ダークスレート | #1E293B | `slate-800` |
| Text Secondary | ミディアムグレー | #64748B | `slate-500` |
| Warning | ソフトアンバー | #F59E0B | `amber-500` |
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
- プログレス: `sky-500` グラデーション
- 中央テキスト: スコア数値 (72px Bold)

## 採点者フィードバック → 実装改善項目

### 必須改善（実装時に反映）

| # | 改善項目 | 指摘者 | 優先度 |
|---|---------|--------|--------|
| 1 | **結果画面のCTA優先順位を逆転**: 「AI分析を見る」を主CTA(青ベタ)、「ひとこと記録する」を副CTA(白枠)に | 田中誠 | Critical |
| 2 | **フォントサイズ拡大**: 本文17px以上、サブ項目数値も15px以上。65-74歳対応 | 佐藤美咲/鈴木陽子 | Critical |
| 3 | **D7無料体験カウントダウン**: ホーム画面に「あと○日でAI分析が無料体験できます」バナー | 田中誠 | High |
| 4 | **AI分析画面にプレミアムプレビュー**: 無料は1セクション、残りをぼかし | 田中誠 | High |
| 5 | **課金画面のストーリー訴求**: 機能リスト→「こんなことが分かるようになります」 | 鈴木陽子 | High |
| 6 | **エラー/空状態のデザイン**: 初回、ネットワークエラー、決済エラー | 佐藤美咲/田中誠 | Medium |
| 7 | **年額プランの具体金額**: 「年間で3,920円お得」に変更 | 田中誠 | Medium |

## 画面別実装仕様

### `/home` — ホーム画面
- 挨拶: 時間帯に応じた挨拶文 + ユーザー名
- 円形スコア: SVG + CSS animation (conic-gradient)
- 前日比: 正→green-500、ゼロ→slate-400、負→slate-500 (赤禁止)
- ストリーク: 火アイコン + 連続日数
- CTA: `bg-sky-500 text-white rounded-xl py-4 text-lg font-semibold`
- AIコメント: Card + AI avatar icon + テキスト
- **追加**: D7カウントダウンバナー（D1-D6の間のみ表示）
- ボトムナビ: 4タブ（ホーム/履歴/AIトーク/設定）

### `/check` — 60秒チェック画面
- 3テスト（反応速度/短期記憶/注意切替）を順次表示
- プログレスインジケータ: 「1/3」「2/3」「3/3」
- **タイマー非表示**（焦り防止）
- **やり直しボタンなし**（迷い防止）
- テスト切替: 0.2秒以内のフェードアニメーション

### `/result` — スコア結果画面
- 「チェック完了！」+ チェックマークアニメーション
- 「お疲れさまでした」テキスト
- 総合スコア: 64-72px Bold、3サブスコアバー
- 前日比バッジ: `rounded-full px-3 py-1`
- AIひとこと: カード内にAIアイコン + テキスト
- **主CTA: 「AI分析を見る」(青ベタ)** ← 田中誠指摘反映
- **副CTA: 「ひとこと記録する」(白枠)**

### `/ai-analysis` — AI分析画面 (有料、D7は1回無料)
- 傾向グラフ: 7日間折れ線 (recharts)
- 仮説カード: 「〜傾向があります」表現
- アクション提案: 3カード
- **プレミアムプレビュー**: 無料ユーザーは1セクション、残りぼかし
- CTA: 「AIトークで詳しく聞く」

### `/ai-talk` — AIトーク画面 (有料)
- チャット形式: 1-3往復
- AIトーン: 丁寧な友人
- PMDA準拠表現

### `/subscription` — 課金画面
- ヘッダー: 「あなたの認知コンディションを、もっと深く理解する」
- 月額/年額トグル、2プランカード
- **年額**: 「年間3,920円お得」
- CTA: 「プレミアムを始める」
- フッター: 「いつでもキャンセルできます」

### `/note` — ひとこと記録
- 3項目（睡眠/気分/忙しさ）各5段階セレクター

### `/history` — 推移グラフ
- 7日推移（無料）/ 90日（有料）

## 技術スタック
- **Framework**: Next.js 15 + TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Charts**: recharts
- **Auth**: Supabase Auth
- **AI**: Claude Messages API (Haiku)
- **Payment**: Stripe (Phase 1 モック)

## PMDA準拠チェックリスト
- [ ] 赤色を一切使用していないか
- [ ] 下矢印を使用していないか
- [ ] 「リスク」「危険」「異常」等の表現がないか
- [ ] AI出力に「〜傾向があります」を使用しているか
- [ ] 診断・治療・服薬に関する示唆がないか
