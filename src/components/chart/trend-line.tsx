"use client";

import { Line } from "recharts";

interface TrendLineProps {
  dataKey: string;
  name: string;
  stroke: string;
  strokeWidth?: number;
}

export function TrendLine({
  dataKey,
  name,
  stroke,
  strokeWidth = 2,
}: TrendLineProps) {
  return (
    <Line
      type="monotone"
      dataKey={dataKey}
      name={name}
      stroke={stroke}
      strokeWidth={strokeWidth}
      dot={{ r: 3 }}
      activeDot={{ r: 5 }}
    />
  );
}
