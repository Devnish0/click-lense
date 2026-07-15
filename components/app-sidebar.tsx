"use client";

import * as React from "react";

import { authClient } from "@/app/lib/auth-client";
import { ThemeToggle } from "@/app/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NAME } from "@/lib/constant";
import { LayoutDashboard, Plus, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  aliases?: string[];
}

const mainNav: NavItem[] = [
  {
    title: "Dashboard",
    url: "/workspace/dashboard",
    icon: LayoutDashboard,
    aliases: ["/dashboard"],
  },
  {
    title: "Create",
    url: "/workspace/create",
    icon: Plus,
  },
  // {
  //   title: "Analytics",
  //   url: "/workspace/analytics",
  //   icon: BarChart3,
  // },
  // {
  //   title: "QR Codes",
  //   url: "/workspace/qr",
  //   icon: QrCode,
  // },
];

const settingsNav: NavItem[] = [
  {
    title: "Settings",
    url: "/workspace/settings",
    icon: Settings,
  },
];

function isActivePath(pathname: string, item: NavItem) {
  const paths = [item.url, ...(item.aliases ?? [])];
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex gap-2.5 px-1 py-1">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            {NAME.charAt(0)}
          </div>
          <div className="flex flex-col gap-0 leading-none">
            <span className="font-semibold text-sm">{NAME}</span>
            <span className="text-[11px] text-muted-foreground">
              URL Shortener
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActivePath(pathname, item)}
                    render={<a href={item.url} />}
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActivePath(pathname, item)}
                    render={<a href={item.url} />}
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* User profile */}
        {session?.user && (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex items-center gap-2.5 px-2 py-1.5">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="size-7 rounded-full object-cover ring-1 ring-border"
                  />
                ) : (
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium truncate">
                    {session.user.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate">
                    {session.user.email}
                  </span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Theme toggle */}
        <SidebarGroup>
          <SidebarGroupContent>
            <ThemeToggle />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
