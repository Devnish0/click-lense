"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight, Link2, Lock, QrCode, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [urlInput, setUrlInput] = useState("");
  const router = useRouter();

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    const targetUrl = urlInput.startsWith("http") ? urlInput : `https://${urlInput}`;
    router.push(`/workspace/create?url=${encodeURIComponent(targetUrl)}`);
  };

  return (
    <section className="pt-6 pb-12 flex flex-col justify-center items-center px-4 max-w-7xl mx-auto">
      {/* Top Badge */}
      <div className="mt-8 mb-6 flex max-w-full items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 font-sans text-xs font-semibold text-foreground shadow-sm backdrop-blur supports-backdrop-filter:bg-card/70">
        <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shadow-sm">
          <Sparkles className="size-3 text-accent" />
        </span>
        <span className="text-secondary">Share smarter. Track everything in real-time</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center max-w-4xl leading-tight tracking-tight text-foreground font-sans">
        <span className="font-bold text-primary">Manage every URL with</span>
        <br />
        <span className="font-serif italic font-normal text-muted-foreground">
          real-time insights & complete control
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 text-center max-w-xl lg:max-w-2xl text-sm lg:text-lg text-muted-foreground leading-relaxed">
        Shorten long links, generate custom branded aliases, create high-res QR codes, and track detailed click metrics, visitor countries, devices, and traffic referrers from one sleek dashboard.
      </p>

      {/* Interactive Quick-Shorten Input */}
      <div className="w-full max-w-2xl mt-8">
        <form
          onSubmit={handleShorten}
          className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-card/90 backdrop-blur-md border border-border/80 rounded-2xl shadow-lg transition-all focus-within:border-primary/50"
        >
          <div className="flex items-center gap-2 px-3 w-full sm:w-auto grow">
            <Link2 className="size-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Paste your long link here... (e.g. https://mywebsite.com/article)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-transparent border-0 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none py-2"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto py-5 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold cursor-pointer shrink-0 gap-2 shadow-sm"
          >
            Shorten Link <ArrowUpRight className="size-4" />
          </Button>
        </form>
      </div>

      {/* Quick Feature Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/40 border border-border/40">
          <Lock className="size-3.5 text-primary" />
          <span>Password Lock</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/40 border border-border/40">
          <QrCode className="size-3.5 text-primary" />
          <span>QR Code Generator</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/40 border border-border/40">
          <Sparkles className="size-3.5 text-accent-foreground" />
          <span>Detailed Analytics</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center mt-8 flex-col sm:flex-row gap-3 lg:gap-4 w-full justify-center">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "py-6 px-8 rounded-xl font-semibold cursor-pointer shadow-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          )}
        >
          Get Started for Free <ArrowUpRight className="size-4 ml-1" />
        </Link>
        <a
          href="#solutions"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "py-6 px-8 rounded-xl font-semibold cursor-pointer border-2 border-border bg-card/80 hover:bg-muted text-foreground transition-all"
          )}
        >
          View Live Demo <ChevronRight className="size-4 ml-1" />
        </a>
      </div>
    </section>
  );
}
