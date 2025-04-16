import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  removeFromCart,
  updateQuantity,
} from '@/redux/features/products/cart.api'
import { RootState } from '@/redux/store'
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useGetMultipleProductsQuery } from '@/redux/features/products/productApi'
import { useEffect, useState, useMemo } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useCurrentUser } from '@/redux/features/auth/authSlice'

export default function ShoppingCart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products = [], userId } = useSelector(
    (state: RootState) => state.cart
  )
  const currentUser = useAppSelector(useCurrentUser)
  const [isApiCallMade, setIsApiCallMade] = useState(false)

  // Debug logging to check cart state and localStorage
  useEffect(() => {
    console.log('Cart state from Redux:', { products, userId })
    const localCart = JSON.parse(localStorage.getItem('cart') || '{}')
    console.log('localStorage cart:', localCart)
    console.log('Current user:', currentUser)
  }, [products, userId, currentUser])

  // Get product IDs from cart - ensure we have a clean array of just IDs
  const productIds = products.map((item) => item.productId).filter(Boolean)

  // Debug productIds before API call
  useEffect(() => {
    console.log('Product IDs being sent to API:', productIds)
    if (productIds.length > 0) {
      setIsApiCallMade(true)
    }
  }, [productIds])

  // Fetch product details with improved error handling
  const {
    data: productDetails,
    isLoading,
    isError,
    error,
  } = useGetMultipleProductsQuery(productIds, {
    skip: productIds.length === 0,
  })

  // Debug API response
  useEffect(() => {
    console.log('Product details from API:', productDetails)
    if (isError) {
      console.error('API Error:', error)
    }
  }, [productDetails, isError, error])

  // Combine product details with quantities with better error handling
  const cartItems = useMemo(() => {
    return (
      productDetails?.data?.map((product) => {
        const cartItem = products.find((item) => item.productId === product._id)
        return {
          ...product,
          quantity: cartItem?.quantity || 0,
        }
      }) || []
    )
  }, [productDetails?.data, products])

  // Log if we have cart items but no data returned
  useEffect(() => {
    if (
      isApiCallMade &&
      !isLoading &&
      cartItems.length === 0 &&
      products.length > 0
    ) {
      console.error('Products exist in cart but no data returned from API')
      toast.error('Failed to load your cart items')
    }
  }, [isApiCallMade, isLoading, cartItems, products])

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const shipping = 0
  const total = subtotal + shipping

  // Handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch(updateQuantity({ _id: id, quantity: newQuantity }))
  }

  // Handle remove item
  const handleRemoveItem = (id: string, name: string) => {
    dispatch(removeFromCart(id))
    toast.success(`${name} removed from cart`)
  }

  // Handle return to shop
  const handleReturnToShop = () => {
    navigate('/products')
  }

  // Show loading state if products exist but API is still loading
  if (isLoading && products.length > 0) {
    return (
      <div className='w-full min-h-[calc(100vh-5rem)] py-10 mt-16'>
        <div className='container px-4 mx-auto md:px-6 max-w-7xl'>
          <h1 className='mb-8 text-2xl font-bold md:text-3xl'>
            My Shopping Cart
          </h1>
          <Card className='flex flex-col items-center justify-center w-full px-4 py-16'>
            <div className='mb-4'>
              <ShoppingBag className='w-12 h-12 text-muted-foreground animate-pulse' />
            </div>
            <h2 className='mb-2 text-xl font-semibold'>Loading your cart...</h2>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full min-h-[calc(100vh-5rem)] py-10 mt-16'>
      <div className='container px-4 mx-auto md:px-6 max-w-7xl'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-2xl font-bold md:text-3xl'>My Shopping Cart</h1>
          <Button
            variant='ghost'
            onClick={handleReturnToShop}
            className='items-center hidden gap-2 md:flex'
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <ScrollReveal direction='up' delay={0.1} distance={50}>
            <Card className='flex flex-col items-center justify-center w-full px-4 py-16'>
              <div className='mb-6'>
                <ShoppingBag className='w-16 h-16 text-muted-foreground' />
              </div>
              <h2 className='mb-2 text-2xl font-semibold'>
                Your cart is empty
              </h2>
              <p className='max-w-md mb-8 text-center text-muted-foreground'>
                Looks like you haven't added any products to your cart yet.
                Browse our collection and find something you'll love.
              </p>
              <Button
                onClick={handleReturnToShop}
                className='bg-[#9962FF] hover:bg-[#9962ffe5] px-8'
              >
                Browse Products
              </Button>
            </Card>
          </ScrollReveal>
        ) : (
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Cart Items - Takes up more space */}
            <div className='lg:col-span-2'>
              <ScrollReveal direction='left' delay={0.1} distance={50}>
                <Card className='mb-6 overflow-hidden md:mb-0'>
                  <div className='p-4 overflow-x-auto md:p-6'>
                    {/* Mobile view for each product */}
                    <div className='space-y-6 lg:hidden'>
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className='flex flex-col pb-6 border-b'
                        >
                          <div className='flex gap-4 mb-4'>
                            <img
                              src={item.image}
                              alt={item.name}
                              className='object-cover w-24 h-24 rounded-md'
                            />
                            <div className='flex-1'>
                              <h3 className='mb-1 text-base font-medium'>
                                {item.name}
                              </h3>
                              <p className='mb-2 text-sm text-muted-foreground'>
                                {item.brand}
                              </p>
                              <p className='font-medium'>
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center justify-between'>
                            <div className='flex items-center border rounded-md'>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='h-8 px-3'
                                onClick={() =>
                                  handleQuantityChange(
                                    item._id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className='w-8 text-center'>
                                {item.quantity}
                              </span>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='h-8 px-3'
                                onClick={() =>
                                  handleQuantityChange(
                                    item._id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </div>

                            <div className='flex items-center gap-4'>
                              <span className='font-medium'>
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant='ghost'
                                size='sm'
                                onClick={() =>
                                  handleRemoveItem(item._id, item.name)
                                }
                                className='w-8 h-8 p-2 text-red-500 hover:bg-red-50 hover:text-red-600'
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop table view */}
                    <table className='hidden w-full lg:table'>
                      <thead>
                        <tr className='border-b'>
                          <th className='py-4 font-medium text-left'>
                            Product
                          </th>
                          <th className='py-4 font-medium text-left'>Price</th>
                          <th className='py-4 font-medium text-left'>
                            Quantity
                          </th>
                          <th className='py-4 font-medium text-left'>
                            Subtotal
                          </th>
                          <th className='w-16'></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item._id} className='border-b'>
                            <td className='py-4'>
                              <div className='flex items-center gap-4'>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className='object-cover w-16 h-16 rounded-md'
                                />
                                <div>
                                  <h3 className='font-medium'>{item.name}</h3>
                                  <p className='text-xs text-muted-foreground'>
                                    {item.brand}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className='py-4'>${item.price.toFixed(2)}</td>
                            <td className='py-4'>
                              <div className='flex items-center w-32 border rounded-md'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-8 px-2'
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </Button>
                                <span className='flex-1 text-center'>
                                  {item.quantity}
                                </span>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-8 px-2'
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  +
                                </Button>
                              </div>
                            </td>
                            <td className='py-4 font-medium'>
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className='py-4'>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() =>
                                  handleRemoveItem(item._id, item.name)
                                }
                                className='text-red-500 hover:bg-red-50 hover:text-red-600 h-9 w-9'
                              >
                                <Trash2 size={18} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className='flex items-center justify-between p-4 border-t md:p-6'>
                    <Button
                      variant='outline'
                      onClick={handleReturnToShop}
                      className='md:hidden'
                    >
                      <ArrowLeft size={16} className='mr-2' />
                      Continue Shopping
                    </Button>
                    <div className='ml-auto text-sm text-muted-foreground'>
                      {cartItems.length}{' '}
                      {cartItems.length === 1 ? 'item' : 'items'} in cart
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <ScrollReveal direction='right' delay={0.2} distance={50}>
                <Card className='sticky top-24'>
                  <div className='p-6'>
                    <h2 className='mb-4 text-xl font-semibold'>
                      Order Summary
                    </h2>

                    <div className='mb-6 space-y-3'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Subtotal</span>
                        <span className='font-medium'>
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Shipping</span>
                        <span className='font-medium'>Free</span>
                      </div>

                      <Separator className='my-3' />

                      <div className='flex justify-between text-lg'>
                        <span className='font-medium'>Total</span>
                        <span className='font-bold'>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Link to='/checkout' className='block w-full'>
                      <Button
                        className='w-full bg-[#9962FF] hover:bg-[#9962ffe5] h-12'
                        size='lg'
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <div className='mt-6 text-center'>
                      <p className='text-xs text-muted-foreground'>
                        Free shipping on all orders. 30-day return policy.
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
