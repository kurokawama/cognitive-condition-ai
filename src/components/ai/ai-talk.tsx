"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { sendAiTalkMessage } from "@/app/actions/ai-analysis";
import type { ClaudeMessage } from "@/types/ai";

interface AiTalkProps {
  onClose: () => void;
}

export function AiTalk({ onClose }: AiTalkProps) {
  const [messages, setMessages] = useState<ClaudeMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [turnCount, setTurnCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxTurns = 3;
  const isMaxReached = turnCount >= maxTurns;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // AI starts the conversation with a greeting
  useEffect(() => {
    async function greet() {
      setIsLoading(true);
      const result = await sendAiTalkMessage(
        null,
        [],
        "（ユーザーがAIトークを開きました。最新スコアを踏まえて、気さくに話しかけてください。30文字以内の短い一言で。）"
      );
      if (result.success) {
        setMessages([{ role: "assistant", content: result.reply }]);
        setConversationId(result.conversationId);
      }
      setIsLoading(false);
      inputRef.current?.focus();
    }
    void greet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading || isMaxReached) return;

    setError(null);
    setInput("");
    setIsLoading(true);

    const userMsg: ClaudeMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);

    const result = await sendAiTalkMessage(
      conversationId,
      messages,
      trimmed
    );

    if (result.success) {
      const assistantMsg: ClaudeMessage = { role: "assistant", content: result.reply };
      setMessages((prev) => [...prev, assistantMsg]);
      setConversationId(result.conversationId);
      setTurnCount((prev) => prev + 1);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void handleSend();
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-lg font-semibold text-slate-800">AIトーク</h3>
        <div className="flex items-center gap-3">
          <span className="text-base text-slate-500">{turnCount}/{maxTurns}回</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" style={{ maxHeight: "360px", minHeight: "200px" }}>
        {messages.length === 0 && !isLoading && (
          <p className="py-8 text-center text-base text-slate-400">
            AIが準備しています...
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}`}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-lg ${
                msg.role === "user"
                  ? "bg-sky-500 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-lg text-slate-500">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mx-4 rounded-lg bg-amber-50 px-3 py-2 text-base text-amber-700">{error}</p>
      )}

      {/* Input or completion */}
      <div className="border-t border-slate-100 px-4 py-3">
        {isMaxReached ? (
          <div className="space-y-3 py-2 text-center">
            <p className="text-lg font-medium text-slate-700">
              もっとAIに相談しませんか？
            </p>
            <p className="text-base text-slate-500">
              プレミアムなら毎日何度でもAIトークが使えます
            </p>
            <Link
              href="/subscription"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600"
            >
              プレミアムを見る
            </Link>
          </div>
        ) : error === "AIトークはプレミアムプランの機能です" ? (
          <div className="space-y-3 py-2 text-center">
            <p className="text-lg font-medium text-slate-700">
              無料体験は終了しました
            </p>
            <p className="text-base text-slate-500">
              プレミアムで毎日AIに相談できます
            </p>
            <Link
              href="/subscription"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600"
            >
              月額580円で始める
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="メッセージを入力..."
              disabled={isLoading}
              className="min-h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg text-slate-800 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={isLoading || !input.trim()}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl bg-sky-500 text-white transition hover:bg-sky-600 disabled:opacity-50"
              aria-label="送信"
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
