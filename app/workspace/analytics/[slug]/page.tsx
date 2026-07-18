"use client";

import { DEPLOYMENT_URL } from "@/lib/constant";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  MetricCard,
  MetricCardSkeleton,
} from "@/components/dashboard/metric-card";
import {
  TopStatsCard,
  TopStatsCardSkeleton,
} from "@/components/dashboard/top-stats-card";
import type {
  ClickDataPoint,
  MetricData,
  TopStatItem,
} from "@/components/dashboard/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import formatRelativeDate from "@/app/lib/dateFormatter";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowLeft,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Link as LinkIcon,
  Lock,
  MousePointerClick,
} from "lucide-react";

// ── Types for API response ───────────────────────────────────────────────────

export interface LinkAnalytics {
  link: {
    id: string;
    shortCode: string;
    originalUrl: string;
    totalClicks: number;
    createdAt: string;
    expiresAt: string | null;
    isProtected: boolean;
    maxClicks: number | null;
  };
  totalEvents: number;
  uniqueVisitors: number;
  clicksByDate: ClickDataPoint[];
  clicksByHour: ClickDataPoint[];
  topBrowsers: TopStatItem[];
  topOS: TopStatItem[];
  topDevices: TopStatItem[];
  topCountries: TopStatItem[];
  topReferrers: TopStatItem[];
  recentClicks: Array<{
    id: string;
    browser: string | null;
    os: string | null;
    device: string | null;
    country: string | null;
    referrer: string | null;
    createdAt: string;
  }>;
}

type TimeRange = "24h" | "7d" | "30d" | "all";

// ── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/50 bg-card px-3 py-2 shadow-lg">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">
        {payload[0].value.toLocaleString()} clicks
      </p>
    </div>
  );
}

// ── Recent Click Row ─────────────────────────────────────────────────────────

