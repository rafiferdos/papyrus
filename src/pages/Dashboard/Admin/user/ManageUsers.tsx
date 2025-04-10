// /* eslint-disable @typescript-eslint/no-explicit-any */
// import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
// import DeleteConfirmationModal from "@/components/ui/core/PModal/DeleteConfirmationModal";
// import { PTable } from "@/components/ui/core/PTable";
// import { TUser } from "@/types";

// import { ColumnDef } from "@tanstack/react-table";
// import { Edit, Trash2 } from "lucide-react";

// import { useState } from "react";
// import { Link } from "react-router-dom";
// // import { toast } from "sonner";

// // export type TUserProps = {
// //   users: TUser[];
// // };

// // const usersData: TUserProps = [
// //   {
// //     _id: "67f6ad27170589c594e86054",
// //     name: "Nahid",
// //     email: "nahid@gmail.com",
// //     role: "user",
// //     isDeactivate: false,
// //     phone: "N/A",
// //     address: "N/A",
// //     city: "N/A",
// //     createdAt: "2025-04-09T17:23:51.227Z",
// //     updatedAt: "2025-04-09T17:23:51.227Z",
// //     __v: 0,
// //   },
// //   {
// //     _id: "67f6ad37170589c594e86056",
// //     name: "Admin",
// //     email: "admin@gmail.com",
// //     role: "admin",
// //     isDeactivate: false,
// //     phone: "N/A",
// //     address: "N/A",
// //     city: "N/A",
// //     createdAt: "2025-04-09T17:24:07.606Z",
// //     updatedAt: "2025-04-09T17:24:07.606Z",
// //     __v: 0,
// //   },
// //   {
// //     _id: "67f6afc2170589c594e86068",
// //     name: "User",
// //     email: "user@gmail.com",
// //     role: "user",
// //     isDeactivate: false,
// //     phone: "N/A",
// //     address: "N/A",
// //     city: "N/A",
// //     createdAt: "2025-04-09T17:34:58.589Z",
// //     updatedAt: "2025-04-09T17:34:58.589Z",
// //     __v: 0,
// //   },
// //   {
// //     _id: "67f6bc751293a0ad0edb70d9",
// //     name: "Test",
// //     email: "test@gmail.com",
// //     role: "user",
// //     isDeactivate: false,
// //     phone: "N/A",
// //     address: "N/A",
// //     city: "N/A",
// //     createdAt: "2025-04-09T18:29:09.887Z",
// //     updatedAt: "2025-04-09T18:29:09.887Z",
// //     __v: 0,
// //   },
// // ];

// const ManageUsers = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [selectedItem, setSelectedItem] = useState<string | null>(null);

//   const handleDelete = (data: TUser) => {
//     setSelectedId(data?._id);
//     setSelectedItem(data?.name);
//     setModalOpen(true);
//   };

//   const handleUpdate = (data: TUser) => {
//     setSelectedId(data?._id);
//     setSelectedItem(data?.name);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       // if (selectedId) {
//       //   const res = await deleteListing(selectedId);
//       //   if (res.status) {
//       //     toast.success(res.message);
//       //     setModalOpen(false);
//       //   } else {
//       //     toast.error(res.message);
//       //   }
//       // }
//       console.log(selectedId);
//     } catch (err: any) {
//       console.error(err?.message);
//     }
//   };

//   const columns: ColumnDef<TUser>[] = [
//     {
//       accessorKey: "slNumber",
//       header: () => <div className="">Serial Number</div>,
//       cell: ({ row }) => <span className="truncate">{row.index + 1}</span>,
//     },

//     {
//       accessorKey: "name",
//       header: () => <div>Name</div>,
//       cell: ({ row }) => (
//         <span className="truncate">{row?.original?.name}</span>
//       ),
//     },
//     {
//       accessorKey: "email",
//       header: () => <div>Email</div>,
//       cell: ({ row }) => (
//         <span className="truncate">{row?.original?.email}</span>
//       ),
//     },

//     {
//       accessorKey: "role",
//       header: () => <div className="text-center">Role</div>,
//       cell: ({ row }) => (
//         <button
//           onClick={() => handleUpdate(row.original)}
//           className="text-emerald-500"
//           title="edit listing"
//         >
//           <Link to={`/user/listings/${row.original._id}`}>
//             <Edit className="w-5 h-5" />
//           </Link>
//         </button>
//       ),
//     },
//     {
//       accessorKey: "action",
//       header: () => <div className="text-center">Action</div>,
//       cell: ({ row }) => (
//         <button
//           className="text-red-500"
//           title="Delete"
//           onClick={() => handleDelete(row.original)}
//         >
//           <Trash2 className="w-5 h-5 cursor-pointer" />
//         </button>
//       ),
//     },
//   ];
//   return (
//     <div>
//       <DashboardPageTitle title="Mange User" />
//       <p className="my-6 text-xl">Total User : 09</p>

//       {/* {listings.length > 0 ? (
//         <TthTable data={listings} columns={columns} />
//       ) : (
//         "No Listings Available"
//       )} */}
//       {<PTable data={user} columns={columns} />}
//       <DeleteConfirmationModal
//         name={selectedItem}
//         isOpen={isModalOpen}
//         onOpenChange={setModalOpen}
//         onConfirm={handleDeleteConfirm}
//       />
//     </div>
//   );
// };

// export default ManageUsers;

import ManageUser from "@/components/dashboard/user/ManageUser";
import { usersData } from "@/components/dashboard/user/userData";
import { TUser } from "@/types";

const ManageUsers = () => {
  return (
    <div>
      {usersData?.map((user: TUser) => (
        <ManageUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default ManageUsers;
