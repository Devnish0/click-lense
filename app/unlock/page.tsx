import { NAME } from "@/lib/constant";
import Logo from "../components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "../components/ui/footer";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Password } from "@hugeicons/core-free-icons";
import { KeyRound } from "lucide-react";

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
          <Card className="w-full max-w-sm mt-13">
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                <KeyRound size={18} />
                Enter Password
              </CardTitle>
              <CardDescription>
                This link is protected by a password. if you dont know the
                password. please contact the link owner.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/* <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a> */}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="super-secret-password"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
          {/* <div className="text-md text-center max-w-sm text-muted-foreground mt-7">
            Know who where and when your link was visited for free with{" "}
            <Link
              href="/"
              className="text-primary font-medium font-sans hover:text-primary/70 transition-colors"
            >
              {NAME}
            </Link>
          </div> */}

          {/* <div className="w-full flex flex-col gap-3 items-center mt-5">
            <div className="text-sm  font-bold text-muted-foreground font-sans flex gap-1 items-center justify-center">
              redirecting home in{" "}
              <span className="text-md font-extrabold font-serif text-primary">
                {" "}
                {9}
              </span>
            </div>
            <Link href="/">
              <Button className="max-w-lg cursor-pointer" size={"lg"}>
                Go to Home
              </Button>
            </Link>
          </div> */}
        </div>
      </main>

      <Footer />
    </>
  );
}
