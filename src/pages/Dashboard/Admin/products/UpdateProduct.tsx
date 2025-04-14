import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import UpdateProductForm from "@/components/dashboard/product/UpdateProductForm";
import { useLoaderData } from "react-router-dom";

const UpdateProduct = () => {
  const { data: singleProduct } = useLoaderData();

  return (
    <>
      <DashboardPageTitle title="Product Update" />
      {/* update Product Form */}
      <UpdateProductForm singleProduct={singleProduct} />
    </>
  );
};

export default UpdateProduct;
