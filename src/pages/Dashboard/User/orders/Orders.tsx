import { usersData } from "@/components/dashboard/user/userData";
// import DeleteConfirmationModal from "@/components/ui/core/PModal/DeleteConfirmationModal";
import { PTable } from "@/components/ui/core/PTable";
import { TUser } from "@/types";

import { ColumnDef } from "@tanstack/react-table";

// import { useState } from "react";

// import { toast } from "sonner";

const Orders = () => {
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [selectedId, setSelectedId] = useState<string | null>(null);
  // const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // const handleDelete = (data: TUser) => {
  //   setSelectedId(data?._id);
  //   setSelectedItem(data?.name);
  //   setModalOpen(true);
  // };

  // const handleUpdate = (data: TUser) => {
  //   setSelectedId(data?._id);
  //   setSelectedItem(data?.name);
  // };

  // const handleDeleteConfirm = async () => {
  //   try {
  //     if (selectedId) {
  //       const res = await deleteListing(selectedId);
  //       if (res.status) {
  //         toast.success(res.message);
  //         setModalOpen(false);
  //       } else {
  //         toast.error(res.message);
  //       }
  //     }
  //     console.log(selectedId);
  //   } catch (err: any) {
  //     console.error(err?.message);
  //   }
  // };

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "slNumber",
      header: () => <div className="">Serial Number</div>,
      cell: ({ row }) => <span className="truncate">{row.index + 1}</span>,
    },
    {
      accessorKey: "img",
      header: () => <div>Image</div>,
      cell: ({ row }) => (
        <div>
          <img
            src={row?.original?.images}
            alt={row?.original?.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
        </div>
      ),
    },
    {
      accessorKey: "items",
      header: () => <div>Items</div>,
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.availability}</span>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div>Payment</div>,
      cell: ({ row }) => (
        <div>
          {row?.original?.status === "available" ? (
            <p className="text-green-500 border bg-green-100 w-20 text-center px-2 rounded">
              {row?.original?.status}
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              {row?.original?.status}
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div>Total</div>,
      cell: ({ row }) => (
        <span className="truncate">${row?.original?.price}</span>
      ),
    },
    // {
    //   accessorKey: "action",
    //   header: () => <div className="text-center">Action</div>,
    //   cell: ({ row }) => (
    //     <div className="flex justify-center items-center gap-6">
    //       <button
    //         onClick={() => handleUpdate(row.original)}
    //         className="text-emerald-500"
    //         title="edit listing"
    //       >
    //         <Link to={`/user/listings/${row.original._id}`}>
    //           <Edit className="w-5 h-5" />
    //         </Link>
    //       </button>
    //       <button
    //         className="text-red-500"
    //         title="Delete"
    //         onClick={() => handleDelete(row.original)}
    //       >
    //         <Trash2 className="w-5 h-5 cursor-pointer" />
    //       </button>
    //     </div>
    //   ),
    // },
  ];
  return (
    <>
      <p className="my-6 text-xl">Total Orders : 09</p>

      {/* {listings.length > 0 ? (
            <TthTable data={listings} columns={columns} />
          ) : (
            "No Listings Available"
          )} */}
      {<PTable data={usersData} columns={columns} />}
      {/* <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      /> */}
    </>
  );
};

export default Orders;
