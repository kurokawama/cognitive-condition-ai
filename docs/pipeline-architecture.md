# パイプラインアーキテクチャ決定書（2026-03-14）

## 採用モデル: ガードレール + クラウド分離

```
👤 ユーザー ←→ 🧠 Claude Code（ローカル唯一。対話・判断・指揮）
                    ↕
               🔗 n8n Cloud（ガードレール + 全サービス管理）
                    ↓
         🤖 Claude API / 🎨 Stitch / 👁️ Figma / 💪 Cursor Cloud
         🔎 Perplexity / 🔍 Gemini / 🎭 Playwright(GitHub Actions)
```

## 決定理由
1. Claude Codeとの対話品質を維持（伝言ゲーム回避）
2. 重い作業をクラウドに逃がしコンテキスト枯渇防止
3. Gate検証をn8nが外部強制（Claudeの自己判断に依存しない）
4. コスト増は月+$30-40で許容範囲

## Phase計画
- Phase 0: n8n-api.sh コマンド追加 + Pipeline Executor骨格
- Phase 1: Stitch/Figma/Perplexity API接続 + Step 2テスト
- Phase 2: 全Step実行ロジック + 通しテスト

## 現在のプロジェクト状態
- Step 1: 完了（4名合議 + Perplexity + Gemini）
- Step 1.5: 完了（flow-diagram.json）
- Step 2: D2c中断（Figmaブリッジ未実行が判明 → 基盤構築優先に変更）
