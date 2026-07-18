"use client";

import { Button } from "@/components/ui/button";
import { LinkIcon, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyUrls() {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-center my-12 py-12">
      <div className="w-full max-w-md border border-border/70 bg-card/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-xl space-y-4 transition-all">
        {/* Animated / Glow Icon Badge */}
        <div className="relative">
          <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
            <LinkIcon className="size-7 text-primary" />
          </div>
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground shadow-sm">
            <Sparkles className="size-3" />
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-foreground tracking-tight">
            No URLs created yet
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Paste a link in the search bar above or click below to generate your first short URL with real-time analytics.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            onClick={() => router.push("/workspace/create")}
            className="cursor-pointer gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-2.5 shadow-md hover:bg-primary/90 transition-all text-xs sm:text-sm"
          >
            <Plus className="size-4" /> Create your first URL
          </Button>
        </div>
      </div>
    </div>
  );
}
