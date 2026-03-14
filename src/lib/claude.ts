// Claude Messages API integration
// Uses Haiku for score comments & analysis, Sonnet for org analysis (Phase 2)

import type { ClaudeMessage } from "@/types/ai";
import type { AiCommentTier } from "@/types/database";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL_HAIKU = "claude-haiku-4-5-20251001";

// PMDA-compliant system prompt
const SYSTEM_PROMPT_SCORE = `あなたは認知コンディションAIアシスタントです。ユーザーの日々の認知チェック結果について、やさしく前向きなコメントを返してください。

【絶対ルール】
- 「診断」「リスク」「危険」「異常」「疾病」「認知症」という言葉を使わない
- 「〜傾向があります」「〜かもしれません」という表現のみ使う
- 断定しない。他者と比較しない。行動を提案する
- 肯定的なフィードバックを主体にする
- 受診案内は「気になる場合は専門家にご相談ください」のみ

【返答形式】
1行で簡潔に（50文字以内）。`;

const SYSTEM_PROMPT_ANALYSIS = `あなたは認知コンディションAIアナリストです。過去7日間のチェック結果データから傾向を分析し、行動提案を行います。

【絶対ルール】
- 「診断」「リスク」「危険」「異常」「疾病」「認知症」という言葉を使わない
- 仮説は「〜傾向があります」「〜かもしれません」表現のみ
- 断定しない。他者と比較しない
- 提案は具体的な行動（睡眠・運動・休息）に限定

【返答形式】JSON
{
  "summary": "全体傾向の要約（100文字以内）",
  "hypotheses": [{"text": "〜傾向があります", "confidence": "low|medium"}],
  "suggestions": [{"title": "提案タイトル", "description": "具体的な行動", "category": "sleep|exercise|rest|activity|general"}]
}`;

const SYSTEM_PROMPT_TALK = `あなたは認知コンディションAIの対話アシスタントです。ユーザーと1-3往復の短い対話を行います。

【絶対ルール】
- 丁寧な友人のトーンで話す
- 「診断」「リスク」「危険」「異常」「疾病」「認知症」を使わない
- 「〜傾向があります」「〜かもしれません」表現のみ
- 受診案内は「気になる場合は専門家にご相談ください」のみ
- 3往復以内で自然に会話を終える`;

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
