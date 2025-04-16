import ManageProductTbl from "@/components/dashboard/product/ManageProductTbl";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGetAllProductDataQuery } from '@/redux/features/products/productApi'

const ManageProducts = () => {
  const { data: response, isLoading, error } = useGetAllProductDataQuery([]);

  if (isLoading) return <TextShimmer>Loading...</TextShimmer>;

  if (error) return <div>Error loading products</div>;

  if (!response?.success)
    return <div>{response?.message || "Failed to load products"}</div>;

  const products = response.data.result;

  const meta = response.data.meta;

  return (
    <>
      <ManageProductTbl products={products} meta={meta} />
    </>
  );
};

export default ManageProducts;
