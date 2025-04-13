/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import DeleteConfirmationModal from "@/components/ui/core/PModal/DeleteConfirmationModal";
import { PTable } from "@/components/ui/core/PTable";
import { TUser } from "@/types";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

// import { toast } from "sonner";

const ManageUser = ({ users }: { users: TUser[] }) => {
  console.log(users);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: TUser) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleUpdate = (data: TUser) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
  };

  const handleDeleteConfirm = async () => {
    try {
      // if (selectedId) {
      //   const res = await deleteListing(selectedId);
      //   if (res.status) {
      //     toast.success(res.message);
      //     setModalOpen(false);
      //   } else {
      //     toast.error(res.message);
      //   }
      // }
      console.log(selectedId);
    } catch (err: any) {
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
        <button
          onClick={() => handleUpdate(row.original)}
          className="text-emerald-500"
          title="edit listing"
        >
          <Link to={`/user/listings/${row.original._id}`}>
            <Edit className="w-5 h-5" />
          </Link>
        </button>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash2 className="w-5 h-5 cursor-pointer" />
        </button>
      ),
    },
  ];
  return (
    <>
      <DashboardPageTitle title="Mange User" />
      <p className="my-6 text-xl">Total User : {users?.data?.length}</p>

      {users?.data?.length > 0 ? (
        <PTable data={users?.data} columns={columns} />
      ) : (
        "No Users Available"
      )}

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default ManageUser;
