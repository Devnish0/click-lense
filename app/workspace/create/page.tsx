"use client";
import QRCodeCard from "@/app/lib/qrgenerator";
import { InputInline } from "@/components/form/url";
import { use, useState } from "react";
import {
  Date,
  Globe,
  Globe02FreeIcons,
  Link01Icon,
  LockIcon,
  Search01Icon,
  Time,
} from "@hugeicons/core-free-icons";
import { DEPLOYMENT_URL } from "@/lib/constant";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import AnalyticsComponent from "@/components/analyticscomponent";
import { normalizeUrl } from "@/components/search";
import { createUrlSchema, validPassword } from "@/app/lib/validators/clientValidators.ts/url";

interface Message {
  type: "error" | "success";
  message: string;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const url =
    typeof resolvedSearchParams.url === "string"
      ? resolvedSearchParams.url
      : "";
  const [inUrl, setInUrl] = useState(url);
  const [urlSuccess, setUrlSuccess] = useState<Message | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [slugSuccess,setSlugSuccess] = useState<Message | null>(null);
  const [passProtection, setPassProtection] = useState(false);
  const [passwordSuccess,setPasswordSuccess] = useState<Message | null>(null);
  const [password, setPassword] = useState<string>("");
  const [expirationEnabled, setExpirationEnabled] = useState(false);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [expirationSuccess,setExpirationSuccess] = useState<Message | null>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const handleExpiration = ()=>{
    console.log(expirationDate)
  }
  const handleUrl = () => {
    // Handle form submission logic here
    try {
      const result = createUrlSchema.safeParse({
        originalUrl: normalizeUrl(inUrl),
      });
      if (result.success) {
        setUrlSuccess({
          type: "success",
          message: "URL created successfully!",
        });
        console.log("Valid URL:", result.data.originalUrl);
      } else {
        const message =
          result.error.flatten().fieldErrors.originalUrl?.[0] ??
          result.error.issues[0]?.message;

        setUrlSuccess({
          type: "error",
          message: message,
        });
        console.log("Invalid URL:", result.error);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  const handlePassword = ()=>{
    // Handle form submission logic here
    try{
      const result = validPassword.safeParse(password);
      if (result.success) {
        setPasswordSuccess({
          type: "success",
          message: "Password created successfully!",
        });
        console.log("Valid Password:", result.data);
      } else {
        const message =
          result.error.flatten().fieldErrors?.[0] ??
          result.error.issues[0]?.message;

        setPasswordSuccess({
          type: "error",
          message: message,
        });
        console.log("Invalid Password:", result.error);
      }
    }catch(error){
      console.error("error:", error);
    }
    
  }

  return (
    <main className="w-full min-h-[93vh]">
      <div className="w-full pt-3 lg:px-18 px-2 flex flex-col h-full">
        <div className="text-4xl font-serif italic w-full">Create Url</div>
        <div className="mt-9 pl-1 font-extralight text-xs text-secondary/70 flex flex-col gap-8">
          <div>
            <span className="pl-2">Complete Url</span>
            <InputInline
              type="url"
              placeholder="Enter your long URL here"
              value={inUrl}
              onChange={(value) => setInUrl(value)}
              icon={Link01Icon}
              MessageIncoming={urlSuccess}
              runningFunction={handleUrl}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full ">
            <div>
              <span className="pl-2">slug</span>
              <div className="flex gap-2">
                <InputInline
                  type="url"
                  icon={Globe02FreeIcons}
                  placeholder="my-slug"
                  value={slug}
                  onChange={(value) => setSlug(value)}
                  
                  MessageIncoming={{
                    type: "success",
                    message: "long url is not valid",
                  }}
                />
              </div>
            </div>
            <div>
              <span className="pl-2">Preview Url</span>
              <InputInline
                type="preview"
                value={DEPLOYMENT_URL + "/" + slug}
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
                      setPassProtection(value)
                      setPassword("")
                      setPasswordSuccess(null)
                    }}
                    className={cn("cursor-pointer")}
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
                    onChange={(value) => {setPassword(value)}}
                    icon={LockIcon}
                    disabled={!passProtection}
                    runningFunction={handlePassword}
                    MessageIncoming={passwordSuccess}
                  />
                </div>
              </div>

              <div className="pl-2 grid grid-cols-2 ">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="Expiration"
                    checked={expirationEnabled}
                    onCheckedChange={(value) =>{ 
                      setExpirationEnabled(value)
                      setExpirationDate("")
                      setExpirationSuccess(null)

                    }}
                    className={cn("cursor-pointer")}
                  />
                  <Label htmlFor="Expiration">Expiration</Label>
                </div>
                <div>
                  <InputInline
                    type="date"
                    placeholder="Enter Expiration date"
                    value={expirationDate}
                    onChange={(value) => setExpirationDate(value)}
                    icon={Time}
                    disabled={!expirationEnabled}
                    runningFunction={handleExpiration}
                    MessageIncoming={expirationSuccess}
                  />
                </div>
              </div>

              <div className="pl-2 flex w-full flex-col gap-8">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="Analytics"
                    checked={analyticsEnabled}
                    onCheckedChange={(value) => setAnalyticsEnabled(value)}
                    className={cn("cursor-pointer")}
                  />
                  <Label htmlFor="Analytics">Analytics</Label>
                </div>
              </div>
              <AnalyticsComponent analyticsEnabled={analyticsEnabled} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
