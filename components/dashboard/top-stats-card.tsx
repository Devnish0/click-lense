"use client";

import { Card } from "@/components/ui/card";
import type { TopStatItem } from "./types";

function truncateMiddle(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;

  if (text.includes("/")) {
    const d = text.split("/");
    return d[2];
  }

  const charsToShow = maxLength - 1;
  const frontLen = Math.ceil(charsToShow / 2);
  const backLen = Math.floor(charsToShow / 2);

  return text.substr(0, frontLen) + "…" + text.substr(text.length - backLen);
}

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/70">
      <div
        className="h-full rounded-full bg-primary/70 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export function TopStatsCard({
  title,
  items,
}: {
  title: string;
  items: TopStatItem[];
}) {
  return (
    <Card className="border-border/50 p-3">
      {/* <h3 className="text-sm font-medium text-muted-foreground">{title}</h3> */}
      <div className="flex flex-col gap-3.5">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium w-full truncate">
                {truncateMiddle(item.name, 30)}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground ">
                  {item.value.toLocaleString()}
                </span>
                <span className="text-[11px] font-medium tabular-nums text-muted-foreground">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <ProgressBar percentage={item.percentage} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function TopStatsCardSkeleton() {
  return (
    <Card className="border-border/50 p-5">
      <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-4 flex flex-col gap-3.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-1.5 w-full animate-pulse rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </Card>
  );
}
