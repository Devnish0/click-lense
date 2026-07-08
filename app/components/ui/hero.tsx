import lightning from "@/public/lightning.svg";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight, MoveUp, MoveUpRight } from "lucide-react";
import Link from "next/link";
export default function Hero() {
  return (
    <main className="pt-5 flex flex-col justify-center items-center">
      <div className="mt-10 mb-6 flex max-w-full items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1.5 font-sans text-xs font-bold text-neutral-600 shadow-[0_2px_8px_rgba(0,0,0,0.015)] backdrop-blur">
        <div className="flex -space-x-1.5">
          {["T"].map((item) => (
            <span
              key={item}
              className="flex size-6 items-center justify-center rounded-full border border-white text-[10px] text-white font-black bg-neutral-950 shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="text-primary">Share smarter. Track everything</span>
      </div>
      <h1 className="text-3xl mt-10 md:text-5xl lg:text-6xl text-center max-w-4xl leading-tight tracking-tight">
        <span className="text-primary font-bold">Manage every URL with</span>
        <br />
        <span className="font-serif italic font-normal text-secondary/90">
          real-time insights & complete control
        </span>
      </h1>
      <p className="mt-9 text-center lg:max-w-2xl max-w-[26rem] text-[13px] lg:text-lg text-primary/70">
        Manage every URL from a single platform with custom aliases, QR code
        generation, detailed click analytics, geographic insights, device
        tracking, and secure authentication—everything you need to share
        smarter.
      </p>
      <div className="flex items-center mt-5 flex-col lg:flex-row gap-3 lg:gap-6 ">
        <Button
          variant="default"
          size="lg"
          className={
            "py-6 px-8 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          }
        >
          <Link href="/login" className="flex items-center gap-2">
            Get Started for Free <ArrowUpRight />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className={
            "py-6 px-8 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          }
        >
          View product demo <ChevronRight />{" "}
        </Button>
      </div>
    </main>
  );
}
