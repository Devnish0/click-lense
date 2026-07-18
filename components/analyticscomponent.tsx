import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Compass,
  Laptop,
  Globe as LucideGlobe,
  Share2,
} from "lucide-react";
export default function AnalyticsComponent({
  analyticsEnabled,
}: {
  analyticsEnabled: boolean;
}) {
  return (
    <div>
      <Card
        className={cn(
          "w-full mb-2 overflow-hidden transition-all duration-300 border border-border/80 bg-card/60 backdrop-blur-md shadow-sm rounded-xl p-5",
          !analyticsEnabled &&
            "opacity-40 pointer-events-none select-none filter grayscale-30",
        )}
      >
        <div className="flex items-center justify-between mb-5">
          <div>Analytics & Insights Preview</div>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 animate-pulse">
            Preview
          </span>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 bg-muted/20 border border-border/30 rounded-lg">
            <span className="text-[10px] font-medium text-muted-foreground uppercase">
              Total Clicks
            </span>
            <h4 className="text-xl font-bold text-foreground mt-1">795</h4>
            <span className="text-[9px] text-green-500 font-medium">
              ↑ 12% today
            </span>
          </div>
          <div className="p-3 bg-muted/20 border border-border/30 rounded-lg">
            <span className="text-[10px] font-medium text-muted-foreground uppercase">
              Unique Visitors
            </span>
            <h4 className="text-xl font-bold text-foreground mt-1">483</h4>
            <span className="text-[9px] text-green-500 font-medium">
              92% conversion
            </span>
          </div>
          <div className="p-3 bg-muted/20 border border-border/30 rounded-lg">
            <span className="text-[10px] font-medium text-muted-foreground uppercase">
              Active Status
            </span>
            <h4 className="text-xl font-bold text-primary mt-1">Live</h4>
            <span className="text-[9px] text-muted-foreground">
              Tracking enabled
            </span>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Time Analytics */}
            <div className="p-3.5 bg-muted/10 border border-border/20 rounded-lg">
              <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2.5">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                Time Analytics
              </h4>
              <div className="h-16 flex items-end justify-between gap-1 px-1">
                {/* Mock bar chart columns */}
                {[30, 45, 25, 60, 40, 80, 55, 70, 40, 90, 65, 85].map(
                  (height, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center group"
                    >
                      <div
                        className="w-full bg-primary/20 group-hover:bg-primary rounded-t transition-all duration-200"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ),
                )}
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] text-muted-foreground">
                <span>00:00</span>
                <span className="font-medium text-foreground">
                  Weekly Clicks Trend
                </span>
                <span>24:00</span>
              </div>
            </div>

            {/* Device & OS breakdown */}
            <div className="p-3.5 bg-muted/10 border border-border/20 rounded-lg">
              <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2.5">
                <Laptop className="w-3.5 h-3.5 text-purple-500" />
                Device & OS Insights
              </h4>
              <div className="space-y-2">
                {/* Devices */}
                <div>
                  <div className="flex justify-between text-[11px] font-medium text-foreground mb-1">
                    <span>Desktop</span>
                    <span>61%</span>
                  </div>
                  <div className="w-full bg-muted/30 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full"
                      style={{ width: "61%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-medium text-foreground mb-1">
                    <span>Mobile</span>
                    <span>34%</span>
                  </div>
                  <div className="w-full bg-muted/30 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: "34%" }}
                    />
                  </div>
                </div>
              </div>

              {/* OS Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {[
                  "Windows",
                  "macOS",
                  "Linux",
                  "Android",
                  "iOS",
                  "ChromeOS",
                ].map((os) => (
                  <span
                    key={os}
                    className="text-[9px] bg-muted/40 text-muted-foreground px-1.5 py-0.5 rounded border border-border/20"
                  >
                    {os}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Geographic Analytics */}
            <div className="p-3.5 bg-muted/10 border border-border/20 rounded-lg">
              <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2.5">
                <LucideGlobe className="w-3.5 h-3.5 text-emerald-500" />
                Geographic Analytics
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>🇮🇳</span> India
                  </span>
                  <span className="font-semibold text-foreground">
                    483 clicks
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>🇺🇸</span> USA
                  </span>
                  <span className="font-semibold text-foreground">
                    201 clicks
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>🇩🇪</span> Germany
                  </span>
                  <span className="font-semibold text-foreground">
                    76 clicks
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>🇯🇵</span> Japan
                  </span>
                  <span className="font-semibold text-foreground">
                    35 clicks
                  </span>
                </div>
              </div>
            </div>

            {/* Referrers & Browsers */}
            <div className="p-3.5 bg-muted/10 border border-border/20 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                {/* Referrers */}
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-muted-foreground mb-2 flex items-center gap-1">
                    <Share2 className="w-3 h-3 text-cyan-500" /> Referrers
                  </h5>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-muted-foreground">
                      <span className="truncate">Google</span>
                      <span className="font-medium text-foreground">62%</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span className="truncate">Twitter</span>
                      <span className="font-medium text-foreground">24%</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span className="truncate">Direct</span>
                      <span className="font-medium text-foreground">14%</span>
                    </div>
                  </div>
                </div>

                {/* Browsers */}
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-muted-foreground mb-2 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-orange-500" /> Browsers
                  </h5>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-muted-foreground">
                      <span className="truncate">Chrome</span>
                      <span className="font-medium text-foreground">58%</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span className="truncate">Safari</span>
                      <span className="font-medium text-foreground">22%</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span className="truncate">Firefox</span>
                      <span className="font-medium text-foreground">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
