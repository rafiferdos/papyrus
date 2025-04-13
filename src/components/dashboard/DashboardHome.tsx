import { SidebarInset } from "@/components/ui/sidebar";
import { Edit, Notebook, Truck, UsersRound, Wallet } from "lucide-react";
import DashboardChart from "./DashboardChart";
import { Button } from "../ui/button";

const DashboardHome = () => {
  const isAdmin = false;
  return (
    <>
      {isAdmin ? (
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
      ) : (
        <div className="h-full flex justify-center items-center">
          <div className="grid grid-cols-1  gap-6">
            <div className="h-96 rounded w-96 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="user img"
                className="w-56 rounded-full mx-auto mt-5"
              />
              <p className="my-6 text-2xl text-center">User Name</p>
              <div className="text-center">
                <Button className="text-white cursor-pointer">
                  Edit Your Profile
                  <Edit />
                </Button>
              </div>
            </div>
            {/* <div className="shadow-2xl rounded h-96 w-96 pt-28">
              <p className="text-2xl text-white text-center my-6">
                Your Activities
              </p>
              <div className="flex gap-2 pl-6">
                <p className="flex gap-1">
                  <ShoppingCart /> Orders :
                </p>
                <p>06</p>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHome;
