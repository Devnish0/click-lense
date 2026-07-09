"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Login from "../login";
import { NAME } from "@/lib/constant";

export default function Page() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      <div className=" inset-y-0 left-0 hidden w-1/2 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px] md:block text-amber-200">
        <span className="text-[12px] mt-14 font-light text-slate-300/60 w-full flex items-center justify-center ">
          Manage your URLs in a better way
        </span>

        <span className="text-7xl text-center tracking-wide mt-14 font-serif italic text-white w-full h-[60vh] flex flex-col items-center justify-center ">
          "Manage your
          <br /> URLs."
          <span className="relative right-6 border w-32 mt-14 border-slate-300/30"></span>
        </span>
        <span className="text-[12px] mt-14 font-light text-slate-300/60 w-full flex items-center justify-center gap-2">
          Made with ❤️ by{" "}
          <Link
            href="https://github.com/nishank"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Nishank
          </Link>
        </span>
      </div>
      <div className="z-10 flex w-full flex-col md:w-1/2">
        <div className="flex items-center w-full gap-2 p-4 text-foreground/60">
          <ArrowLeft className="w-4" />
          <Link href="/" className="text-md font-bold underline">
            Back
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="mb-6 flex flex-col items-center gap-2">
            <main className="text-2xl font-bold">{NAME}</main>
            <span className="text-sm text-foreground/60">
              Your all in one URL manager
            </span>
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
}
