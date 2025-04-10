import AllProducts from "@/components/product/AllProducts";
import { motion } from "framer-motion";

const AllProductsPage = () => {
  return (
    <div className="space-y-8 my-8 md:my-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className=" text-3xl text-center md:text-4xl">
          <span className="font-bold">Our</span>{" "}
          <span className="font-thin">Products</span>
        </h1>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AllProducts />
      </motion.section>

      <style>{`
        .font-thin {
          font-family: 'Thin', cursive;
        }
      `}</style>
    </div>
  );
};

export default AllProductsPage;
