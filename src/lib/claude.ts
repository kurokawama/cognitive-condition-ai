// Claude Messages API integration
// Uses Haiku for score comments & analysis, Sonnet for org analysis (Phase 2)

import type { ClaudeMessage } from "@/types/ai";
import type { AiCommentTier } from "@/types/database";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL_HAIKU = "claude-haiku-4-5-20251001";

// Evidence-based knowledge for all prompts (PMDA-compliant framing)
const EVIDENCE_BASE = `【認知科学エビデンス（回答の裏付けとして活用。出典を直接引用しない）】

■ 認知機能の日内変動
- 注意力・反応速度は概日リズムに従い、午前中〜正午にかけて向上し、深部体温が最高となる夕方にピークを迎える傾向がある（反応時間の日内変動: 9〜34%）
- 記憶の符号化・想起は個人のクロノタイプ（朝型/夜型）に同期した時間帯で良好になる傾向がある

■ 睡眠と認知パフォーマンス
- 睡眠不足は反応時間を平均約84ms延長させるという研究報告がある
- 睡眠は認知機能の回復（特に注意メカニズムの維持）に重要な役割を果たす
- 十分な睡眠は単純反応時間を約15%改善する可能性が報告されている
- 中間的な睡眠時間（7-8時間）と高い睡眠の質が認知機能の向上と関連

■ 運動と認知機能
- 有酸素運動は全般的認知機能と実行機能に、レジスタンス運動は記憶に良い影響を与える傾向がある
- 急性運動（1回の運動）でも処理速度・注意力・抑制機能の改善が観察されている
- メカニズム: 脳血流増加、BDNF（脳由来神経栄養因子）発現増加、全身炎症の軽減
- 定期的な運動は認知機能低下のリスクを約38%低減する可能性がある

■ 水分・栄養と認知
- 軽度の脱水でも注意力・ワーキングメモリ・気分に影響する可能性がある
- 朝食摂取は食物繊維・微量栄養素の摂取量向上を通じて、日中の認知パフォーマンスと気分の安定を支える

■ 認知機能の3領域（本アプリの測定対象）
- 反応速度: 処理速度と覚醒度の指標。睡眠・概日リズムに最も敏感
- 記憶（ワーキングメモリ）: 情報の一時保持と操作。モバイル認知テストで最も評価頻度が高い領域
- 注意力: 持続的注意と選択的注意。恒常性維持と概日リズムの両方の影響を受ける`;

// PMDA-compliant system prompt
const SYSTEM_PROMPT_SCORE = `あなたは認知コンディションAIアシスタントです。ユーザーの日々の認知チェック結果について、やさしく前向きなコメントを返してください。

${EVIDENCE_BASE}

【絶対ルール】
- 「診断」「リスク」「危険」「異常」「疾病」「認知症」という言葉を使わない
- 「〜傾向があります」「〜かもしれません」という表現のみ使う
- 断定しない。他者と比較しない。行動を提案する
- 肯定的なフィードバックを主体にする
- 受診案内は「気になる場合は専門家にご相談ください」のみ
- エビデンスは自然な言い回しで活用する（論文番号や出典名は出さない）

【返答形式】
1行で簡潔に（50文字以内）。`;

const SYSTEM_PROMPT_ANALYSIS = `あなたは認知コンディションAIアナリストです。過去7日間のチェック結果データから傾向を分析し、行動提案を行います。

${EVIDENCE_BASE}

【絶対ルール】
- 「診断」「リスク」「危険」「異常」「疾病」「認知症」という言葉を使わない
- 仮説は「〜傾向があります」「〜かもしれません」表現のみ
- 断定しない。他者と比較しない
- 提案は具体的な行動（睡眠・運動・休息）に限定
- エビデンスに基づいた具体的な提案を行う（例: 「研究では軽い有酸素運動が注意力を改善する傾向が報告されています」）
- 論文番号や出典名は出さない。自然な言い回しでエビデンスを活用する

【返答形式】JSON
{
  "summary": "全体傾向の要約（100文字以内）",
  "hypotheses": [{"text": "〜傾向があります", "confidence": "low|medium"}],
  "suggestions": [{"title": "提案タイトル", "description": "具体的な行動（エビデンスに基づく）", "category": "sleep|exercise|rest|activity|nutrition|hydration|general"}]
}`;

