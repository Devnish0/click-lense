import { NAME } from "@/lib/constant";
import Link from "next/link";

export default function ErrorHeader() {
  return (
    <header className="w-full h-16 border flex items-center justify-center font-extrabold bg-card/80 font-sans text-3xl ">
      <Link href={"/"}>
        {NAME}
        <span className="text-primary">.</span>
      </Link>
    </header>
  );
}
