import { SidebarInset } from "@/components/ui/sidebar";
import { Notebook, Truck, UsersRound, Wallet } from "lucide-react";
import DashboardChart from "./DashboardChart";

const DashboardHome = () => {
  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#18181a]">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="aspect-video rounded-xl bg-linear-to-r from-purple-600 to-purple-300">
            <div className="flex justify-center items-center h-full gap-4 text-white">
              <div>
                <Wallet size={60} />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">1000</h2>
                <p className="font-semibold text-xl">Revenue</p>
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-linear-to-r from-blue-600 to-blue-300">
            <div className="flex justify-center items-center h-full gap-4 text-white">
              <div>
                <UsersRound size={60} />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">1500</h2>
                <p className="font-semibold text-xl">Customers</p>
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-linear-to-r from-rose-400 to-rose-200">
            <div className="flex justify-center items-center h-full gap-4 text-white">
              <div>
                <Notebook size={60} />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">103</h2>
                <p className="font-semibold text-xl">Products</p>
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-linear-to-r from-green-400 to-green-200">
            <div className="flex justify-center items-center h-full gap-4 text-white">
              <div>
                <Truck size={60} />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">500</h2>
                <p className="font-semibold text-xl">Orders</p>
              </div>
            </div>
          </div>
        </div>
        <>
          <DashboardChart />
        </>
      </div>
    </SidebarInset>
  );
};

export default DashboardHome;
