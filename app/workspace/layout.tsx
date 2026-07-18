"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@base-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { authClient } from "../lib/auth-client";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  let pathname = usePathname();
  const finalPath = pathname.split("/")[2];

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  return (
    <>
      <main className=" border  min-h-screen overflow-hidden bg-background flex">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/workspace/dashboard">
                      Workspace
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{finalPath}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </main>
      <div className="z-[10000] hidden lg:block">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--card)",
              color: "var(--card-foreground)",
              border: "1.5px solid var(--border)",
              borderRadius: "1.25rem",
              padding: "1rem 1.25rem",
            },
            classNames: {
              toast:
                "!bg-card !text-card-foreground !border-border shadow-2xl !rounded-2xl p-4 border-1.5",
              title: "!text-foreground font-bold text-sm tracking-tight",
              description:
                "!text-foreground/80 text-xs font-normal mt-1 block leading-normal",
              actionButton:
                "bg-primary text-primary-foreground text-xs rounded-xl font-medium px-3 py-1.5",
              cancelButton:
                "bg-muted text-muted-foreground text-xs rounded-xl font-medium px-3 py-1.5",
            },
          }}
        />
      </div>
    </>
  );
}
