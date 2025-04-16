/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import DeleteConfirmationModal from "@/components/ui/core/PModal/DeleteConfirmationModal";
import { PTable } from "@/components/ui/core/PTable";
import { useDeleteProductMutation } from "@/redux/features/products/productApi";
import { TProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface MetaData {
  total: number;
  page: number;
  limit: number;
}

export type TProductsProps = {
  products: TProduct[];
  meta?: MetaData;
};

const ManageProductTbl = ({ products }: TProductsProps) => {
  const [deleteProduct] = useDeleteProductMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: TProduct) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleUpdate = (data: TProduct) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProduct(selectedId).unwrap();

        if (res.data.success) {
          toast.success(res.message || "Product deleted successfully");
          setModalOpen(false);
          // স্টেট রিসেট
          setSelectedId(null);
          setSelectedItem(null);
        } else {
          toast.error(res.data.message || "Failed to delete product");
        }
      }
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(err.data?.message || err.message || "Deletion failed");
    }
  };

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: "slNumber",
      header: () => <div className="">Serial Number</div>,
      cell: ({ row }) => <span className="truncate">{row.index + 1}</span>,
    },
    {
      accessorKey: "img",
      header: () => <div>Image</div>,
      cell: ({ row }) => (
        <div className="inline-block mx-auto">
          <img
            src={row?.original?.image}
            alt={row?.original?.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full text-left"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.name}</span>
      ),
    },
    {
      accessorKey: "quantity",
      header: () => <div>Quantity</div>,
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.quantity}</span>
      ),
    },

    {
      accessorKey: "brand",
      header: () => <div>Brand</div>,
      cell: ({ row }) => (
        <span className="truncate">{row?.original?.brand}</span>
      ),
    },

    {
      accessorKey: "price",
      header: () => <div>Price</div>,
      cell: ({ row }) => (
        <span className="truncate">${row?.original?.price}</span>
      ),
    },

    {
      accessorKey: "isDeleted",
      header: () => <div>Deletion</div>,
      cell: ({ row }) => (
        <div className=" mx-auto inline-block">
          {row?.original?.isDeleted === true ? (
            <p className="text-red-500 border bg-red-100 w-20 text-center px-2 rounded">
              True
            </p>
          ) : (
            <p className="text-green-500 border bg-green-100 w-20 text-center px-2 rounded">
              False
            </p>
          )}
        </div>
      ),
    },

    {
      accessorKey: "action",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-6">
          <button
            onClick={() => handleUpdate(row.original)}
            className="text-emerald-500"
            title="edit listing"
          >
            <Link to={`/dashboard/admin/update-product/${row.original._id}`}>
              <Edit className="w-5 h-5" />
            </Link>
          </button>
          <button
            className="text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash2 className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <DashboardPageTitle title="Mange Products" />
      <p className="my-6 text-xl">Total Products : {products?.length || 0}</p>

      {products.length > 0 ? (
        <PTable data={products} columns={columns} />
      ) : (
        "No Products Available"
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

export default ManageProductTbl;
