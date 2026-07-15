"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function LogoutPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      // The workspace layout will handle redirecting since session becomes null,
      // but we also perform a router push to '/' to be absolutely sure.
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-background/50">
      <Card className="w-full max-w-md shadow-lg border-border/80 bg-card/70 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <LogOut className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-serif italic">Confirm Logout</CardTitle>
          <CardDescription>
            Are you sure you want to log out of your account?
          </CardDescription>
        </CardHeader>
        
        {session?.user && (
          <CardContent className="py-4 border-y border-border/40 my-2">
            <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl border border-border/40">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "Avatar"}
                  className="h-10 w-10 rounded-full border border-primary/20 object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="font-bold text-primary">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-foreground">
                  {session.user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col gap-2 pt-4">
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={loading}
            className="w-full cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner className="h-4 w-4 text-destructive-foreground animate-spin" />
                Logging out...
              </>
            ) : (
              "Yes, Sign Out"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
            className="w-full cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel & Go Back
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
