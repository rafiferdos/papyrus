// import * as React from "react";
// import { UserRound, Bot, SquareTerminal, Home } from "lucide-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarRail,
// } from "@/components/ui/sidebar";

// import { NavMain } from "./nav-main";

// import { NavUser } from "./nav-user";

// // This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },

//   navMain: [
//     {
//       title: "Home",
//       url: "/dashboard/home",
//       icon: Home,
//       isActive: true,
//     },
//     {
//       title: "Orders",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "Mange Orders",
//           url: "/dashboard/admin/manage-orders",
//         },
//         {
//           title: "Create Order",
//           url: "#",
//         },
//         {
//           title: "Update Order",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Products",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Manage Product",
//           url: "#",
//         },
//         {
//           title: "Add Product",
//           url: "/dashboard/admin/add-product",
//         },
//         {
//           title: "Update Product",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "User",
//       url: "#",
//       icon: UserRound,
//       items: [
//         {
//           title: "Manage User",
//           url: "/dashboard/admin/manage-users",
//         },
//       ],
//     },
//   ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

//* New App Sidebar

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
  userRole = "admin", // pass this dynamically
  userData = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  ...props
}: {
  userRole: "admin" | "user";
  userData: { name: string; email: string; avatar: string };
} & React.ComponentProps<typeof Sidebar>) {
  const navItems = getNavItems(userRole);

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
