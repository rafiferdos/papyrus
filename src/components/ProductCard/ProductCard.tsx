import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: string;
  createdAt: string;
  updatedAt: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { _id, name, price, image, quantity, brand, createdAt, updatedAt } = product;
  const isInStock = quantity > 0;
  const discountPrice = +(product?.price * 2).toFixed(2);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if product is new (less than 24 hours old)
  const now = new Date().getTime();
  const createdDiff = now - new Date(createdAt).getTime();
  const updatedDiff = now - new Date(updatedAt).getTime();
  const isNew = createdDiff < 24 * 60 * 60 * 1000 && updatedDiff < 24 * 60 * 60 * 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link to={`/products/${_id}`} className="block h-full">
        <motion.div 
          className="mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden h-full flex flex-col"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <motion.div 
              className="overflow-hidden aspect-[4/3]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isImageLoaded ? 1 : 0 }}
            >
              <motion.img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.4 }}
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src = 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=';
                  setIsImageLoaded(true);
                }}
              />
            </motion.div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isNew && (
                <motion.span 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm"
                >
                  New
                </motion.span>
              )}
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                {brand}
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  isInStock
                    ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                    : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                }`}
              >
                {isInStock ? "In Stock" : "Out of Stock"}
              </motion.span>
            </div>

            <motion.h3 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2 flex-1"
            >
              {name}
            </motion.h3>

            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-baseline gap-2 mt-2"
            >
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                ${price.toFixed(2)}
              </span>
              <span className="text-sm line-through text-gray-400">
                ${discountPrice}
              </span>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <Button 
                variant="outline" 
                className="w-full group border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
              >
                <span>View Details</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;