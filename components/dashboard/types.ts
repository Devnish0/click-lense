export interface MetricData {
  label: string;
  value: number;
  change: number; // percentage change
  sparkline: number[];
  icon: string; // lucide icon name
}

export interface ClickDataPoint {
  date: string;
  clicks: number;
}

export interface TopStatItem {
  name: string;
  value: number;
  percentage: number;
}

export interface RecentLink {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  status: "active" | "expired" | "protected" | "scheduled";
  createdAt: string;
  expiresAt: string | null;
}

export interface ActivityItem {
  id: string;
  type: "link_created" | "qr_generated" | "password_changed" | "link_expired" | "link_clicked";
  description: string;
  timestamp: string;
  meta?: string;
}

export type TimeRange = "24h" | "7d" | "30d" | "90d" | "1y";
