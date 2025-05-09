import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, Clock, Tag, ShoppingBag } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

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
  const { _id, name, price, image, quantity, brand, createdAt } = product;
  const isInStock = quantity > 0;
  const discountPrice = +(product?.price * 2).toFixed(2);
  const discountPercentage = Math.round(((discountPrice - price) / discountPrice) * 100);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  // Check if product is new (less than 7 days old)
  const now = new Date().getTime();
  const createdDiff = now - new Date(createdAt).getTime();
  const isNew = createdDiff < 7 * 24 * 60 * 60 * 1000;

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
          className="mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden h-full flex flex-col relative border border-transparent hover:border-primary/20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setShowQuickView(false);
          }}
        >
          {/* Product Image */}
          <div className="relative overflow-hidden">
            {/* Loading Spinner */}
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <motion.div 
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
            
            {/* Product Image with Zoom Effect */}
            <div className="overflow-hidden aspect-[4/3]">
              <motion.img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: isImageLoaded ? 1 : 0,
                  scale: isHovered ? 1.08 : 1
                }}
                transition={{ duration: 0.4 }}
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src = 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=';
                  setIsImageLoaded(true);
                }}
              />
            </div>
            
            {/* Quick View Overlay */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  setShowQuickView(true);
                }}
                className="px-3 py-1.5 bg-white/90 text-gray-900 dark:bg-gray-800/90 dark:text-white rounded-full text-xs font-medium flex items-center gap-1.5 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={14} />
                Quick View
              </motion.button>
            </motion.div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isNew && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 border-none text-white px-2.5 py-1 flex items-center gap-1 shadow-md">
                    <Clock size={12} className="animate-pulse" />
                    <span>New Arrival</span>
                  </Badge>
                </motion.div>
              )}
              
              {discountPercentage >= 40 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-rose-500 text-white border-none flex items-center gap-1">
                    <Tag size={12} />
                    <span>{discountPercentage}% OFF</span>
                  </Badge>
                </motion.div>
              )}
            </div>
            
            {/* Stock Badge */}
            <div className="absolute top-3 right-3">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className={cn(
                  "border-none",
                  isInStock 
                    ? "bg-emerald-500 text-white" 
                    : "bg-red-500 text-white"
                )}>
                  {isInStock ? `${quantity} in stock` : "Out of Stock"}
                </Badge>
              </motion.div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Brand */}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary w-fit mb-2"
            >
              {brand}
            </motion.span>
            
            {/* Product Name */}
            <motion.h3 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[2.5rem] text-lg"
            >
              {name}
            </motion.h3>

            {/* Price */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-baseline gap-2 mt-auto"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                ${price.toFixed(2)}
              </span>
              <span className="text-sm line-through text-gray-400">
                ${discountPrice}
              </span>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <Button 
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white transition-colors"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span>View Details</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-1"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
          
          {/* Premium Badge */}
          {brand === "Premium" && (
            <div className="absolute -rotate-45 -left-12 top-6 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold px-10 py-1 shadow-lg">
              PREMIUM
            </div>
          )}
        </motion.div>
      </Link>
      
      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <motion.div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuickView(false)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative">
                <img 
                  src={image} 
                  alt={name}
                  className="w-full aspect-video object-cover"
                />
                <button 
                  onClick={() => setShowQuickView(false)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
                
                {isNew && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 border-none text-white px-3 py-1 flex items-center gap-1 shadow-md">
                      <Clock size={12} className="animate-pulse" />
                      <span>New Arrival</span>
                    </Badge>
                  </div>
                )}

                {!isInStock && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center">
                    <Badge className="bg-red-500 text-white border-none px-4 py-2 text-sm">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/10 text-primary border-none">
                    {brand}
                  </Badge>
                  
                  {discountPercentage >= 40 && (
                    <Badge className="bg-rose-500 text-white border-none flex items-center gap-1">
                      <Tag size={12} />
                      <span>{discountPercentage}% OFF</span>
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {name}
                </h3>
                
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-base line-through text-gray-400">
                    ${discountPrice}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex flex-col bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="text-gray-500 dark:text-gray-400 text-xs mb-1">Status</span>
                    <span className={cn(
                      "font-medium",
                      isInStock ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {isInStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  
                  <div className="flex flex-col bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="text-gray-500 dark:text-gray-400 text-xs mb-1">Quantity</span>
                    <span className="font-medium">{quantity} units</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-2.5"
                  asChild
                  disabled={!isInStock}
                >
                  <Link to={`/products/${_id}`}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    {isInStock ? "View Details" : "Out of Stock"}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;