/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ManageOrderTbl from "@/components/dashboard/orders/ManageOrderTbl";
import { TOrder, TOrderStatus } from "@/types/order";
import { toast } from "sonner";

const ManageOrders = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          "https://papyrus-server-lovat.vercel.app/api/order",
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

        setOrders(data.data);
      } catch (err: any) {
        setError(err.message);

        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleStatusChange = async (
    orderId: string,
    newStatus: TOrderStatus
  ) => {
    try {
      // const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `https://papyrus-server-lovat.vercel.app/api/order/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order?._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading orders...</p>
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
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <ManageOrderTbl orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default ManageOrders;
