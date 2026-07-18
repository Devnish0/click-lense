"use client";

import AnalyticsComponent from "@/components/analyticscomponent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Globe,
  KeyRound,
  Laptop,
  Layers,
  Link2,
  Lock,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import Hero from "./components/ui/hero";

export default function Page() {
  const [activeTab, setActiveTab] = useState<
    "analytics" | "clicks" | "security"
  >("analytics");

  // Sample recent clicks matching dashboard table UI
  const sampleClicks = [
    {
      id: 1,
      date: "Jul 18, 2026 • 17:42",
      browser: "Chrome 126",
      os: "macOS",
      device: "Desktop",
      country: "🇮🇳 India",
      referrer: "Google Search",
    },
    {
      id: 2,
      date: "Jul 18, 2026 • 16:15",
      browser: "Safari 17",
      os: "iOS 17",
      device: "Mobile",
      country: "🇺🇸 USA",
      referrer: "Twitter / X",
    },
    {
      id: 3,
      date: "Jul 18, 2026 • 14:05",
      browser: "Firefox 125",
      os: "Linux",
      device: "Desktop",
      country: "🇩🇪 Germany",
      referrer: "Direct Link",
    },
    {
      id: 4,
      date: "Jul 18, 2026 • 11:30",
      browser: "Chrome 126",
      os: "Android 14",
      device: "Mobile",
      country: "🇯🇵 Japan",
      referrer: "LinkedIn",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header />

      <main className="flex-1 space-y-24">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Interactive Dashboard Preview Section */}
        <section
          id="solutions"
          className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24"
        >
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
              <BarChart3 className="size-3.5" /> Dashboard Experience
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-sans">
              An analytics engine built for{" "}
              <span className="font-serif italic font-normal text-muted-foreground">
                speed & precision
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore the exact dashboard interface included with your
              account—real-time click tracking, visitor geography, device
              distribution, and instant logs.
            </p>

            {/* Interactive Showcase Tabs */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveTab("analytics")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
                  activeTab === "analytics"
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/50",
                )}
              >
                Analytics Preview
              </button>
              <button
                onClick={() => setActiveTab("clicks")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
                  activeTab === "clicks"
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/50",
                )}
              >
                Recent Clicks Log
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border",
                  activeTab === "security"
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/50",
                )}
              >
                Protection & Limits
              </button>
            </div>
          </div>

          {/* Interactive Window Card */}
          <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-4 sm:p-6 shadow-2xl overflow-hidden">
            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/50 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80 inline-block" />
                <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="size-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] opacity-70">
                  workspace/analytics/launch-campaign
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                <span className="size-1.5 rounded-full bg-primary animate-ping" />
                Live Data Stream
              </div>
            </div>

            {/* Tab 1: Analytics Component */}
            {activeTab === "analytics" && (
              <div className="animate-in fade-in duration-300">
                <AnalyticsComponent analyticsEnabled={true} />
              </div>
            )}

            {/* Tab 2: Recent Clicks Grid */}
            {activeTab === "clicks" && (
              <div className="animate-in fade-in duration-300 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Clock className="size-4 text-primary" /> Recent Clicks Log
                    (Live Sample)
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Showing 4 of 795 clicks
                  </span>
                </div>
                <div className="w-full overflow-x-auto rounded-2xl border border-border/60 bg-background/60">
                  <div className="min-w-[750px]">
                    <div className="grid grid-cols-7 gap-2 px-4 py-3 bg-muted/40 text-xs font-semibold text-muted-foreground border-b border-border/50">
                      <div>#</div>
                      <div>Date & Time</div>
                      <div>Browser</div>
                      <div>OS</div>
                      <div>Device</div>
                      <div>Country</div>
                      <div>Referrer</div>
                    </div>
                    {sampleClicks.map((click) => (
                      <div
                        key={click.id}
                        className="grid grid-cols-7 gap-2 px-4 py-3 text-xs text-foreground border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors items-center"
                      >
                        <span className="font-mono text-muted-foreground">
                          0{click.id}
                        </span>
                        <span className="font-medium">{click.date}</span>
                        <span className="flex items-center gap-1.5">
                          <Globe className="size-3 text-blue-500" />{" "}
                          {click.browser}
                        </span>
                        <span>{click.os}</span>
                        <span className="flex items-center gap-1.5">
                          <Laptop className="size-3 text-purple-500" />{" "}
                          {click.device}
                        </span>
                        <span>{click.country}</span>
                        <span className="text-muted-foreground">
                          {click.referrer}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Protection & Limits Preview */}
            {activeTab === "security" && (
              <div className="animate-in fade-in duration-300 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <div className="p-6 rounded-2xl border border-border/60 bg-card space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Lock className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">
                        Password Protection
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Require visitors to enter a password before redirecting.
                      </p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-muted/20 border border-border/40 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between text-foreground font-medium">
                      <span>Protection Status</span>
                      <span className="text-emerald-500 font-bold">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Password Hash</span>
                      <span className="font-mono">••••••••••••</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-border/60 bg-card space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-accent/20 text-accent-foreground flex items-center justify-center">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">
                        Expiration & Click Limits
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Auto-deactivate links when limits are reached.
                      </p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-muted/20 border border-border/40 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between text-foreground font-medium">
                      <span>Max Click Limit</span>
                      <span className="font-semibold text-primary">
                        1,000 Clicks
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Expiration Date</span>
                      <span className="font-medium text-foreground">
                        Aug 31, 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. Core Features Grid Section */}
        <section
          id="features"
          className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24"
        >
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
              <Layers className="size-3.5" /> Core Features
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-sans">
              Everything required to{" "}
              <span className="font-serif italic font-normal text-muted-foreground">
                shorten, secure & scale
              </span>
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground">
              A comprehensive toolkit for developers, creators, and teams
              seeking total authority over shared links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 border-border/70 bg-card/80 backdrop-blur-md rounded-2xl space-y-4 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <BarChart3 className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Real-Time Click Analytics
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Monitor click volume, hourly distribution trends, unique
                visitors, and referral channels with live visual charts.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 border-border/70 bg-card/80 backdrop-blur-md rounded-2xl space-y-4 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Link2 className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Custom Branded Slugs
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Replace generic random URLs with memorable branded aliases like{" "}
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-primary">
                  /launch-2026
                </code>
                .
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 border-border/70 bg-card/80 backdrop-blur-md rounded-2xl space-y-4 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <QrCode className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                High-Res QR Code Generator
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Instantly generate and download crisp PNG QR codes for print
                marketing, event passes, and offline sharing.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 border-border/70 bg-card/80 backdrop-blur-md rounded-2xl space-y-4 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Lock className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Password Protection
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Secure confidential documents, internal builds, and private
                links behind custom authentication passwords.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 border-border/70 bg-card/80 backdrop-blur-md rounded-2xl space-y-4 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Expiration & Click Limiters
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Set time-based expiration dates or hard click limits to
                automatically lock promo links after campaign completion.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 border-border/70 bg-card/80 backdrop-blur-md rounded-2xl space-y-4 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Zap className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Sub-10ms Edge Redirects
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Ultra-fast global redirection powered by edge caching and
                optimized database lookups ensures zero lag.
              </p>
            </Card>
          </div>
        </section>

        {/* 4. Security & Protection Section */}
        <section
          id="security"
          className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24"
        >
          <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
                <ShieldCheck className="size-3.5" /> Enterprise Grade Security
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Protect sensitive links with{" "}
                <span className="font-serif italic font-normal text-muted-foreground">
                  zero compromise
                </span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Give your links custom password locks and expiration rules. When
                password protection is enabled, visitors see a sleek challenge
                screen before access is granted.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Bcrypt-hashed password verification</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Instant expiration upon reaching max click count</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Granular analytics log preserving privacy</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all cursor-pointer shadow-md"
                >
                  Create Protected Link <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Lock Component Mockup */}
            <div className="w-full max-w-md mx-auto p-6 rounded-2xl border border-border/80 bg-background/80 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-xs font-mono text-muted-foreground">
                  https://url.app/locked-doc
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold uppercase">
                  Locked Link
                </span>
              </div>

              <div className="text-center space-y-2 py-2">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                  <KeyRound className="size-6" />
                </div>
                <h4 className="font-bold text-foreground text-base">
                  Password Required
                </h4>
                <p className="text-xs text-muted-foreground">
                  This URL is password protected by the owner.
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="password"
                  disabled
                  value="••••••••••••"
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground opacity-80"
                />
                <Button
                  disabled
                  className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
                >
                  Unlock Link & Redirect →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Call To Action Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-primary/10 via-card to-card p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="size-16 rounded-2xl bg-primary text-primary-foreground mx-auto flex items-center justify-center shadow-lg">
              <Sparkles className="size-8 " />
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground font-sans max-w-2xl mx-auto leading-tight">
              Ready to elevate your{" "}
              <span className="font-serif italic font-normal text-muted-foreground">
                link management?
              </span>
            </h2>
            <p className="max-w-lg mx-auto text-sm sm:text-base text-muted-foreground">
              Create your account in seconds and unlock custom branded links,
              real-time click tracking, and security controls.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all cursor-pointer shadow-md"
              >
                Get Started Free Now
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition-all cursor-pointer"
              >
                Sign In to Workspace
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
