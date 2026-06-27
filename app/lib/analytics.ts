import { UAParser } from "ua-parser-js";
import { sha256 } from "./hash";

export interface AnalyticsData {
  browser: string | undefined;
  os: string | undefined;
  device: string | undefined;
  country: string | undefined;
  referrer: string | undefined;
  ipHash: string | undefined;
}

/**
 * Extract analytics data from request headers.
 * - Parses User-Agent for browser, OS, and device type
 * - Gets country from Vercel / Cloudflare headers
 * - Gets referrer
 * - Hashes IP with SHA-256 (never stores raw IP)
 */
export function collectAnalytics(request: Request): AnalyticsData {
  const headers = request.headers;

  // User-Agent parsing
  const userAgent = headers.get("user-agent") || "";
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name;
  const os = parser.getOS().name;
  const deviceType = parser.getDevice().type || "Desktop"; // defaults to Desktop if not mobile/tablet

  // Country — Vercel, Cloudflare, or fallback
  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    undefined;

  // Referrer
  const referrer = headers.get("referer") || undefined;

  // IP — hash it, never store raw
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    undefined;
  const ipHash = ip ? sha256(ip) : undefined;

  return { browser, os, device: deviceType, country, referrer, ipHash };
}
