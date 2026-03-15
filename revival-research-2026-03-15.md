# Revival Research: 認知コンディション AI
> 2026-03-15 | Perplexity pro-search x4

## 1. Next.js App Router SEOベストプラクティス

### 必須実装項目
- **generateMetadata**: 全ルートにMetadata API（`<Head>`タグ禁止）
- **metadataBase**: ルートlayoutに設定 → canonical URL自動生成
- **JSON-LD構造化データ**: FAQ, Article, Organization スキーマ
- **Dynamic OG画像**: 1200x630px、ルートごとに動的生成（`app/og/route.tsx`）
- **sitemap.ts + robots.ts**: canonical URLのみ、50,000URL以下
- **セマンティックHTML**: `<article>`, `<section>`, `<header>`, `<nav>`
- **レンダリング戦略**: ブログ→SSG / 価格→ISR / ダッシュボード→SSR

### Core Web Vitals目標
| メトリクス | 目標 | 対策 |
|-----------|------|------|
| LCP | ≤2.5s | Server Components、Image最適化 |
| CLS | ≤0.1 | フォント事前読み込み、画像サイズ指定 |
| INP | ≤200ms | クライアントJS最小化 |

### SEOコンテンツページ（新規追加が必要）
| パス | 内容 | レンダリング | SEOキーワード |
|------|------|------------|-------------|
| `/` | ランディング（SEO最適化版） | SSG | 認知チェック, 脳コンディション |
| `/about` | サービス紹介 + FAQ | SSG + FAQ JSON-LD | 認知機能チェック アプリ 無料 |
| `/blog` | SEO記事一覧 | SSG | — |
| `/blog/[slug]` | 個別記事 | SSG + Article JSON-LD | 各記事のターゲットKW |
| `/check-demo` | チェック体験（認証不要） | SSR | 脳トレ 1分 無料 チェック |

## 2. 価格帯調査（Playwright Docker再スクレイピング + Gemini構造化分析 — 2026-03-15）

### 最新料金比較（実データ）

| アプリ | 月額（月払い） | 月額（年払い） | 年額 | 更新日 |
|--------|-------------|-------------|------|--------|
| **Awarefy ベーシック** | ¥1,600 | **¥800** | ¥9,600 | 2026-03 |
| **Awarefy AIパートナー** | ¥4,480 | ¥1,583 | ¥19,000 | 2026-03 |
| **BrainHQ** | ~¥1,400 | ~¥800 | ~¥9,600 | 料金ページ404 |
| **CogniFit** | 不明 | 不明 | 不明 | SPA |
| **当サービス案** | **¥580** | **¥400** | **¥4,800** | — |

### 重要な発見（前回調査からの変化）
- **Awarefyが値下げ**: ベーシック年間 ¥980→¥800/月に下げた
- **Awarefyが高額プラン新設**: AIパートナー¥4,480/月（AI無制限）
- **CogniFit**: 12,176ユーザー増（6,174,783→6,186,959）
- **BrainHQ**: 料金ページ404（リニューアルか撤退か要監視）

### 価格戦略の根拠（Gemini分析結果）
- ¥580/月 = Awarefyベーシック年間(¥800)より**さらに安い**
- 年払い¥400/月 = 全競合の最安値帯
- Awarefyは「メンタルヘルス全般」、当サービスは「認知チェック1分」で棲み分け
- 「ワンコイン+α」の心理的ハードル
- 会社統合時に「会員特典で無料」に切り替えやすい
- **差別化軸は価格ではなく「体×頭の統合コンディション管理」**

## 3. LINE LIFF技術統合

### 必要な準備（今やること）
1. **環境変数**: `NEXT_PUBLIC_LIFF_ID` を `.env.example` に追加
2. **依存関係**: `@line/liff` をオプショナルで追加
3. **ヘルパー**: `lib/liff.ts` — init, isInClient, getProfile
4. **認証分離**: Supabase Auth を抽象化して LINE Login に差し替え可能にする
5. **ドキュメント**: `docs/liff-integration-guide.md` — 社内エンジニア向け手順書

### LIFF統合コード例
```typescript
// lib/liff.ts
import liff from '@line/liff';

export async function initLiff() {
  await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
  return liff;
}

export function isInLineApp(): boolean {
  return typeof window !== 'undefined' && liff.isInClient();
}

export function getLineProfile() {
  return liff.getProfile();
}
```

### 社内エンジニア向け統合ステップ
1. LINE Developers Console で LIFF アプリ作成
2. `.env.local` に `NEXT_PUBLIC_LIFF_ID` 設定
3. `lib/auth.ts` の認証プロバイダを LINE Login に切り替え
4. LINE公式アカウントのリッチメニューから LIFF URL を設定
5. テスト: LINE アプリ内 WebView で動作確認

## 4. 競合SEO戦略分析（Awarefy等）

### Awarefyの集客構造
- 累計100万DL（2026年3月9日発表）
- ターゲットKW: メンタルヘルスアプリ, ストレスチェック, 匿名カウンセリング
- コンテンツ: ストレス管理ガイド, デジタルCBT解説, マインドフルネス
- 臨床エビデンス訴求（E-A-T重視）

### 当サービスが狙うべきSEOキーワード（Awarefy非競合領域）
| カテゴリ | キーワード | 競合度 | 理由 |
|---------|-----------|-------|------|
| **メイン** | 認知チェック 無料 | 低 | Awarefyは「メンタルヘルス」、当サービスは「認知」 |
| **メイン** | 脳 コンディション 管理 | 低 | 新カテゴリ、競合少ない |
| **ロングテール** | 集中力 低下 チェック アプリ | 中 | ビジネスパーソン向け |
| **ロングテール** | 頭の体重計 認知 | なし | ブランドKW、先行確保 |
| **ロングテール** | 仕事 パフォーマンス 認知 測定 | 低 | ビジネス文脈 |
| **ロングテール** | ストレッチ 認知機能 効果 | なし | Dr.Stretch文脈の先行確保 |
| **情報系** | 認知機能 セルフチェック 方法 | 中 | SEOブログ記事向け |
| **情報系** | 脳トレ 効果ない なぜ | 中 | 「鍛える→測る」の差別化記事 |

### 差別化ポジション
- Awarefy = メンタルヘルス（ストレス・不安・うつ）
- **当サービス = 認知コンディション（集中力・反応速度・記憶力）**
- 直接競合を避け、**認知 × コンディション管理**の新カテゴリを作る
