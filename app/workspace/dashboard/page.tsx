"use client";
// import LinkComponent from "@/components/linkcomponent";
import LinkComponent from "@/components/linkcomponent";
import { normalizeUrl } from "@/components/search";
import { InputInline } from "@/components/form/inputinline";
import { Link01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createUrlSchemaClient } from "@/app/lib/validators/clientValidators.ts/url";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import formatRelativeDate from "@/app/lib/dateFormatter";

interface userUrl {
  shortCode: string;
  originalUrl: string;
  password?: string | null;
  createdAt?: Date | string | number | undefined | null;
}

function LinkSkeleton() {
  return (
    <>
      <div className="flex flex-col p-3 border-b border-border/70 last:border-b-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <Skeleton className="size-11 rounded-lg" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="hidden lg:inline-block h-6 w-32 rounded-3xl" />
            <Skeleton className="hidden lg:inline-block h-4 w-16" />
            <div className="flex items-center gap-3">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-4" />
              <Skeleton className="size-4" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="lg:hidden flex flex-col gap-2 mt-3">
          <Skeleton className="h-6 w-32 rounded-3xl" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="flex flex-col p-3 border-b border-border/70 last:border-b-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <Skeleton className="size-11 rounded-lg" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="hidden lg:inline-block h-6 w-32 rounded-3xl" />
            <Skeleton className="hidden lg:inline-block h-4 w-16" />
            <div className="flex items-center gap-3">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-4" />
              <Skeleton className="size-4" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="lg:hidden flex flex-col gap-2 mt-3">
          <Skeleton className="h-6 w-32 rounded-3xl" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </>
  );
}

export default function Page() {
  const router = useRouter();
  const [quickUrl, setQuickUrl] = useState("");
  const [quickUrlError, setQuickUrlError] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [userUrls, setUserUrls] = useState<userUrl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/url");
        console.log(response);
        const userUrls = response.data?.data?.userUrls as userUrl[];
        setUserUrls(userUrls || []);
      } catch (error) {
        console.error("Failed to fetch user URLs:", error);
        setUserUrls([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <main className="w-full min-h-[93vh] border ">
        <div className="w-full pt-3 lg:px-18 px-2 flex flex-col h-full border ">
          <div className="text-4xl font-serif italic w-full">Your URLs</div>
          <div className=" hidden w-full border-t border-secondary/20"></div>
          <div className="w-full mt-7 flex gap-3">
            <div className="flex-1 ">
              <InputInline
                placeholder="Paste a link to shorten..."
                value={quickUrl}
                onChange={(val) => {
                  setQuickUrl(val);
                  setQuickUrlError(null);
                }}
                icon={Link01Icon}
                MessageIncoming={quickUrlError}
              />
            </div>
            <Button
              className="cursor-pointer px-6"
              onClick={() => {
                const result = createUrlSchemaClient.safeParse({
                  originalUrl: normalizeUrl(quickUrl),
                });
                if (result.success) {
                  router.push(
                    `/workspace/create?url=${encodeURIComponent(result.data.originalUrl)}`,
                  );
                } else {
                  const message =
                    result.error.flatten().fieldErrors.originalUrl?.[0] ??
                    result.error.issues[0]?.message;
                  setQuickUrlError({
                    type: "error",
                    message: message || "Invalid URL",
                  });
                }
              }}
            >
              Shorten
            </Button>
          </div>
          <div className="mt-3 pl-1 font-extralight text-xs text-secondary/70">
            Projects
          </div>
          {loading ? (
            <div className="w-full border rounded-sm mt-3 border-border/70 divide-y divide-border/70">
              <LinkSkeleton />
              <LinkSkeleton />
              <LinkSkeleton />
            </div>
          ) : userUrls.length > 0 ? (
            <div className="w-full border rounded-sm mt-3 border-border/70 ">
              {userUrls.map((link: userUrl) => {
                return (
                  <LinkComponent
                    key={link.shortCode}
                    Password={!!link.password}
                    createdAt={link.createdAt}
                    originalURL={link.originalUrl}
                    shortcode={link.shortCode}
                  />
                );
              })}
            </div>
          ) : (
            // </div>

            <div className="w-full flex items-center justify-center grow pb-30">
              <p className="text-secondary/50">create your first url</p>
            </div>
          )}

          <div className=""></div>
        </div>
      </main>
    </>
  );
}
