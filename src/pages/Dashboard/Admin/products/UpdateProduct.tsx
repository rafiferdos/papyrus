import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import UpdateProductForm from "@/components/dashboard/product/updateProductForm";

const UpdateProduct = () => {
  return (
    <>
      <DashboardPageTitle title="Product Update" />
      {/* update Product Form */}
      <UpdateProductForm />
    </>
  );
};

export default UpdateProduct;
