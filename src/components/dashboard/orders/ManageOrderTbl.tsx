/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { TOrder, TOrderStatus } from "@/types";
import { toast } from "sonner";

type Props = {
  orders: TOrder[];
  onStatusChange: (orderId: string, newStatus: TOrderStatus) => Promise<void>;
};

const ManageOrderTbl = ({ orders, onStatusChange }: Props) => {
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});

  const handleStatusChange = async (
    orderId: string,
    newStatus: TOrderStatus
  ) => {
    try {
      setIsUpdating((prev) => ({ ...prev, [orderId]: true }));
      await onStatusChange(orderId, newStatus);
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const getStatusColor = (status: TOrderStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Paid":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="px-4 py-3 text-white">SL Number</TableHead>
            <TableHead className="px-4 py-3 text-white">Order ID</TableHead>
            <TableHead className="px-4 py-3 text-white">Customer</TableHead>
            <TableHead className="px-4 py-3 text-white">Products</TableHead>
            <TableHead className="px-4 py-3 text-white">Items</TableHead>
            <TableHead className="px-4 py-3 text-white">Date</TableHead>
            <TableHead className="px-4 py-3 text-white">Status</TableHead>
            <TableHead className="px-4 py-3 text-right text-white">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order._id} className="hover:bg-gray-50">
              <TableCell className="px-4 py-3 font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="px-4 py-3 font-medium">
                {order.transaction.id}
              </TableCell>
              <TableCell className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium">{order.userId?.name}</span>
                  <span className="text-sm text-gray-500">
                    {order.userId?.email}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3">
                <div className="flex flex-col space-y-2">
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center space-x-2"
                    >
                      <div className="relative h-10 w-10">
                        <img
                          src={product.productId?.image}
                          alt={product.productId?.name}
                          className="rounded-md object-cover h-full w-full"
                        />
                      </div>
                      <span>{product.productId?.name}</span>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="px-4 py-3">
                {order.products.reduce(
                  (total, product) => total + product.quantity,
                  0
                )}
              </TableCell>
              <TableCell className="px-4 py-3">
                {formatDate(order.createdAt)}
              </TableCell>
              <TableCell className="px-4 py-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`${getStatusColor(order.status)} capitalize`}
                      disabled={isUpdating[order._id]}
                    >
                      {isUpdating[order._id] ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </span>
                      ) : (
                        <>
                          {order.status}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(order._id, "Pending")}
                    >
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(order._id, "Paid")}
                    >
                      Paid
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(order._id, "Shipped")}
                    >
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(order._id, "Completed")}
                    >
                      Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(order._id, "Cancelled")}
                    >
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell className="px-4 py-3 text-right">
                BDT {order.totalAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageOrderTbl;
