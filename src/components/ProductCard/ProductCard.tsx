import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag, ShoppingBag } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { ProductCategory } from "@/types/global";
import { addToCart } from "@/redux/features/products/cart.api";
import toast from "react-hot-toast";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  inStock?: boolean;
  category?: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { _id, name, price, image, quantity, brand, createdAt, description = "Premium quality product for your daily needs." } = product;
  const isInStock = product.inStock ?? quantity > 0;
  const category = product.category || "General";
  const discountPrice = +(product?.price * 2).toFixed(2);
  const discountPercentage = Math.round(((discountPrice - price) / discountPrice) * 100);
  
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if product is new (less than 7 days old)
  const now = new Date().getTime();
  const createdDiff = now - new Date(createdAt).getTime();
  const isNew = createdDiff < 7 * 24 * 60 * 60 * 1000;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInStock) {
      toast.error('Product is out of stock', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    setIsAddingToCart(true);

    dispatch(
      addToCart({
        _id: _id,
        name: name,
        price: price,
        quantity: 1,
        brand: brand,
        category: category as ProductCategory,
        imageUrl: image,
        inStock: isInStock,
        description: description,
      })
    );

    toast.success(`${name} added to cart!`, {
      icon: '🛍️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 800);
  };

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
          onMouseLeave={() => setIsHovered(false)}
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
            
            {/* Add To Cart Button Overlay */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={handleAddToCart}
                disabled={!isInStock || isAddingToCart}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors",
                  isInStock 
                    ? "bg-white/90 text-gray-900 hover:bg-white dark:bg-indigo-600/90 dark:text-white dark:hover:bg-indigo-600" 
                    : "bg-gray-400/90 text-white cursor-not-allowed"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAddingToCart ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : (
                  <ShoppingBag size={14} />
                )}
                {isInStock ? (isAddingToCart ? "Adding..." : "Add to Cart") : "Out of Stock"}
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
            
            {/* Product Description */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 min-h-[2.5rem]"
            >
              {description}
            </motion.p>

            {/* Price */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.35 }}
              className="mt-4"
            >
              <Button 
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white transition-colors"
              >
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
    </motion.div>
  );
};

export default ProductCard;