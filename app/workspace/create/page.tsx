"use client";
import { InputInline } from "@/components/form/inputinline";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DEPLOYMENT_URL } from "@/lib/constant";
import { cn } from "@/lib/utils";
import {
  Date as DateIcon,
  Globe02FreeIcons,
  Link01Icon,
  LockIcon,
} from "@hugeicons/core-free-icons";
import { use, useEffect, useState } from "react";
import { handlePassword, handleSlug, handleUrl } from "./handlesubmit";
import { generateRandomSlug } from "./helperfun";
import { Message } from "./types";

import { authClient } from "@/app/lib/auth-client";
import {
  createUrlSchema,
  createUrlSchemaClient,
  validPassword,
  validSlug,
} from "@/app/lib/validators/clientValidators.ts/url";
import { normalizeUrl } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import QrCode from "./components/qrcode";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const resolvedSearchParams = use(searchParams);
  const url =
    typeof resolvedSearchParams.url === "string"
      ? resolvedSearchParams.url
      : "";
  const [inUrl, setInUrl] = useState(url);
  const [urlSuccess, setUrlSuccess] = useState<Message | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [slugSuccess, setSlugSuccess] = useState<Message | null>(null);
  const [slugLoading, setSlugLoading] = useState(false);
  const [passProtection, setPassProtection] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<Message | null>(null);
  const [password, setPassword] = useState<string>("");
  const [expirationEnabled, setExpirationEnabled] = useState(false);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [expirationSuccess, setExpirationSuccess] = useState<Message | null>(
    null,
  );
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [submitting, setSubmiting] = useState(false);

  useEffect(() => {
    setSlug(generateRandomSlug());
  }, []);

  const onSlugBlur = () => {
    setSlugLoading(true);
    handleSlug({ setSlugSuccess, slug }).finally(() => setSlugLoading(false));
  };

  const onPasswordBlur = () => {
    handlePassword({ setPasswordSuccess, password });
  };

  const onUrlBlur = () => {
    handleUrl({ inUrl, setUrlSuccess });
  };

  const handleExpiration = () => {
    if (!expirationEnabled) {
      setExpirationSuccess(null);
      return;
    }
    if (!expirationDate) {
      setExpirationSuccess({
        type: "error",
        message: "Expiration date and time is required",
      });
      return;
    }
    const selectedDate = new Date(expirationDate);
    if (isNaN(selectedDate.getTime())) {
      setExpirationSuccess({
        type: "error",
        message: "Invalid expiration date and time",
      });
      return;
    }
    if (selectedDate <= new Date()) {
      setExpirationSuccess({
        type: "error",
        message: "Expiration must be in the future",
      });
      return;
    }
    setExpirationSuccess({
      type: "success",
      message: "Expiration date and time is valid!",
    });
  };

  const handleCreate = async () => {
    setSubmiting(true);
    setUrlSuccess(null);
    setPasswordSuccess(null);
    setExpirationSuccess(null);
    setSlugSuccess(null);

    try {
      // 1. Validate complete URL
      const urlResult = createUrlSchemaClient.safeParse({
        originalUrl: normalizeUrl(inUrl),
      });
      if (!urlResult.success) {
        const msg =
          urlResult.error.flatten().fieldErrors.originalUrl?.[0] ??
          "Invalid URL";
        setUrlSuccess({ type: "error", message: msg });
        setSubmiting(false);
        return;
      }

      // 2. Validate password if protection enabled
      if (passProtection) {
        const passResult = validPassword.safeParse(password);
        if (!passResult.success) {
          const msg =
            passResult.error.flatten().formErrors?.[0] ??
            passResult.error.issues[0]?.message ??
            "Invalid Password";
          setPasswordSuccess({ type: "error", message: msg });
          setSubmiting(false);
          return;
        }
      }

      // 3. Validate slug if entered
      if (slug.trim()) {
        const slugResult = validSlug.safeParse(slug);
        if (!slugResult.success) {
          const msg = slugResult.error.issues[0]?.message || "Invalid Slug";
          setSlugSuccess({ type: "error", message: msg });
          setSubmiting(false);
          return;
        }
      }

      // 4. Validate expiration date if enabled
      if (expirationEnabled) {
        if (!expirationDate) {
          setExpirationSuccess({
            type: "error",
            message: "Expiration date and time is required",
          });
          setSubmiting(false);
          return;
        }
        const selectedDate = new Date(expirationDate);
        if (isNaN(selectedDate.getTime())) {
          setExpirationSuccess({
            type: "error",
            message: "Invalid expiration date and time",
          });
          setSubmiting(false);
          return;
        }
        if (selectedDate <= new Date()) {
          setExpirationSuccess({
            type: "error",
            message: "Expiration must be in the future",
          });
          setSubmiting(false);
          return;
        }
      }

      const finalSlug = slug.trim() || generateRandomSlug();

      // 5. Make POST request
      const finalObject: createUrlSchema = {
        userId: session?.user?.id || "",
        maxClicks: 1000,
        originalUrl: normalizeUrl(inUrl),
        slug: finalSlug,
        password: passProtection ? password : "",
        expiresAt:
          expirationEnabled && expirationDate
            ? new Date(expirationDate)
            : undefined,
      };
      const response = await axios.post("/api/url", finalObject);

      const resData = response.data;
      if (!resData?.success) {
        throw new Error(resData?.message || "Failed to create short URL");
      }

      // Success! Go to dashboard
      toast.success("URL created successfully");
      router.push("/workspace/dashboard");
    } catch (err: any) {
      console.error(err);
      setUrlSuccess({
        type: "error",
        message: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <main className="w-full min-h-[93vh]">
      <div className="w-full pt-3 lg:px-18 px-2 flex flex-col h-full">
        <div className="text-4xl font-serif italic w-full flex items-center justify-between">
          Create Url
          <Button
            type="button"
            variant="default"
            className="cursor-pointer"
            onClick={handleCreate}
            disabled={submitting}
          >
            {submitting ? <Spinner /> : <ArrowRight className="h-8 w-8" />}
          </Button>
        </div>
        <div
          className="mt-9 pl-1 font-extralight text-xs text-secondary/70 flex flex-col gap-8"
          suppressHydrationWarning
        >
          <div className="flex flex-col gap-2">
            <span className="pl-2">Complete Url</span>
            <InputInline
              type="url"
              placeholder="Enter your long URL here"
              value={inUrl}
              onChange={(value) => {
                setInUrl(value);
                setUrlSuccess(null);
              }}
              icon={Link01Icon}
              MessageIncoming={urlSuccess}
              runningFunction={onUrlBlur}
              disabled={submitting}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full ">
            <div className="flex flex-col gap-2">
              <span className="pl-2">slug</span>
              <div className="flex gap-2">
                <InputInline
                  type="url"
                  icon={Globe02FreeIcons}
                  placeholder="my-slug"
                  value={slug}
                  onChange={(value) => {
                    setSlug(value);
                    setSlugSuccess(null);
                  }}
                  runningFunction={onSlugBlur}
                  disabled={submitting}
                  MessageIncoming={slugSuccess}
                />
                <div className="relative top-2.25 right-6">
                  {slugLoading ? <Spinner /> : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="pl-2">Preview Url</span>
              <InputInline
                type="preview"
                value={DEPLOYMENT_URL + "/" + slug}
                disabled={true}
                MessageIncoming={{
                  type: "success",
                  message: "long url is not valid",
                }}
              />
            </div>
          </div>
          <div>
            <span className="pl-2">Advanced options</span>
            <div className="w-full mt-5 text-secondary/80 flex flex-col gap-8">
              <div className="pl-2 grid grid-cols-2 ">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="password-protection"
                    checked={passProtection}
                    onCheckedChange={(value) => {
                      setPassProtection(value);
                      setPassword("");
                      setPasswordSuccess(null);
                    }}
                    className={cn("cursor-pointer")}
                    disabled={submitting}
                  />
                  <Label htmlFor="password-protection">
                    Password protection
                  </Label>
                </div>
                <div>
                  <InputInline
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(value) => {
                      setPassword(value);
                      setPasswordSuccess(null);
                    }}
                    icon={LockIcon}
                    disabled={!passProtection || submitting}
                    runningFunction={onPasswordBlur}
                    MessageIncoming={passwordSuccess}
                  />
                </div>
              </div>

              <div className="pl-2 grid grid-cols-2 ">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="Expiration"
                    checked={expirationEnabled}
                    onCheckedChange={(value) => {
                      setExpirationEnabled(value);
                      setExpirationDate("");
                      setExpirationSuccess(null);
                    }}
                    className={cn("cursor-pointer")}
                    disabled={submitting}
                  />
                  <Label htmlFor="Expiration">Expiration</Label>
                </div>
                <div>
                  <InputInline
                    type="datetime-local"
                    placeholder="Enter Expiration date and time"
                    value={expirationDate}
                    onChange={(value) => {
                      setExpirationDate(value);
                      setExpirationSuccess(null);
                    }}
                    icon={DateIcon}
                    disabled={!expirationEnabled || submitting}
                    runningFunction={handleExpiration}
                    MessageIncoming={expirationSuccess}
                  />
                </div>
              </div>
              <QrCode
                analyticsEnabled={analyticsEnabled}
                setAnalyticsEnabled={setAnalyticsEnabled}
                slug={slug}
                submitting={submitting}
              />
            </div>
          </div>
          {/* Submit and Cancel Buttons */}
          <div className="flex items-center justify-end gap-3 mt-2 border-t border-border/50 mb-5 ">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => router.push("/workspace/dashboard")}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              className="cursor-pointer"
              onClick={handleCreate}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : (
                "Create URL"
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
