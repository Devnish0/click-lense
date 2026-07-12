"use client";
// import LinkComponent from "@/components/linkcomponent";
import LinkComponent from "@/components/linkcomponent";
import { InputInline } from "@/components/search";
import axios from "axios";
import { useEffect, useState } from "react";

interface userUrl {
  shortCode: string;
  originalUrl: string;
  password?: string | null;
  expiresAt?: string | null;
}
export default function Page() {
  const [userUrls, setUserUrls] = useState<userUrl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/url");
        console.log(response);
        setUserUrls(response.data?.data?.userUrls || []);
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
          <div className="w-full mt-7">
            <span className="w-20">
              <InputInline />
            </span>
          </div>
          <div className="mt-3 pl-1 font-extralight text-xs text-secondary/70">
            Projects
          </div>
          {loading ? (
            <>loading</>
          ) : userUrls.length > 0 ? (
            <div className="w-full border rounded-sm mt-3 border-border/70 ">
              {userUrls.map((link: userUrl) => {
                return (
                  <LinkComponent
                    key={link.shortCode}
                    Password={!!link.password}
                    expiresAt={
                      link.expiresAt
                        ? new Date(link.expiresAt).toLocaleDateString()
                        : "Never"
                    }
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
