import { NAME } from "@/lib/constant";
import ErrorHeader from "./components/errorHeader";
import { Linden_Hill } from "next/font/google";
import Link from "next/link";
import Logo from "./components/logo";
import PassComponent from "./unlock/passcomponent";
import Footer from "./components/ui/footer";
import Errorpage from "./components/errorpage";

export default async function NotFoundPage() {
  return (
    <>
      <Errorpage type="NotfoundPage" code="" />
    </>
  );
}
