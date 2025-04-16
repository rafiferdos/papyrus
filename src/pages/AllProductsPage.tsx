import AllProducts from "@/components/product/AllProducts";
import { motion } from "framer-motion";

const AllProductsPage = () => {
  return (
    <div className="space-y-8 my-8 md:my-16 pt-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className=" text-3xl text-center md:text-4xl">
          <span className="font-bold">Our</span>{" "}
          <span className="font-charm">Products</span>
        </h1>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AllProducts />
      </motion.section>


    </div>
  );
};

export default AllProductsPage;
