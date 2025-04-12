import { useGetOneProductDataQuery } from '@/redux/features/products/productApi'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/features/products/cart.api'
import { Check, ShoppingCart, AlertTriangle, X } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { TextShimmer } from '@/components/ui/text-shimmer'

const SingleProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()

  const {
    data: response,
    isLoading,
    isError,
  } = useGetOneProductDataQuery(productId)
  const product = response?.data
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)

  const dicountPrice = +(product?.price * 2).toFixed(2)

  if (isError) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <AlertTriangle className='h-16 w-16 text-red-500 mx-auto mb-4' />
          <h2 className='text-4xl font-semibold text-gray-800 mb-2'>
            Error Loading Product
          </h2>
          <p className='text-lg text-gray-600'>Please try again later.</p>
        </motion.div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <TextShimmer className='text-xl font-medium' duration={1}>
          Loading product details...
        </TextShimmer>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <AlertTriangle className='h-16 w-16 text-red-500 mx-auto mb-4' />
          <h2 className='text-3xl font-semibold text-gray-800 mb-2'>
            Product Not Found
          </h2>
          <p className='text-lg text-gray-600'>
            The product doesn't exist or has been removed.
          </p>
        </motion.div>
      </div>
    )
  }

  // const handleAddToCart = () => {
  //   dispatch(addToCart({ ...product, quantity }))
  //   toast.success(`${product.name} added to cart - ${quantity} item(s) added`)
  // }

  const handleAddToCart = () => {
    // Log before adding to cart
    console.log(
      'Before adding to cart, current localStorage:',
      localStorage.getItem('cart')
    )

    // Ensure the property names exactly match what TOrderProduct expects
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      imageUrl: product.image, // Make sure this matches your TOrderProduct interface
      description: product.description,
      quantity: quantity,
      inStock: product.inStock,
    }

    console.log('Adding item to cart:', cartItem)

    // Dispatch with the proper cart item format
    dispatch(addToCart(cartItem))

    // Try manually saving to localStorage as fallback
    try {
      // Get current cart or initialize empty array
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')

      // Check if item already exists
      // Define interface for cart item
      interface CartItem {
        _id: string
        name: string
        price: number
        brand: string
        category: string
        imageUrl: string
        description: string
        quantity: number
        inStock: boolean
      }

      const existingItemIndex = currentCart.findIndex(
        (item: CartItem) => item._id === cartItem._id
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        currentCart[existingItemIndex].quantity += cartItem.quantity
      } else {
        // Add new item
        currentCart.push(cartItem)
      }

      // Save back to localStorage
      localStorage.setItem('cart', JSON.stringify(currentCart))

      console.log('Manually saved cart to localStorage')
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }

    // Log after adding to cart
    setTimeout(() => {
      console.log(
        'After adding to cart (with delay), localStorage:',
        localStorage.getItem('cart')
      )
    }, 100)

    toast.success(`${product.name} added to cart - ${quantity} item(s) added`)
  }

  return (
    <div className='container mx-auto py-8 md:py-16 mt-20'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16'>
        <ScrollReveal direction='left' delay={0.2} distance={50}>
          <motion.div
            className='rounded-lg overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all relative aspect-square'
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {!imageLoaded && (
              <div className='absolute inset-0 flex items-center justify-center bg-muted/20'>
                <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-full object-cover hover:scale-105 transition-transform'
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src =
                  'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='
                setImageLoaded(true)
              }}
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal direction='right' delay={0.2} distance={50}>
          <motion.div
            className='flex flex-col space-y-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex items-center justify-between gap-4'>
              <h1 className='text-4xl font-medium  '>{product.name}</h1>
              <Badge variant='secondary' className='text-md'>
                {product.brand}
              </Badge>
              <style>{`
        .font-thin {
          font-family: 'Thin', cursive;
        }
      `}</style>
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <Badge
                variant={product.inStock ? 'outline' : 'destructive'}
                className='text-sm'
              >
                {product.inStock ? (
                  <span className='flex items-center gap-1 text-green-500'>
                    <Check className='h-4 w-4' /> In Stock
                  </span>
                ) : (
                  <span className='flex items-center gap-1 text-white'>
                    <X className='h-4 w-4' />
                    Out of Stock
                  </span>
                )}
              </Badge>
              <Badge className='text-sm'>{product.category}</Badge>
            </div>

            {/* <div className="text-4xl font-semibold flex items-center gap-1 text-gray-200">
              ৳<TextScramble>{product.price.toString()}</TextScramble>
            </div> */}

            <div className='flex items-center justify-between mt-2'>
              <div className='text-2xl font-bold'>
                <div className='flex flex-col sm:flex-row gap-1 sm:items-center'>
                  <span className='text-pink-600'>
                    ${product?.price.toFixed(2)}
                  </span>
                  <span className='text-sm line-through text-gray-400'>
                    ${dicountPrice}
                  </span>
                </div>
              </div>
            </div>

            <p className='text-lg text-gray-400 leading-relaxed'>
              {product.description}
            </p>
            <Separator />
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='text-sm font-medium'>Quantity:</span>
                <div className='flex items-center'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 rounded-r-none cursor-pointer'
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <div className='h-8 px-4 flex items-center justify-center border-y'>
                    {quantity}
                  </div>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 rounded-l-none cursor-pointer'
                    onClick={() =>
                      quantity < product.quantity && setQuantity(quantity + 1)
                    }
                    disabled={quantity >= product.quantity}
                  >
                    +
                  </Button>
                </div>
                <span className='text-xs text-muted-foreground'>
                  {product.quantity} units available
                </span>
              </div>

              <Button
                size='lg'
                className=' px-4 py-2 '
                variant='primary'
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className='mr-2 h-5 w-5' />
                Add to Cart
              </Button>
            </div>

            <Separator />

            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <h3 className='font-medium '>Product Details</h3>
                <ul className='mt-2 space-y-1 text-muted-foreground'>
                  <li>
                    <span className='font-medium'>Brand:</span> {product.brand}
                  </li>
                  <li>
                    <span className='font-medium'>Category:</span>{' '}
                    {product.category}
                  </li>
                  <li>
                    <span className='font-medium'>Stock:</span>{' '}
                    {product.quantity} units
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='font-medium '>Shipping & Returns</h3>
                <ul className='mt-2 space-y-1 text-muted-foreground'>
                  <li>Free shipping on orders over ৳1000</li>
                  <li>30-day return policy</li>
                  <li>Satisfaction guaranteed</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default SingleProduct
