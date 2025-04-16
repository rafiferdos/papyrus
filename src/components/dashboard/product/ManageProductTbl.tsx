/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardPageTitle from '@/components/dashboard/DashboardPageTitle'
import DeleteConfirmationModal from '@/components/ui/core/PModal/DeleteConfirmationModal'
import { PTable } from '@/components/ui/core/PTable'
import { useDeleteProductMutation } from '@/redux/features/products/productApi'
import { TProduct } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Edit, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { motion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface MetaData {
  total: number
  page: number
  limit: number
}

export type TProductsProps = {
  products: TProduct[]
  meta?: MetaData
}

const ManageProductTbl = ({ products }: TProductsProps) => {
  const [deleteProduct] = useDeleteProductMutation()
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products

  const handleDelete = (data: TProduct) => {
    setSelectedId(data?._id)
    setSelectedItem(data?.name)
    setModalOpen(true)
  }

  const handleUpdate = (data: TProduct) => {
    setSelectedId(data?._id)
    setSelectedItem(data?.name)
  }

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProduct(selectedId).unwrap()

        if (res.data.success) {
          toast.success(res.message || 'Product deleted successfully')
          setModalOpen(false)
          // Reset state
          setSelectedId(null)
          setSelectedItem(null)
        } else {
          toast.error(res.data.message || 'Failed to delete product')
        }
      }
    } catch (err: any) {
      console.error('Delete error:', err)
      toast.error(err.data?.message || err.message || 'Deletion failed')
    }
  }

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: 'slNumber',
      header: () => (
        <div className='text-gray-600 dark:text-gray-200 font-medium'>No.</div>
      ),
      cell: ({ row }) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='font-medium text-gray-500 dark:text-gray-200'
        >
          {row.index + 1}
        </motion.span>
      ),
    },
    {
      accessorKey: 'img',
      header: () => (
        <div className='text-gray-600 dark:text-gray-200 font-medium'>
          Image
        </div>
      ),
      cell: ({ row }) => (
        <div className='flex justify-center'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-50'
          >
            <img
              src={row?.original?.image}
              alt={row?.original?.name}
              className='w-full h-full object-cover'
              onError={(e) => {
                e.currentTarget.src =
                  'https://via.placeholder.com/40?text=No+Image'
              }}
            />
          </motion.div>
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: () => (
        <div className='text-gray-600 dark:text-gray-200 font-medium'>Name</div>
      ),
      cell: ({ row }) => (
        <motion.div
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className='max-w-[180px] truncate font-medium'
        >
          {row?.original?.name}
        </motion.div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: () => (
        <div className='text-gray-600 dark:text-gray-200 font-medium'>
          Quantity
        </div>
      ),
      cell: ({ row }) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center'
        >
          <Badge
            variant={row?.original?.quantity > 0 ? 'outline' : 'destructive'}
            className='font-mono'
          >
            {row?.original?.quantity}
          </Badge>
        </motion.div>
      ),
    },
    {
      accessorKey: 'brand',
      header: () => (
        <div className='text-gray-600 dark:text-gray-200 font-medium'>
          Brand
        </div>
      ),
      cell: ({ row }) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-gray-600 dark:text-gray-200'
        >
          {row?.original?.brand}
        </motion.span>
      ),
    },
    {
      accessorKey: 'price',
      header: () => (
        <div className='text-gray-600 dark:text-gray-200 font-medium'>
          Price
        </div>
      ),
      cell: ({ row }) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='font-medium text-indigo-600'
        >
          ${row?.original?.price.toFixed(2)}
        </motion.span>
      ),
    },
    {
      accessorKey: 'isDeleted',
      header: () => (
        <div className='text-gray-600 dark:text-gray-200 font-medium'>
          Status
        </div>
      ),
      cell: ({ row }) => (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className='flex justify-center'
        >
          {row?.original?.isDeleted === true ? (
            <Badge variant='destructive' className='px-2 py-0.5'>
              Removed
            </Badge>
          ) : (
            <Badge
              variant='outline'
              className='bg-green-50 text-green-700 border-green-200 px-2 py-0.5'
            >
              Active
            </Badge>
          )}
        </motion.div>
      ),
    },
    {
      accessorKey: 'action',
      header: () => (
        <div className='text-gray-600 dark:text-gray-200 font-medium text-center'>
          Action
        </div>
      ),
      cell: ({ row }) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className='flex justify-center items-center gap-3'
        >
          <Link
            to={`/dashboard/admin/update-product/${row.original._id}`}
            className='p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors'
            title='Edit product'
          >
            <Edit className='w-4 h-4' />
          </Link>
          <motion.button
            className='p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors'
            title='Delete product'
            onClick={() => handleDelete(row.original)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className='w-4 h-4 cursor-pointer' />
          </motion.button>
        </motion.div>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='space-y-6'
    >
      <DashboardPageTitle title='Manage Products' />

      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-lg font-medium'
        >
          Total Products:{' '}
          <span className='font-bold text-indigo-600'>
            {products?.length || 0}
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='relative max-w-xs'
        >
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-200' />
          <Input
            placeholder='Search products...'
            className='pl-8 h-9 focus-visible:ring-indigo-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </div>

      {filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='rounded-lg overflow-hidden border border-gray-200 shadow-sm'
        >
          <PTable data={filteredProducts} columns={columns} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300'
        >
          <p className='text-gray-500 dark:text-gray-200'>No products found</p>
          {searchTerm && (
            <p className='text-sm text-gray-400 dark:text-gray-200 mt-1'>
              Try using different search terms
            </p>
          )}
        </motion.div>
      )}

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  )
}

export default ManageProductTbl
