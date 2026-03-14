// Cognitive check test types

export type TestType = "reaction" | "memory" | "attention";

export interface TestConfig {
  type: TestType;
  label: string;
  description: string;
  trialCount: number;
}

export const TEST_CONFIGS: TestConfig[] = [
  {
    type: "reaction",
    label: "反応速度",
    description: "表示されたらすぐタップ",
    trialCount: 5,
  },
  {
    type: "memory",
    label: "短期記憶",
    description: "表示された数字を覚えて入力",
    trialCount: 5,
  },
  {
    type: "attention",
    label: "注意切替",
    description: "指示に合ったものをタップ",
    trialCount: 8,
  },
];

export interface ReactionTrial {
  delayMs: number;
  responseMs: number | null;
}

export interface MemoryTrial {
  digits: number[];
  userInput: number[];
  correct: boolean;
}

export interface AttentionTrial {
  targetType: "color" | "shape";
  options: AttentionOption[];
  correctIndex: number;
  userChoice: number | null;
  correct: boolean;
}

export interface AttentionOption {
  label: string;
  isTarget: boolean;
}

export interface CheckState {
  currentTest: number;
  testType: TestType;
  trialIndex: number;
  results: {
    reaction: ReactionTrial[];
    memory: MemoryTrial[];
    attention: AttentionTrial[];
  };
  startedAt: number;
}

export interface ScoreResult {
  total: number;
  reaction: number;
  memory: number;
  attention: number;
  reactionTimes: number[];
  memoryCorrect: number;
  memoryTotal: number;
  attentionCorrect: number;
  attentionTotal: number;
  durationMs: number;
}
