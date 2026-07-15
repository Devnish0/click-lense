"use client";

import { DEPLOYMENT_URL } from "@/lib/constant";
import { cn } from "@/lib/utils";
import QRCodeCard from "@/app/lib/qrgenerator";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import formatRelativeDate from "@/app/lib/dateFormatter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Clock,
  ClosedCaption,
  Copy,
  Cross,
  Download,
  ExternalLink,
  Lock,
  Pen,
  QrCode,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface InputLinkData {
  shortcode: string;
  originalURL: string;
  Password: boolean;
  createdAt: Date | string | number | null | undefined;
}

const LINK_ICON_SVGS = [
  "/circle-4-X-shape-cones.svg",
  "/circle-4-star-X-shape-bloat.svg",
  "/circle-8-in-octogon-layout.svg",
  "/circle-8-star-bloat.svg",
  "/circle-half-4-square-layout.svg",
  "/circle-intersection-in-plus-shape-layout.svg",
  "/circle-quarter-leaf-shape-stack.svg",
  "/cross-8-bulb-shape.svg",
  "/cross-8-petal.svg",
  "/cross-8-pizza-shape.svg",
  "/cross-round-cone.svg",
  "/cross-triangle-equilateral.svg",
  "/diamond-large-round.svg",
  "/flower-circle-8-in-octogon-layout.svg",
  "/flower-star-rectangle-16.svg",
  "/flower.svg",
  "/oval-3-overlap.svg",
  "/rectangle-third-round-plus-shape.svg",
  "/star-rectangle-8-bloat-round.svg",
] as const;

function pickSvgByShortcode(shortcode: string): string {
  const normalized = shortcode.trim().toLowerCase();

  if (!normalized) {
    return LINK_ICON_SVGS[0];
  }

  const firstLetter = normalized.match(/[a-z0-9]/)?.[0];

  if (!firstLetter) {
    return LINK_ICON_SVGS[0];
  }

  const bucket = firstLetter.charCodeAt(0);

  return LINK_ICON_SVGS[bucket % LINK_ICON_SVGS.length];
}

