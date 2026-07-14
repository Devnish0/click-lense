"use client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { KeyRound } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { unlockUrl } from "../lib/validators/url";
import LinkComponent from "@/components/linkcomponent";
import { InputInline } from "@/components/form/inputinline";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { HttpStatus } from "../lib/httpStatus";

export default function PassComponent({ slug }: { slug: string }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setError(null);
    setLoading(true);
    try {
      const finalObject: unlockUrl = {
        Password: password,
        slug: slug,
      };
      const response = await axios.post("/api/url/unlock", finalObject);
      const { success, data, message } = response.data;
      console.log(success);
      if (success && data?.originalUrl) {
        window.location.href = data.originalUrl;
      } else {
        setError(message || "Incorrect password or something went wrong.");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mt-13">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <KeyRound size={18} />
          Enter Password
        </CardTitle>
        <CardDescription>
          This link is protected by a password. if you dont know the password.
          please contact the link owner.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  placeholder="super-secret-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                />
                {loading && <Spinner />}
              </div>
              {error && (
                <p className="text-sm text-destructive mt-1">{error}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-5">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            Unlock
          </Button>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Home
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