const SYSTEM_PROMPT_TALK = `あなたは認知コンディションAIの対話アシスタントです。ユーザーと1-3往復の短い対話を行います。

${EVIDENCE_BASE}

【絶対ルール】
- 丁寧な友人のトーンで話す
- 「診断」「リスク」「危険」「異常」「疾病」「認知症」を使わない
- 「〜傾向があります」「〜かもしれません」表現のみ
- 受診案内は「気になる場合は専門家にご相談ください」のみ
- 3往復以内で自然に会話を終える
- エビデンスに基づいた豆知識や提案を自然に織り交ぜる（例: 「軽い運動の後は注意力が上がりやすい傾向があるそうですよ」）
- 論文番号や出典名は出さない`;

async function callClaude(
  system: string,
  messages: ClaudeMessage[],
  maxTokens: number = 300
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL_HAIKU,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// Generate short score comment (1 line, ~50 chars)
export async function generateScoreComment(
  scoreTotal: number,
  scoreReaction: number,
  scoreMemory: number,
  scoreAttention: number,
  previousScore: number | null
): Promise<{ comment: string; tier: AiCommentTier }> {
  const diff = previousScore !== null ? scoreTotal - previousScore : null;
  const prompt = `今日のスコア: ${scoreTotal}/100（反応${scoreReaction} 記憶${scoreMemory} 注意${scoreAttention}）${diff !== null ? `、前日比${diff >= 0 ? "+" : ""}${diff}` : "（初回）"}`;

  const comment = await callClaude(SYSTEM_PROMPT_SCORE, [
    { role: "user", content: prompt },
  ]);

  // Determine tier based on score and trend
  let tier: AiCommentTier = "neutral";
  if (scoreTotal >= 70 || (diff !== null && diff > 0)) tier = "positive";
  else if (scoreTotal < 50 || (diff !== null && diff < -10)) tier = "reflective";

  return { comment: comment.trim(), tier };
}

// Generate AI analysis (7-day trend)
export async function generateAnalysis(
  sessions: Array<{ score_total: number; created_at: string; score_reaction: number; score_memory: number; score_attention: number }>,
  notes: Array<{ sleep_quality: number; mood: number; busyness: number; created_at: string }>
) {
  const prompt = `過去7日間のデータ:
スコア推移: ${sessions.map((s) => `${s.created_at.slice(0, 10)}: ${s.score_total}(反応${s.score_reaction}/記憶${s.score_memory}/注意${s.score_attention})`).join(", ")}
${notes.length > 0 ? `生活記録: ${notes.map((n) => `${n.created_at.slice(0, 10)}: 睡眠${n.sleep_quality}/気分${n.mood}/忙しさ${n.busyness}`).join(", ")}` : "生活記録: なし"}`;

  const result = await callClaude(SYSTEM_PROMPT_ANALYSIS, [
    { role: "user", content: prompt },
  ], 500);

  return JSON.parse(result);
}

// AI Talk (1-3 turn conversation)
export async function chat(
  messages: ClaudeMessage[],
  userContext: string
): Promise<string> {
  const contextMessage: ClaudeMessage = {
    role: "user",
    content: `【コンテキスト】${userContext}\n\n${messages[messages.length - 1].content}`,
  };

  const allMessages = messages.length === 1
    ? [contextMessage]
    : [...messages.slice(0, -1), contextMessage];

  return callClaude(SYSTEM_PROMPT_TALK, allMessages, 300);
}
