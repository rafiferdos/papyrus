import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ChevronDown,
  ExternalLink,
  LogOut,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "../icons/MenuIcon";
import { ModeToggle } from "../icons/ModeToggle";
import MountainIcon from "../icons/MountainIcon";
import { GlowEffect } from "../ui/glow-effect";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/userApi";
import { RootState } from "@/redux/store";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(useCurrentToken);
  const user = useSelector(useCurrentUser);
  const userData = useGetUserQuery(user?._id);
  const userName = userData?.data?.data?.name;

  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  // Get cart items from Redux store
  const cartProducts =
    useSelector((state: RootState) => state.cart.products) || [];

  const Tabs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "More", href: "#", isMegaMenu: true },
  ];

  const handleLogout = () => {
    // Clear cart from local storage
    localStorage.removeItem("cart");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="w-screen bg-white shadow-md dark:bg-black">
      <div className="container w-11/12 mx-auto max-w-7xl md:w-10/12">
        <header className="flex items-center w-full h-20 px-4 shrink-0 md:px-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="w-6 h-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link to="/" className="hidden mr-6 lg:flex">
                <MountainIcon className="w-6 h-6" />
                <span className="sr-only font-charm">Papyrus</span>
              </Link>
              {/* Mobile Menu Links */}
              <div className="grid gap-2 py-6 mt-5 pl-7">
                {Tabs.map((tab) => (
                  <Link
                    to={tab.href}
                    key={tab.name}
                    data-id={tab.name}
                    type="button"
                    className={`px-2 py-1.5 transition-colors duration-300 flex items-center
                    ${
                      location.pathname === tab.href && !tab.isMegaMenu
                        ? "text-zinc-950 dark:text-zinc-50 font-bold border-b-2 border-b-yellow-200 dark:border-b-yellow-600"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                    }`}
                  >
                    {tab.name}
                    {tab.isMegaMenu && <ChevronDown className="ml-1 h-4 w-4" />}
                  </Link>
                ))}
                <div className="relative">
                  <ModeToggle />
                </div>
                <div className="w-auto">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative"
                          size="sm"
                          asChild
                        >
                          <Link to={"/cart"}>
                            <ShoppingCart />
                            {cartProducts.length > 0 && (
                              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-[10px]">
                                {cartProducts.length}
                              </Badge>
                            )}
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Mobile User Menu */}
                <div className="w-auto">
                  {token ? (
                    <div className="space-y-2">
                      <Link to="/profile">
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-start w-full"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleLogout}
                        className="justify-start w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button variant="default" size="sm" asChild>
                      <Link to={"/register"}>Sign Up</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Links */}
          <Link to="/" className="flex items-center gap-2 mr-6 lg:flex">
            <MountainIcon className="w-6 h-6" />
            <span className="text-xl font-semibold font-charm">Papyrus</span>
          </Link>
          <nav className="items-center hidden gap-6 ml-auto lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {Tabs.map((tab) =>
                  tab.isMegaMenu ? (
                    <NavigationMenuItem key={tab.name}>
                      <NavigationMenuTrigger
                        className={`${
                          location.pathname === tab.href
                            ? "text-zinc-950 dark:text-zinc-50 font-bold"
                            : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {tab.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-3 gap-6 p-6 md:w-[800px] lg:w-[900px]">
                          {/* Featured Products Column */}
                          <div className="space-y-4">
                            <div className="mb-2">
                              <h3 className="text-lg font-medium">
                                Featured Products
                              </h3>
                              <div className="h-1 w-12 bg-primary rounded-full mt-1"></div>
                            </div>

                            <div className="grid gap-3">
                              <Link
                                to="/products/feature/leather-journal"
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent group"
                              >
                                <div className="w-14 h-14 rounded-md overflow-hidden">
                                  <img
                                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                    alt="Leather Journal"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium group-hover:text-primary transition-colors">
                                    Vintage Leather Journal
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    $24.99
                                  </p>
                                </div>
                              </Link>

                              <Link
                                to="/products/feature/fountain-pen"
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent group"
                              >
                                <div className="w-14 h-14 rounded-md overflow-hidden">
                                  <img
                                    src="https://images.unsplash.com/photo-1560166441-1ea4e9a94e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                    alt="Fountain Pen"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium group-hover:text-primary transition-colors">
                                    Classic Fountain Pen
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    $32.50
                                  </p>
                                </div>
                              </Link>
                            </div>

                            <Link
                              to="/products/featured"
                              className="text-sm text-primary flex items-center hover:underline"
                            >
                              View all featured products
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </Link>
                          </div>

                          {/* Resources Column */}
                          <div className="space-y-4">
                            <div className="mb-2">
                              <h3 className="text-lg font-medium">Resources</h3>
                              <div className="h-1 w-12 bg-primary rounded-full mt-1"></div>
                            </div>

                            <div className="grid gap-2">
                              <Link
                                to="/resources/paper-guide"
                                className="flex items-center gap-2 hover:text-primary transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                                <span>Guide to Paper Types</span>
                              </Link>
                              <Link
                                to="/resources/journal-ideas"
                                className="flex items-center gap-2 hover:text-primary transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                                  <path d="M12 7c1-.56 2.78-2 5-2 .47 0 .94.05 1.4.15"></path>
                                </svg>
                                <span>Creative Journal Ideas</span>
                              </Link>
                              <Link
                                to="/resources/calligraphy-basics"
                                className="flex items-center gap-2 hover:text-primary transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <path d="m18 2 4 4"></path>
                                  <path d="m17 3 3 3"></path>
                                  <path d="M19 8 8 19l-5 2 2-5L16 5z"></path>
                                </svg>
                                <span>Calligraphy for Beginners</span>
                              </Link>
                              <Link
                                to="/resources/organize-workspace"
                                className="flex items-center gap-2 hover:text-primary transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <rect
                                    width="7"
                                    height="9"
                                    x="3"
                                    y="3"
                                    rx="1"
                                  ></rect>
                                  <rect
                                    width="7"
                                    height="5"
                                    x="14"
                                    y="3"
                                    rx="1"
                                  ></rect>
                                  <rect
                                    width="7"
                                    height="9"
                                    x="14"
                                    y="12"
                                    rx="1"
                                  ></rect>
                                  <rect
                                    width="7"
                                    height="5"
                                    x="3"
                                    y="16"
                                    rx="1"
                                  ></rect>
                                </svg>
                                <span>Workspace Organization</span>
                              </Link>
                            </div>

                            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                              <p className="text-sm font-medium">
                                Free Downloadable Templates
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Planners, calendars, and more
                              </p>
                              <Link
                                to="/resources/downloads"
                                className="text-xs text-primary mt-2 inline-block hover:underline"
                              >
                                Access now →
                              </Link>
                            </div>
                          </div>

                          {/* Latest & Events Column */}
                          <div className="space-y-4">
                            <div className="mb-2">
                              <h3 className="text-lg font-medium">
                                Latest & Events
                              </h3>
                              <div className="h-1 w-12 bg-primary rounded-full mt-1"></div>
                            </div>

                            <div className="grid gap-3">
                              <div className="border rounded-md p-3 hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30"
                                  >
                                    NEW BLOG
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    2 days ago
                                  </span>
                                </div>
                                <Link
                                  to="/blog/journaling-tips"
                                  className="text-sm font-medium hover:text-primary transition-colors"
                                >
                                  10 Journaling Tips to Boost Productivity
                                </Link>
                              </div>

                              <div className="border rounded-md p-3 hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                                  >
                                    EVENT
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    Coming soon
                                  </span>
                                </div>
                                <Link
                                  to="/events/workshop"
                                  className="text-sm font-medium hover:text-primary transition-colors"
                                >
                                  Calligraphy Workshop - May 15th
                                </Link>
                              </div>
                            </div>

                            <div className="p-3 border border-dashed rounded-md border-primary/30 bg-primary/5">
                              <div className="flex items-center justify-between">
                                <div className="flex-shrink-0">
                                  <p className="font-medium text-sm">
                                    Subscribe to our newsletter
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    Get weekly inspiration and updates
                                  </p>
                                </div>
                                <Link
                                  to="/newsletter"
                                  className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
                                >
                                  Join
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={tab.name}>
                      <Link to={tab.href}>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            `${
                              location.pathname === tab.href
                                ? "text-zinc-950 dark:text-zinc-50 font-bold"
                                : "text-zinc-600 dark:text-zinc-400"
                            }`
                          )}
                        >
                          {tab.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Cart Icon */}
            <div>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative"
                      size="sm"
                      asChild
                    >
                      <Link to={"/cart"}>
                        <ShoppingCart />
                        {cartProducts.length > 0 && (
                          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-[10px]">
                            {cartProducts.length}
                          </Badge>
                        )}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* User Profile or Sign Up */}
            {token ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center">
                    <p className="mr-2.5 cursor-pointer">{userName}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Avatar className="w-8 h-8 cursor-pointer">
                        <AvatarFallback className="text-white bg-indigo-600">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin ? (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/dashboard/admin/manage-users"
                        className="cursor-pointer"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/dashboard/user/profile"
                        className="cursor-pointer"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="primary" size="sm" asChild>
                <Link to={"/register"}>Sign Up</Link>
              </Button>
            )}

            {/* Theme Toggle */}
            <div className="relative">
              <GlowEffect
                colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
                mode="colorShift"
                blur="soft"
                duration={3}
                scale={0.9}
              />
              <div className="relative">
                <ModeToggle />
              </div>
            </div>
          </nav>
        </header>
      </div>
    </nav>
  );
}
