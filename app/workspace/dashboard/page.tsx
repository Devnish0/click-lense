import { InputInline } from "@/components/search";

export default function Page() {
  return (
    <>
      <main className="w-full min-h-[93vh] border ">
        <div className="w-full pt-3 px-8">
          <div className="text-4xl font-serif italic w-full">Your URLs</div>
          <div className="w-full border-t border-secondary/20"></div>
          <div className="w-full mt-7">
            <span className="w-20">
              <InputInline />
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
