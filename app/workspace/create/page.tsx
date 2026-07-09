import QRCodeCard from "@/app/lib/qrgenerator";
import { InputInline } from "@/components/search";

export default function Page() {
  return (
    <main className="w-full min-h-[93vh] border ">
      <div className="w-full pt-3 lg:px-18 px-2 flex flex-col h-full border ">
        <div className="text-4xl font-serif italic w-full">Create</div>
        <div className=" hidden w-full border-t border-secondary/20"></div>
        <div className="w-full mt-7">
          <span className="w-20">
            <InputInline />
          </span>
        </div>
        <div className="mt-3 pl-1 font-extralight text-xs text-secondary/70">
          Projects
          <QRCodeCard value="https://github.com/bunlong/next-qrcode" />
        </div>
      </div>
    </main>
  );
}
