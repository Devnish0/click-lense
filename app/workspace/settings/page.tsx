"use client";

import { authClient } from "@/app/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/app/theme-toggle";
import { LogOut, User, Settings, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { data: session } = authClient.useSession();

  return (
    <main className="w-full min-h-[93vh]">
      <div className="w-full pt-3 lg:px-18 px-2 flex flex-col h-full gap-8">
        <div className="text-4xl font-serif italic w-full">Settings</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Profile Card */}
          <Card className="shadow-sm border-border/80 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Profile Details</CardTitle>
                <CardDescription>Your personal account details</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-muted/20 rounded-xl border border-border/40">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Avatar"}
                    className="h-12 w-12 rounded-full border border-primary/20 object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="font-bold text-primary text-lg">
                      {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {session?.user?.name || "Loading..."}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {session?.user?.email || "Loading..."}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card className="shadow-sm border-border/80 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Preferences</CardTitle>
                <CardDescription>Customize your workspace theme</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground pl-1">Theme Mode</span>
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border border-border/40">
                  <span className="text-sm text-foreground">Choose dark or light appearance</span>
                  <ThemeToggle />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions / Danger Zone */}
          <Card className="shadow-sm border-border/80 bg-card/50 backdrop-blur-sm md:col-span-2">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-destructive">Account Management</CardTitle>
                <CardDescription>Actions related to your current session</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-destructive/5 rounded-xl border border-destructive/10">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">Sign out of this session</span>
                  <span className="text-xs text-muted-foreground">
                    To securely end your active session on this device, you can proceed to the logout page.
                  </span>
                </div>
                <Link
                  href="/workspace/settings/logout"
                  className={cn(
                    buttonVariants({ variant: "destructive" }),
                    "cursor-pointer font-medium flex items-center gap-2"
                  )}
                >
                  <LogOut className="h-4 w-4" />
                  Go to Logout Page
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
