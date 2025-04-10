import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import AddProductForm from "@/components/dashboard/product/AddProductForm";

const AddProduct = () => {
  return (
    <div>
      <DashboardPageTitle title="Add Product" />
      {/* Add Product Form */}
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
