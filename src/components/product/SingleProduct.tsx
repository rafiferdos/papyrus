import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardFooter } from '../ui/card'
import { TProduct } from './AllProducts'
import { ScrollReveal } from '@/components/ScrollReveal'
import toast from 'react-hot-toast'
import { addToCart } from '@/redux/features/products/cart.api'
import { useDispatch } from 'react-redux'
import { ProductCategory } from '@/types/global'
import { motion } from 'motion/react'
import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'

const SingleProduct = ({ product }: { product: TProduct }) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.inStock) {
      toast.error('Product is out of stock')
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

    toast.success(`${product.name} added to cart!`)

    setTimeout(() => {
      setIsAddingToCart(false)
    }, 800)
  }

  return (
    <ScrollReveal direction='fade' delay={0.2}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card
          className='overflow-hidden border-none shadow-md transition-all duration-300 h-full flex flex-col'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            to={`/products/${product._id}`}
            className='flex-1 flex flex-col'
          >
            <div className='relative w-full pt-[100%] overflow-hidden bg-gray-50 dark:bg-gray-900'>
              {!isImageLoaded && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin'></div>
                </div>
              )}
              <motion.img
                src={product.image}
                alt={product.name}
                className='absolute inset-0 w-full h-full object-cover'
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: isImageLoaded ? 1 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='
                  setIsImageLoaded(true)
                }}
              />

              <div className='absolute top-2 right-2 flex flex-col gap-2'>
                <Badge className='bg-white text-gray-800 dark:bg-gray-800 dark:text-white shadow-sm'>
                  {product.brand}
                </Badge>
                {product.inStock ? (
                  <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'>
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant='destructive'>Out of Stock</Badge>
                )}
              </div>
            </div>

            <CardContent className='p-4'>
              <motion.h3
                className='text-lg font-medium mb-1 truncate'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {product.name}
              </motion.h3>

              <motion.p
                className='text-sm text-muted-foreground line-clamp-2 mb-2 h-10'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {product.description}
              </motion.p>

              <motion.div
                className='flex items-baseline gap-2'
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className='text-lg font-bold text-indigo-600'>
                  ${product.price.toFixed(2)}
                </span>
                <span className='text-sm text-muted-foreground line-through'>
                  ${(product.price * 2).toFixed(2)}
                </span>
              </motion.div>
            </CardContent>
          </Link>

          <CardFooter className='p-4 pt-0'>
            <motion.button
              className={`w-full rounded-md py-2 font-medium transition-colors flex items-center justify-center
                ${
                  product.inStock
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isAddingToCart ? (
                <Check className='w-5 h-5 animate-in zoom-in' />
              ) : (
                <>
                  <ShoppingCart className='w-4 h-4 mr-2' />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </>
              )}
            </motion.button>
          </CardFooter>
        </Card>
      </motion.div>
    </ScrollReveal>
  )
}

export default SingleProduct
