import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
export default function Hero() {
  return (
    <main className="pt-5 flex flex-col justify-center items-center">
      <div className="mt-10 mb-6 flex max-w-full items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-1.5 font-sans text-xs font-bold text-foreground shadow-sm backdrop-blur supports-backdrop-filter:bg-card/70">
        <div className="flex -space-x-1.5">
          {["T"].map((item) => (
            <span
              key={item}
              className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shadow-sm ring-1 ring-border/60"
            >
              {item}
            </span>
          ))}
        </div>
        <span>Share smarter. Track everything</span>
      </div>
      <h1 className="text-3xl mt-10 md:text-5xl lg:text-6xl text-center max-w-4xl leading-tight tracking-tight text-foreground">
        <span className="font-bold text-primary">Manage every URL with</span>
        <br />
        <span className="font-serif italic font-normal text-muted-foreground">
          real-time insights & complete control
        </span>
      </h1>
      <p className="mt-9 text-center max-w-104 lg:max-w-2xl text-[13px] lg:text-lg text-muted-foreground">
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
            "py-6 px-8 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),0px_8px_24px_rgba(17,17,26,0.1),0px_16px_56px_rgba(17,17,26,0.1)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
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
            "py-6 px-8 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),0px_8px_24px_rgba(17,17,26,0.1),0px_16px_56px_rgba(17,17,26,0.1)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          }
        >
          View product demo <ChevronRight />{" "}
        </Button>
      </div>
    </main>
  );
}
