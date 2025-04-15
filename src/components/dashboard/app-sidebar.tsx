import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { getNavItems } from "./navData";

export function AppSidebar({
  userRole = "user", // pass this dynamically
  userData = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    role: "user | Admin",
  },
  ...props
}: {
  userRole: "admin" | "user";
  userData: { name: string; email: string; avatar: string; role: string };
} & React.ComponentProps<typeof Sidebar>) {
  const navItems = getNavItems(userRole === "admin" ? "admin" : "user");

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
