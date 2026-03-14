// Score calculation for cognitive checks
// Each sub-score: 0-100, Total: weighted average

import type { ScoreResult, ReactionTrial, MemoryTrial, AttentionTrial } from "@/types/check";

const WEIGHTS = { reaction: 0.3, memory: 0.35, attention: 0.35 };

// Reaction: faster = higher score. Baseline 200-800ms
function scoreReaction(trials: ReactionTrial[]): { score: number; times: number[] } {
  const validTimes = trials
    .map((t) => t.responseMs)
    .filter((ms): ms is number => ms !== null && ms > 0);

  if (validTimes.length === 0) return { score: 0, times: [] };

  const avgMs = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;
  // 200ms = 100, 800ms = 0, linear interpolation
  const score = Math.max(0, Math.min(100, Math.round(((800 - avgMs) / 600) * 100)));
  return { score, times: validTimes };
}

// Memory: correct ratio * 100
function scoreMemory(trials: MemoryTrial[]): { score: number; correct: number; total: number } {
  const correct = trials.filter((t) => t.correct).length;
  const total = trials.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { score, correct, total };
}

// Attention: correct ratio * 100
function scoreAttention(trials: AttentionTrial[]): { score: number; correct: number; total: number } {
  const correct = trials.filter((t) => t.correct).length;
  const total = trials.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { score, correct, total };
}

export function calculateScore(
  reactionTrials: ReactionTrial[],
  memoryTrials: MemoryTrial[],
  attentionTrials: AttentionTrial[],
  startedAt: number
): ScoreResult {
  const reaction = scoreReaction(reactionTrials);
  const memory = scoreMemory(memoryTrials);
  const attention = scoreAttention(attentionTrials);

  const total = Math.round(
    reaction.score * WEIGHTS.reaction +
    memory.score * WEIGHTS.memory +
    attention.score * WEIGHTS.attention
  );

  return {
    total,
    reaction: reaction.score,
    memory: memory.score,
    attention: attention.score,
    reactionTimes: reaction.times,
    memoryCorrect: memory.correct,
    memoryTotal: memory.total,
    attentionCorrect: attention.correct,
    attentionTotal: attention.total,
    durationMs: Date.now() - startedAt,
  };
}

// Compare with previous day's score
export function getScoreComparison(
  current: number,
  previous: number | null
): { diff: number; direction: "up" | "same" | "down" } {
  if (previous === null) return { diff: 0, direction: "same" };
  const diff = current - previous;
  if (diff > 0) return { diff, direction: "up" };
  if (diff < 0) return { diff, direction: "down" };
  return { diff: 0, direction: "same" };
}
