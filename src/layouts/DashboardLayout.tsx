import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const user = {
    name: "sifat",
    email: "user@gmail.com",
    avatar: "https//www.example.com",
  };
  return (
    <SidebarProvider>
      <AppSidebar userRole="admin" userData={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="hidden md:block ">
              <h1 className="text-2xl inline mr-6">Hi, Welcome Back</h1>
              <p className="inline text-2xl">Admin</p>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-4 ">
          <div className="min-h-[100vh] flex-1 rounded bg-muted/50 p-6">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
