/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { TOrder } from "@/types/order";
import { toast } from "sonner";
import OrderTbl from "./OrderTbl";
import { TextShimmer } from "@/components/ui/text-shimmer";

const Orders = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          "https://papyrus-server-lovat.vercel.app/api/order/byUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized - Please login again");
          }
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();

        setOrders(data?.data);
      } catch (err: any) {
        setError(err.message);

        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <TextShimmer duration={.7}>Loading orders...</TextShimmer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Manage Orders</h1>
      <OrderTbl orders={orders} />
    </div>
  );
};

export default Orders;