export default function LinkComponent({
  Password,
  createdAt,
  originalURL,
  shortcode,
}: InputLinkData) {
  const router = useRouter();
  const cleanCode = shortcode.trim();
  const shortPath = `/${encodeURIComponent(cleanCode)}`;
  const shortUrl = `${DEPLOYMENT_URL.replace(/\/$/, "")}/${encodeURIComponent(cleanCode)}`;
  const iconPath = pickSvgByShortcode(cleanCode);
  const qrCardRef = useRef<HTMLDivElement | null>(null);
  const qrTriggerRef = useRef<HTMLSpanElement | null>(null);
  const [isQrHovered, setIsQrHovered] = useState(false);
  const [isQrPinned, setIsQrPinned] = useState(false);
  const isQrOpen = isQrHovered || isQrPinned;

  const [copiedOriginal, setCopiedOriginal] = useState(false);

  const handleCopyOriginalUrl = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(originalURL);
    setCopiedOriginal(true);
    setTimeout(() => setCopiedOriginal(false), 2000);
  };

  const handleCopyShortUrl = async () => {
    await navigator.clipboard.writeText(shortUrl);
  };

  const handleDownloadQr = () => {
    const svg = qrCardRef.current?.querySelector("svg");

    if (!svg) {
      return;
    }

    const serializer = new XMLSerializer();
    const svgText = serializer.serializeToString(svg);
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${cleanCode || "shortcode"}-qr.svg`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const closeQr = () => {
    setIsQrHovered(false);
    setIsQrPinned(false);
  };

  const handlePopupClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!isQrOpen) {
        return;
      }

      const target = event.target as Node | null;

      if (
        qrTriggerRef.current?.contains(target) ||
        qrCardRef.current?.contains(target)
      ) {
        return;
      }

      closeQr();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeQr();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQrOpen]);

  return (
    <>
      <div
        className="flex flex-col p-3 border-b cursor-pointer"
        onClick={() => {
          router.push(`/workspace/analytics/${shortcode}`);
        }}
      >
        <div className="flex items-center justify-between w-full min-w-0">
          <div className="flex gap-2 items-center min-w-0">
            <span>
              <span
                className="block size-11 bg-primary"
                style={{
                  maskImage: `url('${iconPath}')`,
                  WebkitMaskImage: `url('${iconPath}')`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
            </span>
            <div className="flex flex-col min-w-0">
              <div className="text-[16px] text-secondary">{shortcode}</div>
              <TooltipProvider delay={200}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <div
                        role="button"
                        onClick={handleCopyOriginalUrl}
                        className="text-xs font-light text-secondary/70 truncate max-w-[150px] sm:max-w-[250px] md:max-w-sm lg:max-w-md cursor-pointer hover:text-primary transition-colors select-all"
                      />
                    }
                  >
                    {originalURL}
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md break-all flex flex-col items-center p-2.5">
                    {copiedOriginal ? (
                      <span className="font-semibold text-emerald-400">
                        Copied!
                      </span>
                    ) : (
                      <div className="flex flex-col gap-1 text-center">
                        <span className="font-medium opacity-90">
                          {originalURL}
                        </span>
                        <span className="text-[10px] opacity-60">
                          Click to copy
                        </span>
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={shortPath}
              onClick={(e) => e.stopPropagation()}
              className="hidden lg:inline-flex w-fit items-center gap-1 border rounded-3xl border-border px-2 py-1"
            >
              <ExternalLink size={14} />
              <span className="text-xs lg:text-[12px]">{shortUrl}</span>
            </Link>
            <span className="hidden lg:inline-flex px-2 py-1 text-xs text-secondary/70 mr-10 lg:text-[11px]">
              {formatRelativeDate(createdAt)}
            </span>
            <span className="flex items-center gap-3">
              <span
                ref={qrTriggerRef}
                className="relative"
                // onMouseEnter={() => setIsQrHovered(true)}
                onMouseLeave={() => setIsQrHovered(false)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsQrPinned((current) => !current);
                  }}
                  aria-expanded={isQrOpen}
                  aria-label="Show QR code"
                  className={cn(
                    "cursor-pointer rounded-full p-1 text-secondary/50 transition duration-120 ease-in-out hover:text-primary",
                    isQrOpen && "text-secondary",
                  )}
                >
                  <QrCode size={15} />
                </button>

                {isQrOpen && (
                  <div className="fixed inset-0 z-30 md:absolute md:inset-auto md:right-0 md:top-full md:mt-3 ">
                    <button
                      type="button"
                      aria-label="Close QR panel"
                      onClick={closeQr}
                      className="absolute inset-0 bg-black/35 md:hidden"
                    />
                    <div
                      className="absolute right-0  top-full z-40 mt-3 w-72 rounded-2xl border border-border/70 bg-background p-4 shadow-xl max-md:fixed max-md:inset-x-3 max-md:bottom-3 max-md:top-auto max-md:w-auto"
                      onClick={handlePopupClick}
                    >
                      <div className="flex items-center justify-center gap-3 ">
                        <div className="flex flex-col items-center gap-3">
                          <div ref={qrCardRef}>
                            <QRCodeCard value={shortUrl} />
                          </div>
                          <div className="w-full space-y-2 text-center">
                            <div className="text-xs font-medium text-secondary">
                              Redirects to
                            </div>
                            <div className="break-all text-xs text-secondary/70">
                              {shortUrl}
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                              <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[11px] text-secondary/70">
                                /{cleanCode}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={handleDownloadQr}
                                  className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[21px] text-secondary/70 transition duration-150 hover:cursor-pointer hover:border-primary hover:text-primary"
                                  aria-label="Download QR code"
                                >
                                  <Download size={15} />
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCopyShortUrl}
                                  className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[21px] text-secondary/70 transition duration-150 hover:cursor-pointer hover:border-primary hover:text-primary"
                                  aria-label="Copy short URL"
                                >
                                  <Copy size={15} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={closeQr}
                          className="absolute cursor-pointer right-2 top-2 lg:right-0 lg:top-1 lg:pt-1 lg:border-primary  rounded-full  px-2 py-1 text-xs text-secondary/70 transition hover:border-primary hover:text-primary"
                          aria-label="Close QR panel"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </span>
              <Lock
                size={15}
                className={Password ? "text-primary" : "text-secondary/50"}
              />
              <Clock
                size={15}
                className={Password ? "text-primary" : "text-secondary/50"}
              />
              <Link
                href="/"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center pl-3 pr-3 pt-2 pb-2 rounded-lg border border-border/70 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer"
              >
                <Pen size={19} />
              </Link>
            </span>
          </div>
        </div>
        <span className="lg:hidden inline-flex w-fit mt-3 flex-col">
          <Link
            href={shortPath}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex w-fit items-center gap-1 border rounded-3xl border-border px-2 py-1"
          >
            <ExternalLink size={14} />
            <span className="text-xs">{shortUrl}</span>
          </Link>
          <span className="px-2 py-1 text-xs text-secondary/70">
            {formatRelativeDate(createdAt)}
          </span>
        </span>
      </div>
    </>
  );
}
