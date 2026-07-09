import { NAME } from "@/lib/constant";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full border-t border-border/70 bg-card/80 text-foreground backdrop-blur-sm supports-backdrop-filter:bg-card/70">
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        <div className="flex lg:flex-row lg:justify-around lg:w-full flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-1">
            <h6 className="font-extrabold font-sans text-primary">{NAME}</h6>
            <span className="text-border/80">|</span>
            <p className="text-muted-foreground font-medium text-[12px]">
              © 2026 {NAME}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="group inline-flex size-8 items-center justify-center rounded-full border border-border/70 bg-background/70 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <img
                src="/twitter.svg"
                alt=""
                aria-hidden="true"
                className="size-4 opacity-70 transition-all group-hover:opacity-100 dark:invert dark:brightness-125"
              />
            </a>
            <a
              href="https://github.com"
              aria-label="GitHub"
              className="group inline-flex size-8 items-center justify-center rounded-full border border-border/70 bg-background/70 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <img
                src="/github.svg"
                alt=""
                aria-hidden="true"
                className="size-4 opacity-70 transition-all group-hover:opacity-100 dark:invert dark:brightness-125"
              />
            </a>
          </div>
        </div>
        <span className="flex items-center justify-center gap-1 text-muted-foreground font-medium text-[12px]">
          <p className="font-medium text-[12px]">Built with</p>
          <Heart className="size-4 fill-red-500 text-red-500" />
          <p className="font-medium text-[12px]">by</p>
          <a
            href="https://github.com/Devnish0"
            className="font-extrabold text-[12px] text-primary hover:text-primary/80 transition-colors"
          >
            Nishank
          </a>
        </span>
      </div>
    </footer>
  );
}
