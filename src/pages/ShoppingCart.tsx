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

export default function ShoppingCart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products = [] } = useSelector((state: RootState) => state.cart)
  // Get cart items from Redux store
  // const cartItems = useSelector((state: RootState) => state.cart.items)
  // Get product IDs from cart
  const productIds = products.map((item) => item.productId)

  // Fetch product details (assuming you have this API endpoint)
  const { data: productDetails } = useGetMultipleProductsQuery(
    productIds,
    {
      skip: productIds.length === 0,
    }
  )

  // Combine product details with quantities
  const cartItems =
    productDetails?.data?.map((product) => {
      const cartItem = products.find((item) => item.productId === product._id)
      return {
        ...product,
        quantity: cartItem?.quantity || 0,
      }
    }) || []

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

  return (
    <div className='w-full min-h-[calc(100vh-5rem)] py-10 mt-16'>
      <div className='container mx-auto px-4 md:px-6 max-w-7xl'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold'>My Shopping Cart</h1>
          <Button
            variant='ghost'
            onClick={handleReturnToShop}
            className='hidden md:flex items-center gap-2'
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <ScrollReveal direction='up' delay={0.1} distance={50}>
            <Card className='w-full flex flex-col items-center justify-center py-16 px-4'>
              <div className='mb-6'>
                <ShoppingBag className='h-16 w-16 text-muted-foreground' />
              </div>
              <h2 className='text-2xl font-semibold mb-2'>
                Your cart is empty
              </h2>
              <p className='text-muted-foreground mb-8 text-center max-w-md'>
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
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items - Takes up more space */}
            <div className='lg:col-span-2'>
              <ScrollReveal direction='left' delay={0.1} distance={50}>
                <Card className='overflow-hidden mb-6 md:mb-0'>
                  <div className='p-4 md:p-6 overflow-x-auto'>
                    {/* Mobile view for each product */}
                    <div className='lg:hidden space-y-6'>
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className='flex flex-col border-b pb-6'
                        >
                          <div className='flex gap-4 mb-4'>
                            <img
                              src={item.image}
                              alt={item.name}
                              className='w-24 h-24 object-cover rounded-md'
                            />
                            <div className='flex-1'>
                              <h3 className='font-medium text-base mb-1'>
                                {item.name}
                              </h3>
                              <p className='text-sm text-muted-foreground mb-2'>
                                {item.brand}
                              </p>
                              <p className='font-medium'>
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className='flex justify-between items-center'>
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
                                className='text-red-500 hover:bg-red-50 hover:text-red-600 p-2 h-8 w-8'
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop table view */}
                    <table className='w-full hidden lg:table'>
                      <thead>
                        <tr className='border-b'>
                          <th className='text-left font-medium py-4'>
                            Product
                          </th>
                          <th className='text-left font-medium py-4'>Price</th>
                          <th className='text-left font-medium py-4'>
                            Quantity
                          </th>
                          <th className='text-left font-medium py-4'>
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
                                  className='w-16 h-16 object-cover rounded-md'
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
                              <div className='flex items-center border rounded-md w-32'>
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

                  <div className='flex justify-between items-center p-4 md:p-6 border-t'>
                    <Button
                      variant='outline'
                      onClick={handleReturnToShop}
                      className='md:hidden'
                    >
                      <ArrowLeft size={16} className='mr-2' />
                      Continue Shopping
                    </Button>
                    <div className='text-sm text-muted-foreground ml-auto'>
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
                    <h2 className='text-xl font-semibold mb-4'>
                      Order Summary
                    </h2>

                    <div className='space-y-3 mb-6'>
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
