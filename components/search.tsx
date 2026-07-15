"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { useState, useEffect, useRef } from "react";
import { createUrlSchemaClient } from "@/app/lib/validators/clientValidators.ts/url";
import { CircleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function normalizeUrl(input: string) {
  const value = input.trim();

  if (!/^https?:\/\//i.test(value)) {
    return `https://${value}`;
  }

  return value;
}

export function InputInline() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setShowTooltip(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    } else {
      setShowTooltip(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [error]);

  const isVisible = !!error && (showTooltip || isHovered);

  const handleSubmit = () => {
    // Handle form submission logic here
    try {
      const result = createUrlSchemaClient.safeParse({
        originalUrl: normalizeUrl(url),
      });
      if (result.success) {
        setError(null);
        console.log("Valid URL:", result.data.originalUrl);
        router.push(
          `/workspace/create?url=${encodeURIComponent(result.data.originalUrl)}`,
        );
      } else {
        const message =
          result.error.flatten().fieldErrors.originalUrl?.[0] ??
          result.error.issues[0]?.message;

        setError(message);
      }
    } catch (error) {
      console.error("error:", error);
    }
    // const params = new URLSearchParams({ url: url });

    // console.log(params.toString());
  };
  return (
    <Field orientation="horizontal" className="transition-all duration-200" suppressHydrationWarning>
      <div className="relative flex-1">
        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Enter your long URL here"
          className="pl-9"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError(null);
          }}
        />
      </div>
      <div
        className="relative flex items-center justify-center w-5 h-5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {error && (
          <>
            <CircleAlertIcon
              size={16}
              className="text-destructive cursor-help"
            />
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 transition-all duration-200 origin-bottom ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-y-1 scale-95 pointer-events-none"
              }`}
            >
              <div className="relative bg-destructive text-destructive-foreground text-xs px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap">
                {error}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-destructive" />
              </div>
            </div>
          </>
        )}
      </div>
      <Button className="cursor-pointer" onClick={handleSubmit}>
        Shorten
      </Button>
    </Field>
  );
}
