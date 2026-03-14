"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendLine } from "@/components/chart/trend-line";

export interface ScoreChartPoint {
  date: string;
  score: number;
  reaction?: number;
  memory?: number;
  attention?: number;
}

interface ScoreChartProps {
  data: ScoreChartPoint[];
  mode: "analysis" | "history";
  height?: number;
}

export function ScoreChart({ data, mode, height = 200 }: ScoreChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-500">
        データがありません
      </div>
    );
  }

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="date" tick={{ fill: "#64748B", fontSize: 15 }} />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#64748B", fontSize: 15 }}
            width={36}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              borderColor: "#CBD5E1",
              fontSize: "15px",
            }}
          />

          {mode === "history" && <Legend wrapperStyle={{ fontSize: "15px" }} />}

          {mode === "analysis" ? (
            <Line
              type="monotone"
              dataKey="score"
              name="総合スコア"
              stroke="#0EA5E9"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ) : (
            <>
              <TrendLine dataKey="score" name="総合スコア" stroke="#0EA5E9" />
              <TrendLine dataKey="reaction" name="反応" stroke="#22C55E" />
              <TrendLine dataKey="memory" name="記憶" stroke="#F59E0B" />
              <TrendLine dataKey="attention" name="注意" stroke="#64748B" />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
