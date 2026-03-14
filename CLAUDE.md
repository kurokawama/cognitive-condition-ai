# 認知コンディション AI — プロジェクト CLAUDE.md

## デザイントークン

### カラー（CSS変数 → Tailwind）

```css
:root {
  /* Primary */
  --color-primary: 199 89% 48%;        /* #0EA5E9 sky-500 */
  --color-primary-hover: 199 89% 42%;  /* sky-600 */
  --color-primary-light: 199 95% 74%;  /* sky-300 */

  /* Secondary */
  --color-secondary: 215 16% 47%;      /* #64748B slate-500 */
  --color-secondary-light: 215 20% 65%;/* slate-400 */

  /* Accent */
  --color-accent: 142 71% 45%;         /* #22C55E green-500 */
  --color-accent-light: 142 69% 58%;   /* green-400 */

  /* Background */
  --color-bg: 210 40% 98%;             /* #F8FAFC slate-50 */
  --color-surface: 0 0% 100%;          /* #FFFFFF white */

  /* Text */
  --color-text-primary: 222 47% 11%;   /* #1E293B slate-800 */
  --color-text-secondary: 215 16% 47%; /* #64748B slate-500 */
  --color-text-muted: 215 20% 65%;     /* slate-400 */

  /* Warning (赤色の代替) */
  --color-warning: 38 92% 50%;         /* #F59E0B amber-500 */

  /* 赤色: 使用禁止（PMDA準拠） */

  /* Spacing (8px base) */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */

  /* Border Radius */
  --radius-sm: 0.5rem;    /* 8px */
  --radius-md: 0.75rem;   /* 12px */
  --radius-lg: 1rem;      /* 16px */
  --radius-full: 9999px;

  /* Typography */
  --font-sans: 'Inter', 'Noto Sans JP', ui-sans-serif, system-ui, sans-serif;
  --font-size-min: 1.0625rem;  /* 17px — 最小フォントサイズ */
  --font-size-score: 4.5rem;   /* 72px — スコア数値 */
}
```

### Tailwind 拡張設定

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary))',
        'primary-hover': 'hsl(var(--color-primary-hover))',
        accent: 'hsl(var(--color-accent))',
        warning: 'hsl(var(--color-warning))',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'score': ['4.5rem', { lineHeight: '1' }],
      },
      borderRadius: {
        'card': '0.75rem',
      },
      minHeight: {
        'touch': '3rem', // 48px minimum touch target
      },
    },
  },
}
```

## ルール

### PMDA準拠（絶対遵守）
- 赤色 (#EF4444, red-*) を一切使用しない
- 下矢印アイコンを使用しない
- スコア下降は slate-500 テキストで「−N」と表示（赤色・下矢印禁止）
- AI出力は「〜傾向があります」「〜かもしれません」表現のみ
- 「診断」「リスク」「危険」「異常」「疾病」等の用語禁止
- 受診案内は「気になる場合は専門家にご相談ください」のみ

### フォントサイズ
- 本文: 17px (text-lg) 以上
- 補助テキスト: 15px (text-base) 以上
- スコア数値: 64-72px
- ボタンラベル: 17px semibold

### タッチターゲット
- 全ボタン: 48x48px 以上
- 全リンク: 44x44pt パディング込み

### コントラスト
- WCAG AA 4.5:1 以上（テキスト）
- WCAG AA 3:1 以上（大テキスト・UI要素）
