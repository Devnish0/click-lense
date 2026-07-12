"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { useState, useEffect, useRef } from "react";
import { createUrlSchema } from "@/app/lib/validators/clientValidators.ts/url";
import { CircleAlertIcon, CircleCheckIcon, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Message {
  type: "error" | "success";
  message: string;
}
interface inputType {
  type: "text" | "url" | "password" | "preview" | "date";
}
interface InputInlineProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  MessageIncoming?: Message | null;
  type?: string;
  icon?: any;
  disabled?: boolean;
  runningFunction?: Function;
}
const formatDate = (val: string) => {
  if (!val) return "";
  const date = new Date(val);
  if (isNaN(date.getTime())) return val;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export function InputInline({
  placeholder,
  value,
  onChange,
  MessageIncoming,
  type = "text",
  icon,
  disabled,
  runningFunction,
}: InputInlineProps) {
  const isControlled = value !== undefined;
  const [localUrl, setLocalUrl] = useState("");
  const displayValue = isControlled ? value : localUrl;

  const [message, setMessage] = useState<Message | null>(
    MessageIncoming || null,
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayValue || "");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    setMessage(MessageIncoming || null);
  }, [MessageIncoming]);

  useEffect(() => {
    if (message?.type==="error") {
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
  }, [message]);

  const isVisible = !!message && (showTooltip || isHovered);
  return (
    <Field
      onBlur={runningFunction as React.FocusEventHandler<HTMLInputElement>}
      orientation="horizontal"
      className="transition-all duration-200"
      suppressHydrationWarning
    >
      <div className={`relative flex-1`}>
        {icon &&
          (typeof icon === "function" ? (
            (() => {
              const IconComponent = icon;
              return (
                <IconComponent className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              );
            })()
          ) : (
            <HugeiconsIcon
              icon={icon}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
          ))}
        <Input
          type={
            type === "datetime-local"
              ? (isFocused ? "datetime-local" : "text")
              : (type === "preview" ? "text" : type)
          }
          disabled={disabled || type === "preview"}
          placeholder={placeholder || "Enter your long URL here"}
          className={cn(
            icon ? "pl-9" : "pl-3",
            "text-sm lg:text-md",
            type === "datetime-local" && "[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none cursor-pointer"
          )}
          value={
            type === "datetime-local" && !isFocused
              ? formatDate(displayValue)
              : displayValue
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={(e) => {
            if (type === "datetime-local") {
              try {
                e.currentTarget.showPicker();
              } catch (err) {
                console.error("showPicker failed:", err);
              }
            }
          }}
          onChange={(e) => {
            const nextVal = e.target.value;
            if (!isControlled) {
              setLocalUrl(nextVal);
            }
            if (onChange) {
              onChange(nextVal);
            }
            if (message?.type == "error") setMessage(null);
          }}
        />
      </div>
      <div
        className="relative flex items-center justify-center w-5 h-5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {type === "preview" ? (
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none transition-colors duration-200"
            onClick={handleCopy}
            title="Copy URL"
          >
            {copied ? (
              <CircleCheckIcon size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        ) : message?.type == "error" ? (
          <>
            <CircleAlertIcon
              size={16}
              className="text-destructive cursor-help"
            />
            <div
              className={`absolute bottom-full right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto mb-2 z-50 transition-all duration-200 origin-bottom-right md:origin-bottom ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-y-1 scale-95 pointer-events-none"
              }`}
            >
              <div className="relative bg-destructive text-destructive-foreground text-xs px-2.5 py-1.5 rounded-lg shadow-md max-w-[250px] md:max-w-none whitespace-normal md:whitespace-nowrap">
                {message.message}
                <div className="absolute top-full right-1.5 md:left-1/2 md:-translate-x-1/2 md:right-auto -translate-y-1/2 w-2 h-2 rotate-45 bg-destructive" />
              </div>
            </div>
          </>
        ) : message?.type == "success" ? (
          <>
            <CircleCheckIcon size={16} className="text-green-500 cursor-help" />
            <div
              className={`absolute bottom-full right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto mb-2 z-50 transition-all duration-200 origin-bottom-right md:origin-bottom ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-y-1 scale-95 pointer-events-none"
              }`}
            >
              <div className="relative bg-green-700 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-md max-w-[250px] md:max-w-none whitespace-normal md:whitespace-nowrap">
                {message.message}
                <div className="absolute top-full right-1.5 md:left-1/2 md:-translate-x-1/2 md:right-auto -translate-y-1/2 w-2 h-2 rotate-45 bg-green-700" />
              </div>
            </div>
          </>
        ) : null}
      </div>
      {/* <Button className="cursor-pointer" >
        Shorten
      </Button> */}
    </Field>
  );
}
