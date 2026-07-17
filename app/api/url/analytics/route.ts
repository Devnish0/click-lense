import { handleApiResponse } from "@/app/lib/handleResponse";
import { handleApiError } from "@/app/lib/handleError";
import { HttpStatus } from "@/app/lib/httpStatus";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.session?.id) {
      return handleApiResponse(
        HttpStatus.UNAUTHORIZED,
        "Please login to view analytics",
      );
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return handleApiResponse(HttpStatus.BAD_REQUEST, "slug is required");
    }

    // Fetch the URL with all its click events, ensuring it belongs to this user
    const urlRecord = await prisma.url.findUnique({
      where: {
        shortCode: slug,
        userId: session.session.userId,
      },
      select: {
        id: true,
        shortCode: true,
        originalUrl: true,
        clicks: true,
        createdAt: true,
        expiresAt: true,
        password: true,
        maxClicks: true,
        clickEvents: {
          select: {
            id: true,
            browser: true,
            os: true,
            device: true,
            country: true,
            referrer: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!urlRecord) {
      return handleApiResponse(HttpStatus.NOT_FOUND, "Link not found");
    }

    // Aggregate click data on the server to reduce payload
    const clicks = urlRecord.clickEvents;

    // Clicks over time (group by date)
    const clicksByDate: Record<string, number> = {};
    clicks.forEach((click) => {
      const date = new Date(click.createdAt).toISOString().split("T")[0];
      clicksByDate[date] = (clicksByDate[date] || 0) + 1;
    });

    // Top browsers
    const browserCounts: Record<string, number> = {};
    clicks.forEach((c) => {
      const key = c.browser || "Unknown";
      browserCounts[key] = (browserCounts[key] || 0) + 1;
    });

    // Top OS
    const osCounts: Record<string, number> = {};
    clicks.forEach((c) => {
      const key = c.os || "Unknown";
      osCounts[key] = (osCounts[key] || 0) + 1;
    });

    // Top devices
    const deviceCounts: Record<string, number> = {};
    clicks.forEach((c) => {
      const key = c.device || "Desktop";
      deviceCounts[key] = (deviceCounts[key] || 0) + 1;
    });

    // Top countries
    const countryCounts: Record<string, number> = {};
    clicks.forEach((c) => {
      const key = c.country || "Unknown";
      countryCounts[key] = (countryCounts[key] || 0) + 1;
    });

    // Top referrers
    const referrerCounts: Record<string, number> = {};
    clicks.forEach((c) => {
      const key = c.referrer || "Direct";
      referrerCounts[key] = (referrerCounts[key] || 0) + 1;
    });

    // Helper to convert counts to sorted array with percentages
    function toTopStats(counts: Record<string, number>) {
      const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
      return Object.entries(counts)
        .map(([name, value]) => ({
          name,
          value,
          percentage: Math.round((value / total) * 1000) / 10,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
    }

    // Clicks by hour (for 24h view)
    const clicksByHour: Record<string, number> = {};
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    clicks
      .filter((c) => new Date(c.createdAt) >= oneDayAgo)
      .forEach((c) => {
        const hour = `${String(new Date(c.createdAt).getHours()).padStart(2, "0")}:00`;
        clicksByHour[hour] = (clicksByHour[hour] || 0) + 1;
      });

    // Unique visitors (by ipHash — not available in this query, so approximate by counting unique click events)
    const uniqueClicks = new Set(
      clicks.map((c) => `${c.browser}-${c.os}-${c.device}-${c.country}`),
    ).size;

    const analytics = {
      link: {
        id: urlRecord.id,
        shortCode: urlRecord.shortCode,
        originalUrl: urlRecord.originalUrl,
        totalClicks: urlRecord.clicks,
        createdAt: urlRecord.createdAt,
        expiresAt: urlRecord.expiresAt,
        isProtected: !!urlRecord.password,
        maxClicks: urlRecord.maxClicks,
      },
      totalEvents: clicks.length,
      uniqueVisitors: uniqueClicks,
      clicksByDate: Object.entries(clicksByDate)
        .map(([date, count]) => ({ date, clicks: count }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      clicksByHour: Array.from({ length: 24 }, (_, i) => {
        const hour = `${String(i).padStart(2, "0")}:00`;
        return { date: hour, clicks: clicksByHour[hour] || 0 };
      }),
      topBrowsers: toTopStats(browserCounts),
      topOS: toTopStats(osCounts),
      topDevices: toTopStats(deviceCounts),
      topCountries: toTopStats(countryCounts),
      topReferrers: toTopStats(referrerCounts),
      recentClicks: clicks.slice(0, 20).map((c) => ({
        id: c.id,
        browser: c.browser,
        os: c.os,
        device: c.device,
        country: c.country,
        referrer: c.referrer,
        createdAt: c.createdAt,
      })),
    };

    return handleApiResponse(HttpStatus.OK, "Analytics fetched", analytics);
  } catch (error) {
    console.error("Analytics error:", error);
    return handleApiError(error);
  }
}
