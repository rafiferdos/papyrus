import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useGetUserQuery } from '@/redux/features/userApi'
import { useAppSelector } from '@/redux/hooks'
import { useCurrentUser } from '@/redux/features/auth/authSlice'

export default function Checkout() {
  const [userInfo, setUserInfo] = useState<{
    name: string
    email: string
  } | null>(null)

  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items)

  // Get current user from Redux state
  const currentUser = useAppSelector(useCurrentUser)
  console.log('Current user from auth:', currentUser)

  // Get the userId from currentUser
  const userId = currentUser?.userId

  // Fetch user data using the same approach as in MyProfile.tsx
  const { data, isLoading } = useGetUserQuery(userId, {
    skip: !userId,
  })

  // Extract user data from the API response
  const user = data?.data

  // Calculate subtotal and total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  // Set user info when API data is loaded
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || 'Guest User',
        email: user.email || '',
      })
      console.log('User info set from API:', user)
    }
  }, [user])

  return (
    <div className='w-full'>
      <div className='w-full max-w-6xl mx-auto my-6 px-4 lg:px-0 mt-20'>
        <h1 className='text-3xl font-bold mb-6'>Billing Information</h1>

        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Billing Form */}
          <div className='w-full lg:w-3/4 space-y-6'>
            <div className='grid lg:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='firstName' className='pb-2'>
                  Full Name
                </Label>
                <Input
                  id='firstName'
                  value={
                    isLoading ? 'Loading...' : userInfo?.name || 'Guest User'
                  }
                  disabled
                  className='bg-gray-100 cursor-not-allowed'
                />
              </div>
            </div>

            <div>
              <Label htmlFor='address' className='pb-2'>
                Detail Address
              </Label>
              <textarea
                id='full address'
                placeholder='type detail address'
                className='w-full border-2 h-36 rounded-2xl p-2'
              />
            </div>

            <div className='grid lg:grid-cols-3 gap-4'>
              <div>
                <Label className='pb-2'>Division</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select division' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Barisal'>Barisal</SelectItem>
                    <SelectItem value='Chittagong'>Chittagong</SelectItem>
                    <SelectItem value='Dhaka'>Dhaka</SelectItem>
                    <SelectItem value='Khulna'>Khulna</SelectItem>
                    <SelectItem value='Mymensingh'>Mymensingh</SelectItem>
                    <SelectItem value='Rajshahi'>Rajshahi</SelectItem>
                    <SelectItem value='Sylhet'>Sylhet</SelectItem>
                    <SelectItem value='Rangpur'>Rangpur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className='pb-2'>Districts</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select districts' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Dhaka'>Dhaka</SelectItem>
                    <SelectItem value='Faridpur'>Faridpur</SelectItem>
                    <SelectItem value='Gazipur'>Gazipur</SelectItem>
                    <SelectItem value='Gopalganj'>Gopalganj</SelectItem>
                    <SelectItem value='Kishoreganj'>Kishoreganj</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className='pb-2'>Thana/Upazila</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select thana' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Keraniganj'>Keraniganj</SelectItem>
                    <SelectItem value='Nawabganj'>Nawabganj</SelectItem>
                    <SelectItem value='Dohar'>Dohar</SelectItem>
                    <SelectItem value='Savar'>Savar</SelectItem>
                    <SelectItem value='Dhamrai'>Dhamrai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid lg:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='email' className='pb-2'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  value={isLoading ? 'Loading...' : userInfo?.email || ''}
                  disabled
                  className='bg-gray-100 cursor-not-allowed'
                />
              </div>
              <div>
                <Label htmlFor='phone' className='pb-2'>
                  Phone
                </Label>
                <Input id='phone' placeholder='Phone number' />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='w-full lg:w-1/4 border rounded-xl p-4 space-y-4'>
            <h2 className='text-xl font-semibold'>Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className='text-muted-foreground text-sm'>
                Your cart is empty
              </p>
            ) : (
              <>
                {/* Cart Items */}
                <div className='space-y-3'>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className='flex justify-between items-center border-b pb-3'
                    >
                      <div className='flex items-center gap-3'>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className='w-16 h-16 rounded-md object-cover'
                        />
                        <div>
                          <p className='text-sm font-medium'>{item.name}</p>
                          <p className='text-xs text-muted-foreground'>
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className='font-semibold'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className='flex justify-between text-sm border-b pb-3'>
                  <span>Subtotal</span>
                  <span className='font-medium'>${subtotal.toFixed(2)}</span>
                </div>

                <div className='flex justify-between text-sm border-b pb-3'>
                  <span>Shipping</span>
                  <span className='font-medium'>Free</span>
                </div>

                <div className='flex justify-between font-semibold'>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </>
            )}

            {/* Payment Options */}
            <div className='pt-4'>
              <h3 className='text-lg font-medium mb-2'>Payment Method</h3>
              <RadioGroup defaultValue='cod' className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='cod' id='cod' />
                  <Label htmlFor='cod'>ShurjoPay ☀️</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              className='w-full mt-4 bg-[#9962FF] text-white hover:bg-[#9962ffe5] cursor-pointer'
              disabled={cartItems.length === 0}
            >
              Place Order
            </Button>

            {cartItems.length === 0 && (
              <p className='text-xs text-center text-muted-foreground'>
                You need items in your cart to place an order
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
