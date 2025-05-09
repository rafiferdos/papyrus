import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardFooter } from '../ui/card'
import { TProduct } from './AllProducts'
import { ScrollReveal } from '@/components/ScrollReveal'
import toast from 'react-hot-toast'
import { addToCart } from '@/redux/features/products/cart.api'
import { useDispatch } from 'react-redux'
import { ProductCategory } from '@/types/global'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ShoppingCart, Check, Star, Eye, Clock, Award } from 'lucide-react'

const SingleProduct = ({ product }: { product: TProduct }) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  // Calculate if product is new (less than 7 days old)
  const isNew = () => {
    const createdDate = new Date(product.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - createdDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.inStock) {
      toast.error('Product is out of stock', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      return
    }

    setIsAddingToCart(true)

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        brand: product.brand,
        category: product.category as ProductCategory,
        imageUrl: product.image,
        inStock: product.inStock,
        description: product.description,
      })
    )

    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })

    setTimeout(() => {
      setIsAddingToCart(false)
    }, 800)
  }

  return (
    <ScrollReveal direction='fade' delay={0.2}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="relative"
      >
        <Card
          className='overflow-hidden border-none shadow-md transition-all duration-300 h-full flex flex-col'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setShowQuickView(false)
          }}
        >
          <Link
            to={`/products/${product._id}`}
            className='flex-1 flex flex-col'
          >
            {/* Image container with loading state and hover effect */}
            <div className='relative w-full pt-[100%] overflow-hidden bg-gray-50 dark:bg-gray-800 group'>
              {!isImageLoaded && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <motion.div 
                    className='w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full'
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}
              
              {/* Primary product image with zoom effect on hover */}
              <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isImageLoaded ? 1 : 0 }}
              >
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className='absolute inset-0 w-full h-full object-cover'
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: isImageLoaded ? 1 : 0,
                    scale: isHovered ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='
                    setIsImageLoaded(true)
                  }}
                />
              </motion.div>

              {/* Quick view button overlay */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 flex justify-center p-3 bg-gradient-to-t from-black/70 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="px-4 py-2 bg-white/90 text-gray-900 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickView(true);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={16} />
                  Quick View
                </motion.button>
              </motion.div>

              {/* Product badges */}
              <div className='absolute top-2 left-2 flex flex-col gap-2'>
                {isNew() && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className='bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-none px-2.5 py-1 shadow-md flex items-center gap-1'>
                      <Clock size={12} className="animate-pulse" />
                      New Arrival
                    </Badge>
                  </motion.div>
                )}
                {product.brand === "Premium" && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge className='bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1'>
                      <Award size={12} />
                      Premium
                    </Badge>
                  </motion.div>
                )}
              </div>

              {/* Stock status and brand badges */}
              <div className='absolute top-2 right-2 flex flex-col gap-2'>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className='bg-white text-gray-800 dark:bg-gray-800 dark:text-white shadow-sm border-none'>
                    {product.brand}
                  </Badge>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {product.inStock ? (
                    <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-none'>
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant='destructive' className="border-none">Out of Stock</Badge>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Product details */}
            <CardContent className='p-4 flex-grow'>
              {/* Product rating */}
              <motion.div 
                className="flex items-center gap-1 mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                    strokeWidth={1.5} 
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">4.0</span>
              </motion.div>
              
              {/* Product name */}
              <motion.h3 
                className='text-lg font-medium mb-1 truncate'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {product.name}
              </motion.h3>

              {/* Product description */}
              <motion.p
                className='text-sm text-muted-foreground line-clamp-2 mb-2 min-h-[2.5rem]'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {product.description}
              </motion.p>

              {/* Product price */}
              <motion.div
                className='flex items-baseline gap-2 mt-auto'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className='text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
                  ${product.price.toFixed(2)}
                </span>
                <span className='text-sm text-muted-foreground line-through'>
                  ${(product.price * 2).toFixed(2)}
                </span>
                <span className="ml-auto text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  50% OFF
                </span>
              </motion.div>
            </CardContent>
          </Link>

          {/* Add to cart button */}
          <CardFooter className='p-4 pt-0'>
            <motion.button
              className={`w-full rounded-full py-2.5 font-medium transition-colors flex items-center justify-center
                ${
                  product.inStock
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {isAddingToCart ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className='w-5 h-5' />
                  </motion.div>
                ) : (
                  <motion.div
                    key="cart"
                    className="flex items-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ShoppingCart className='w-4 h-4 mr-2' />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </CardFooter>
        </Card>

        {/* Quick View Modal */}
        <AnimatePresence>
          {showQuickView && (
            <motion.div 
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickView(false)}
            >
              <motion.div 
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Product image */}
                  <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.inStock ? (
                      <Badge className="absolute top-4 right-4 bg-green-100 text-green-800">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="absolute top-4 right-4">Out of Stock</Badge>
                    )}
                  </div>
                  
                  {/* Product details */}
                  <div className="w-full md:w-1/2 p-6">
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <div className="flex items-center gap-1 mt-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">4.0</span>
                    </div>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ${(product.price * 2).toFixed(2)}
                      </span>
                      <span className="ml-auto text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        50% OFF
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                      <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Brand</h4>
                        <p className="text-gray-700 dark:text-gray-300">{product.brand}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
                        <p className="text-gray-700 dark:text-gray-300">{product.category}</p>
                      </div>
                    </div>
                    
                    <button 
                      className={`w-full rounded-full py-3 font-medium transition-all flex items-center justify-center
                        ${
                          product.inStock
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      onClick={handleAddToCart}
                      disabled={!product.inStock || isAddingToCart}
                    >
                      {isAddingToCart ? (
                        <Check className="w-5 h-5 animate-in zoom-in" />
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </>
                      )}
                    </button>
                    
                    <Link 
                      to={`/products/${product._id}`} 
                      className="block text-center mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollReveal>
  )
}

export default SingleProduct