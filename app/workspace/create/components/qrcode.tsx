import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AnalyticsComponent from "@/components/analyticscomponent";
import QRCodeCard from "@/app/lib/qrgenerator";
import { DEPLOYMENT_URL } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export default function QrCode({
  analyticsEnabled,
  setAnalyticsEnabled,
  submitting,
  slug,
}: {
  analyticsEnabled: boolean;
  setAnalyticsEnabled: Dispatch<SetStateAction<boolean>>;
  submitting: boolean;
  slug: string;
}) {
  return (
    <div className="pl-2 lg:flex w-full flex-col gap-2 ">
      <div className="lg:flex items-center space-x-2 hidden ">
        <Switch
          id="Analytics"
          checked={analyticsEnabled}
          onCheckedChange={(value) => setAnalyticsEnabled(value)}
          className={cn("cursor-pointer")}
          disabled={submitting}
        />
        <Label htmlFor="Analytics">Analytics</Label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2 lg:block hidden">
          <AnalyticsComponent analyticsEnabled={analyticsEnabled} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="border border-border/80 bg-card/60 backdrop-blur-md shadow-sm rounded-xl p-5 flex flex-col gap-4 h-full">
            <div>
              <h3 className=" flex items-center gap-1.5">QR Code Preview</h3>
            </div>
            <div className="flex-1 flex items-center justify-center py-4 bg-muted/10 rounded-lg border border-border/20">
              <QRCodeCard value={DEPLOYMENT_URL + "/" + (slug || "preview")} />
            </div>
            <div className="text-[10px] text-muted-foreground/80 break-all text-center font-mono">
              {DEPLOYMENT_URL}/{slug || "your-slug"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
