import { NAME } from "@/lib/constant";
import Logo from "../components/logo";
import Link from "next/link";
import Footer from "../components/ui/footer";
import PassComponent from "./passcomponent";

export default async function ExpiredPage({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>;
}) {
  const code = (await searchParams).code;

  return (
    <>
      <main className="w-full h-screen flex flex-col ">
        <header className="w-full h-16 border flex items-center justify-center font-extrabold bg-card/80 font-sans text-3xl ">
          {NAME}
        </header>
        <div className="flex flex-col gap-3 items-center grow border">
          <Link href="/" className="mt-20">
            <Logo size="lg" />
          </Link>
          <>
            <div className="font-serif text-5xl mt-4 text-muted-foreground italic">
              :{code}
            </div>
          </>
          <PassComponent slug={code} />
        </div>
      </main>

      <Footer />
    </>
  );
}