function RecentClickRow({
  click,
  index,
}: {
  click: LinkAnalytics["recentClicks"][number];
  index: number;
}) {
  return (
    <div className="grid grid-cols-[60px_180px_140px_140px_120px_120px_1fr] lg:grid-cols-[60px_1.8fr_1.2fr_1.2fr_1fr_1fr_2fr] items-center px-4 py-3 text-xs text-foreground border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
      <div className="font-mono text-muted-foreground">#{index + 1}</div>
      <div className="text-muted-foreground whitespace-nowrap">
        {formatRelativeDate(click.createdAt)}
      </div>
      <div className="font-medium truncate">{click.browser || "Unknown"}</div>
      <div className="truncate">{click.os || "Unknown"}</div>
      <div className="truncate">{click.device || "Unknown"}</div>
      <div className="truncate">{click.country || "Unknown"}</div>
      <div className="truncate text-muted-foreground">
        {click.referrer || "Direct"}
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LinkAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [data, setData] = useState<LinkAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [range, setRange] = useState<TimeRange>("all");

  useEffect(() => {
    if (!slug) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `/api/url/analytics?slug=${encodeURIComponent(slug)}`,
        );
        if (res.data?.success) {
          setData(res.data.data);
        } else {
          setError(res.data?.message || "Failed to load analytics");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const shortUrl = `${DEPLOYMENT_URL.replace(/\/$/, "")}/${slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Filter chart data by time range ──────────────────────────────────────

  function getChartData(): ClickDataPoint[] {
    if (!data) return [];
    if (range === "24h") return data.clicksByHour;

    const allData = data.clicksByDate;
    if (range === "all") return allData;

    const now = new Date();
    const cutoff = new Date();
    if (range === "7d") cutoff.setDate(now.getDate() - 7);
    else if (range === "30d") cutoff.setDate(now.getDate() - 30);

    return allData.filter((d) => new Date(d.date) >= cutoff);
  }

  const chartData = getChartData();
  const chartTotal = chartData.reduce((s, d) => s + d.clicks, 0);

  // ── Build metrics from real data ──────────────────────────────────────────

  function buildMetrics(): MetricData[] {
    if (!data) return [];
    const sparkline = data.clicksByDate.slice(-12).map((d) => d.clicks);
    const hourlySparkline = data.clicksByHour.map((h) => h.clicks);
    return [
      {
        label: "Total Clicks",
        value: data.totalEvents,
        change: 0,
        sparkline: sparkline.length > 0 ? sparkline : [0],
        icon: "mouse-pointer-click",
      },
      {
        label: "Unique Visitors",
        value: data.uniqueVisitors,
        change: 0,
        sparkline: sparkline.length > 0 ? sparkline : [0],
        icon: "activity",
      },
      {
        label: "Clicks Today",
        value: data.clicksByHour.reduce((s, h) => s + h.clicks, 0),
        change: 0,
        sparkline: hourlySparkline.length > 0 ? hourlySparkline : [0, 0, 0],
        icon: "trending-up",
      },
    ];
  }

  // ── Error state ───────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md border-border/50 bg-card">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 mx-auto mb-4">
            <LinkIcon className="size-6 text-destructive" />
          </div>
          <h2 className="text-lg font-semibold">{error}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The link might not exist or you don't have access to its stats.
          </p>
          <Button
            variant="outline"
            className="mt-5 cursor-pointer rounded-xl"
            onClick={() => router.push("/workspace/dashboard")}
          >
            <ArrowLeft className="size-4 mr-1.5" />
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // ── Loading state ─────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="w-full px-4 py-6 lg:px-8 xl:px-12">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="size-9 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-3.5 w-72" />
          </div>
        </div>

        {/* Metrics skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </div>

        {/* Chart skeleton */}
        <Card className="border-border/50 p-5 mb-8 bg-card">
          <Skeleton className="h-4 w-28 mb-2" />
          <Skeleton className="h-7 w-20 mb-4" />
          <Skeleton className="h-[280px] w-full rounded-lg" />
        </Card>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <TopStatsCardSkeleton />
          <TopStatsCardSkeleton />
          <TopStatsCardSkeleton />
          <TopStatsCardSkeleton />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const ranges: { key: TimeRange; label: string }[] = [
    { key: "24h", label: "24H" },
    { key: "7d", label: "7D" },
    { key: "30d", label: "30D" },
    { key: "all", label: "All" },
  ];

  const metrics = buildMetrics();

  // ── Main render ───────────────────────────────────────────────────────────

  return (
    <div className="w-full min-h-[calc(100vh-4rem)]">
      <div className="w-full px-4 py-6 lg:px-8 xl:px-12">
        {/* ── Link Header ──────────────────────────────────────────────── */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/workspace/dashboard")}
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            Back to Dashboard
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <LinkIcon className="size-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    /{data.link.shortCode}
                  </h1>
                  {data.link.isProtected && (
                    <Badge
                      variant="secondary"
                      className="text-secondary-foreground bg-green-300"
                    >
                      <Lock className="size-3 mr-1 text-[#0A192F]" />
                      <span className="text-[#0A192F]">Protected</span>
                    </Badge>
                  )}
                  {data.link.expiresAt && (
                    <Badge variant="outline">
                      <Clock className="size-3 mr-1" />
                      Expires {formatRelativeDate(data.link.expiresAt)}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground truncate max-w-lg">
                  {data.link.originalUrl}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Created {formatRelativeDate(data.link.createdAt)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5 rounded-xl"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copied ? "Copied" : "Copy Link"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5 rounded-xl"
                onClick={() => window.open(shortUrl, "_blank")}
              >
                <ExternalLink className="size-3.5" />
                Visit
              </Button>
            </div>
          </div>
        </div>

        {/* ── KPI Metrics ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        {/* ── Clicks Chart ─────────────────────────────────────────────── */}
        <Card className="border-border/50 p-0 overflow-hidden mb-8 bg-card shadow-sm">
          <div className="flex flex-col gap-4 p-5 pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Clicks over time
              </h3>
              <p className="mt-0.5 text-2xl font-semibold tracking-tight">
                {chartTotal.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-0.5 rounded-lg bg-muted/50 p-0.5">
              {ranges.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setRange(key)}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150",
                    range === key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 h-[280px] w-full px-2 pb-4">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="linkClickGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--chart-1)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    opacity={0.4}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickFormatter={(val: string) => {
                      if (range === "24h") return val;
                      const d = new Date(val);
                      if (range === "7d")
                        return d.toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                      return d.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    interval={
                      range === "24h"
                        ? 3
                        : range === "7d"
                          ? 0
                          : "preserveStartEnd"
                    }
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    allowDecimals={false}
                  />
                  <RechartsTooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "var(--muted-foreground)",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    fill="url(#linkClickGradient)"
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <Activity className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No click data for this period
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* ── Top Stats Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 ml-2">
              Countries
            </h3>
            <TopStatsCard
              title="Countries"
              items={
                data.topCountries.length > 0
                  ? data.topCountries
                  : [{ name: "No data yet", value: 0, percentage: 0 }]
              }
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 ml-2">
              Devices
            </h3>
            <TopStatsCard
              title="Devices"
              items={
                data.topDevices.length > 0
                  ? data.topDevices
                  : [{ name: "No data yet", value: 0, percentage: 0 }]
              }
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 ml-2">
              Browsers
            </h3>
            <TopStatsCard
              title="Browsers"
              items={
                data.topBrowsers.length > 0
                  ? data.topBrowsers
                  : [{ name: "No data yet", value: 0, percentage: 0 }]
              }
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 ml-2">
              Referrers
            </h3>
            <TopStatsCard
              title="Referrers"
              items={
                data.topReferrers.length > 0
                  ? data.topReferrers
                  : [{ name: "No data yet", value: 0, percentage: 0 }]
              }
            />
          </div>
        </div>

        {/* ── Recent Clicks ────────────────────────────────────────────── */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-foreground mb-3 ml-1">
            Recent Clicks
          </h3>
          <div className="border border-border/60 rounded-xl bg-card shadow-sm overflow-hidden">
            {data.recentClicks.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <div className="min-w-[890px] lg:min-w-full lg:w-full">
                  {/* Table Header */}
                  <div className="grid grid-cols-[60px_180px_140px_140px_120px_120px_1fr] lg:grid-cols-[60px_1.8fr_1.2fr_1.2fr_1fr_1fr_2fr] items-center px-4 py-2.5 text-xs font-semibold text-muted-foreground bg-muted/50 border-b border-border/50">
                    <div>#</div>
                    <div>Date</div>
                    <div>Browser</div>
                    <div>OS</div>
                    <div>Device</div>
                    <div>Country</div>
                    <div>Referrer</div>
                  </div>

                  {/* Table Rows */}
                  {data.recentClicks.map((click, index) => (
                    <RecentClickRow
                      key={click.id}
                      click={click}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <MousePointerClick className="size-6 text-primary/60" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No clicks recorded yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground text-center">
                  Share your link to start seeing live analytics events.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
