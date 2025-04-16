/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";

import { PTable } from "@/components/ui/core/PTable";
import { TUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { StatusConfirmationModal } from "./StatusConfirmationModal";
import { toast } from "sonner";

type TUserProps = {
  users: {
    data: TUser[];
  };
  refetch: () => void; // Add refetch function prop
};
const ManageUser = ({ users, refetch }: TUserProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"deactivate" | "reactivate">(
    "deactivate"
  );
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }
  const handleStatusChange = (
    data: TUser,
    type: "deactivate" | "reactivate"
  ) => {
    setSelectedId(data._id);
    setSelectedItem(data.name);
    setActionType(type);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      if (selectedId) {
        const res = await fetch(
          `https://papyrus-server-lovat.vercel.app/api/admin/user/${selectedId}/deactivate`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ active: actionType === "reactivate" }),
          }
        );

        const data = await res.json();

        if (data.success) {
          toast.success(
            `${data.data.name} ${
              actionType === "deactivate" ? "deactivated" : "reactivated"
            } successfully`
          );

          // Trigger data refetch
          refetch();
        } else {
          toast.error(data.message || "Operation failed");
        }

        setModalOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "slNumber",
      header: () => <div className="">Serial Number</div>,
      cell: ({ row }) => <span className="truncate">{row.index + 1}</span>,
    },

    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.name}</span>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div>Email</div>,
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.email}</span>
      ),
    },

    {
      accessorKey: "role",
      header: () => <div className="text-center">Role</div>,
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.role}</span>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Deactive/Active</div>,
      cell: ({ row }) => (
        <span
          className={`truncate ${
            row?.original?.isDeactivate ? "text-rose-500" : "text-green-500"
          }`}
        >
          {row?.original?.isDeactivate ? "Deactive" : "Active"}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div
          className={`${
            row.original.isDeactivate
              ? " hover:bg-green-200 cursor-pointer text-green-500 border bg-green-100 w-20 text-center px-2 rounded"
              : " hover:bg-red-200 cursor-pointer text-red-500 border bg-red-100 w-20 text-center px-2 rounded"
          } mx-auto`}
          title={
            row.original.isDeactivate === true ? "Reactivate" : "Deactivate"
          }
          onClick={() =>
            handleStatusChange(
              row.original,
              row.original.isDeactivate ? "reactivate" : "deactivate"
            )
          }
        >
          {row.original.isDeactivate ? "Reactivate" : "Deactivate"}
        </div>
      ),
    },
  ];
  return (
    <>
      <DashboardPageTitle title="Mange User" />
      <p className="my-6 text-xl">Total User : {users?.data?.length | 0}</p>

      {users?.data?.length > 0 ? (
        <PTable data={users?.data} columns={columns} />
      ) : (
        "No Users Available"
      )}

      <StatusConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleConfirm}
        actionText={
          actionType === "deactivate"
            ? `Are you sure you want to deactivate this ? user`
            : "Are you sure you want to reactivate this user?"
        }
        confirmButtonText={
          actionType === "deactivate" ? "Deactivate" : "Reactivate"
        }
      />
    </>
  );
};

export default ManageUser;
