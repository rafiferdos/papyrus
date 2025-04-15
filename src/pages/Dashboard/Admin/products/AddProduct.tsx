import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import AddProductForm from "@/components/dashboard/product/AddProductForm";

const AddProduct = () => {
  return (
    <>
      <DashboardPageTitle title="Add Product" />
      {/* Add Product Form */}
      <AddProductForm />
    </>
  );
};

export default AddProduct;
