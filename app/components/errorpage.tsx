"use client";
import { NAME } from "@/lib/constant";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import Footer from "./ui/footer";
import ErrorHeader from "./errorHeader";

interface errorpageTypes {
  type: "notfound" | "expired" | "maxclicks";
  code: string;
}

export default function Errorpage({ type, code }: errorpageTypes) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((e) => {
        if (e > 0) {
          return e - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
    if (count == 0) {
      window.location.href = "/workspace/dashboard";
    }
    return () => clearInterval(timer);
  }, [count]);

  return (
    <>
      <main className="w-full h-screen flex flex-col ">
        <ErrorHeader />

        <div className="flex flex-col gap-3 items-center  grow border">
          <Link href="/" className="mt-50">
            <Logo size="lg" />
          </Link>
          {type == "expired" && (
            <>
              <div className="font-serif text-5xl mt-4 text-muted-foreground italic">
                {code}
              </div>
              <div className="font-serif text-5xl text-muted-foreground">
                Link expired
              </div>
            </>
          )}
          {type === "notfound" && (
            <>
              <div className="font-serif text-5xl mt-4 text-muted-foreground italic">
                404
              </div>
              <div className="font-serif text-5xl text-muted-foreground">
                Link not found
              </div>
            </>
          )}
          {type === "maxclicks" && (
            <>
              <div className="font-serif text-5xl mt-4 text-muted-foreground italic">
                {code}
              </div>
              <div className="font-serif text-5xl text-muted-foreground">
                MAX Clicks reached
              </div>
            </>
          )}
          <div className="text-md text-center max-w-sm text-muted-foreground mt-7">
            Know who where and when your link was visited for free with{" "}
            <Link
              href="/"
              className="text-primary font-medium font-sans hover:text-primary/70 transition-colors"
            >
              {NAME}
            </Link>
          </div>

          <div className="w-full flex flex-col gap-3 items-center mt-5">
            <div className="text-sm  font-bold text-muted-foreground font-sans flex gap-1 items-center justify-center">
              redirecting home in{" "}
              <span className="text-md font-extrabold font-serif text-primary">
                {" "}
                {count}
              </span>
            </div>
            <Link href="/">
              <Button className="max-w-lg cursor-pointer" size={"lg"}>
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
