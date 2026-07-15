"use client";

import { Card } from "@/components/ui/card";
import type { MetricData } from "./types";
import {
  Link,
  MousePointerClick,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  link: Link,
  "mouse-pointer-click": MousePointerClick,
  activity: Activity,
  "trending-up": TrendingUp,
};

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const padding = 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (w - padding * 2);
    const y = h - padding - ((val - min) / range) * (h - padding * 2);
    return `${x},${y}`;
  });

  const strokeColor = positive ? "var(--chart-1)" : "var(--destructive)";

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      className="shrink-0"
    >
      <polyline
        points={points.join(" ")}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.7}
      />
    </svg>
  );
}

function formatValue(value: number, label: string): string {
  if (label === "Avg CTR") return `${value}%`;
  if (value >= 10000) return `${(value / 1000).toFixed(1)}k`;
  return value.toLocaleString();
}

export function MetricCard({ metric }: { metric: MetricData }) {
  const Icon = iconMap[metric.icon] || Activity;
  const positive = metric.change >= 0;

  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md border-border/50">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="size-4 text-primary" />
            </div>
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {metric.label}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight">
              {formatValue(metric.value, metric.label)}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                positive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              {positive ? (
                <ArrowUpRight className="size-3" />
              ) : (
                <ArrowDownRight className="size-3" />
              )}
              {Math.abs(metric.change)}%
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">vs last period</span>
        </div>
        <MiniSparkline data={metric.sparkline} positive={positive} />
      </div>
    </Card>
  );
}

export function MetricCardSkeleton() {
  return (
    <Card className="p-5 border-border/50">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="size-8 animate-pulse rounded-lg bg-muted" />
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="h-8 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-12 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-7 w-20 animate-pulse rounded bg-muted" />
      </div>
    </Card>
  );
}
