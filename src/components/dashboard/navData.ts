import { Home, SquareTerminal, Bot, UserRound } from "lucide-react";

export const getNavItems = (role: "admin" | "user") => {
  if (role === "admin") {
    return [
      {
        title: "Home",
        url: "/dashboard/home",
        icon: Home,
        isActive: true,
      },
      {
        title: "Orders",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Mange Orders",
            url: "/dashboard/admin/manage-orders",
          },
          {
            title: "Create Order",
            url: "#",
          },
          {
            title: "Update Order",
            url: "#",
          },
        ],
      },
      {
        title: "Products",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Manage Product",
            url: "#",
          },
          {
            title: "Add Product",
            url: "/dashboard/admin/add-product",
          },
          {
            title: "Update Product",
            url: "/dashboard/admin/update-product",
          },
        ],
      },
      {
        title: "User",
        url: "#",
        icon: UserRound,
        items: [
          {
            title: "Manage User",
            url: "/dashboard/admin/manage-users",
          },
        ],
      },
    ];
  } else if (role === "user") {
    return [
      {
        title: "Home",
        url: "/dashboard/home",
        icon: Home,
        isActive: true,
      },
      {
        title: "View Orders",
        url: "/dashboard/user/orders",
        icon: SquareTerminal,
      },
      {
        title: "Manage Profile",
        url: "/dashboard/user/profile",
        icon: UserRound,
      },
    ];
  }

  return []; // fallback
};
