// AI analysis types (Claude Messages API)
import type { AiCommentTier } from "./database";

export interface AiScoreComment {
  comment: string;
  tier: AiCommentTier;
}

export interface AiAnalysisResult {
  summary: string;
  hypotheses: AiHypothesis[];
  suggestions: AiSuggestion[];
  generatedAt: string;
}

export interface AiHypothesis {
  text: string;
  confidence: "low" | "medium";
}

export interface AiSuggestion {
  title: string;
  description: string;
  category: "sleep" | "exercise" | "rest" | "activity" | "general";
}

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClaudeRequest {
  model: string;
  max_tokens: number;
  system: string;
  messages: ClaudeMessage[];
}

export interface AiTalkState {
  conversationId: string | null;
  messages: ClaudeMessage[];
  turnCount: number;
  maxTurns: 3;
}
