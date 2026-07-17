import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import ErrorHeader from "../components/errorHeader";
import Logo from "../components/logo";
import Footer from "../components/ui/footer";
import PassComponent from "./passcomponent";

export default async function ExpiredPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolved = await searchParams;
  const code = typeof resolved.code === "string" ? resolved.code : "";
  const ref = typeof resolved.ref === "string" ? resolved.ref : "";

  return (
    <>
      <main className="w-full h-screen flex flex-col ">
        <ErrorHeader />
        <div className="flex flex-col gap-3 items-center grow border">
          <Link href="/" className="mt-20">
            <Logo size="lg" />
          </Link>
          <>
            <div className="font-serif text-5xl mt-4 text-muted-foreground italic">
              :{code}
            </div>
          </>
          <PassComponent slug={code} refer={ref} />
        </div>
      </main>

      <Footer />
    </>
  );
}
