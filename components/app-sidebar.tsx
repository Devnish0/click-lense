"use client";

import * as React from "react";

import { ThemeToggle } from "@/app/theme-toggle";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DashboardSquareIcon,
  LayoutBottomIcon,
  PlusSignIcon,
  Setting07Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NAME } from "@/lib/constant";

const data = {
  navMain: [
    {
      items: [
        {
          title: "Dashboard",
          url: "/workspace/dashboard",
          icon: DashboardSquareIcon,
          aliases: ["/dashboard"],
        },
        {
          title: "Create",
          url: "/workspace/create",
          icon: PlusSignIcon,
        },
        {
          title: "Settings",
          url: "/workspace/settings",
          icon: Setting07Icon,
        },
      ],
      title: "Workspace",
    },
  ],
};
function isActivePath(
  pathname: string,
  item: (typeof data.navMain)[number]["items"][number],
) {
  const paths = [item.url, ...(item.aliases ?? [])];

  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        <div className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground flex gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <HugeiconsIcon
              icon={LayoutBottomIcon}
              strokeWidth={2}
              className="size-4"
            />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">{NAME}</span>
            <span className="text-xs">v1.2.3</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActivePath(pathname, item)}
                      render={<a href={item.url} />}
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        strokeWidth={2}
                        className="size-4"
                      />
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Theme switcher</SidebarGroupLabel>
          <SidebarGroupContent>
            <ThemeToggle />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
