/* eslint-disable prefer-const */


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/Features/order/orderApi"
// import { TOrderProduct } from "@/types/global"



const Checkout = () => {
  const cartData = useAppSelector((state) => state.cart);
  const [createOrder] = useCreateOrderMutation();

  
  const handlePlaceOrder = async () => {
    const orderData = {
      products: cartData.products.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
  
    try {
      const res = await createOrder(orderData).unwrap();
      console.log("Order placed!", res);
    } catch (err) {
      console.error("Order error:", err);
    }
  };
    
  

  return (
    <div className="w-full">
      <div className="w-full max-w-6xl px-4 mx-auto my-6 mt-20 lg:px-0">
        <h1 className="mb-6 text-3xl font-bold text-neutral-900">Billing Information</h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Billing Form */}
          <div className="w-full space-y-6 lg:w-3/4">
            <div className="grid gap-4 lg:grid-cols-3">
              <div>
                <Label htmlFor="firstName" className="pb-2">First Name</Label>
                <Input id="firstName" placeholder="Your first name" />
              </div>
              <div>
                <Label htmlFor="lastName" className="pb-2">Last Name</Label>
                <Input id="lastName" placeholder="Your last name" />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="pb-2">Detail Address</Label>
              <textarea id="address" placeholder="Type detail address" className="w-full p-2 border-2 h-36 rounded-2xl" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div>
                <Label className="pb-2">Division</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Barisal">Barisal</SelectItem>
                    <SelectItem value="Chittagong">Chittagong</SelectItem>
                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                    <SelectItem value="Khulna">Khulna</SelectItem>
                    <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                    <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                    <SelectItem value="Sylhet">Sylhet</SelectItem>
                    <SelectItem value="Rangpur">Rangpur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="pb-2">Districts</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                    <SelectItem value="Faridpur">Faridpur</SelectItem>
                    <SelectItem value="Gazipur">Gazipur</SelectItem>
                    <SelectItem value="Gopalganj">Gopalganj</SelectItem>
                    <SelectItem value="Kishoreganj">Kishoreganj</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="pb-2">Thana/Upazila</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select thana" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Keraniganj">Keraniganj</SelectItem>
                    <SelectItem value="Nawabganj">Nawabganj</SelectItem>
                    <SelectItem value="Dohar">Dohar</SelectItem>
                    <SelectItem value="Savar">Savar</SelectItem>
                    <SelectItem value="Dhamrai">Dhamrai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <Label htmlFor="email" className="pb-2">Email</Label>
                <Input id="email" type="email" placeholder="Email address" />
              </div>
              <div>
                <Label htmlFor="phone" className="pb-2">Phone</Label>
                <Input id="phone" placeholder="Phone number" />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full p-4 space-y-4 border lg:w-1/4 rounded-xl">
            <h2 className="text-xl font-semibold text-neutral-900">Order Summary</h2>

            {cartData.products.map((products, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <img src={products?.image || "/images/product.png"} alt={products?.name} className="w-16 h-16 rounded-md" />
                  <div>
                    <p className="text-sm">{products?.name}</p>
                    <p className="text-sm text-muted-foreground">{products?.quantity || "N/A"}</p>
                  </div>
                </div>
                <p className="font-semibold">{products?.price}৳</p>
              </div>
            ))}

            <div className="flex justify-between pb-3 text-sm border-b">
              <span>Shipping</span>
              <span className="font-medium">Free</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{cartData.products.reduce((total, item) => total + (item?.price || 0), 0)}৳</span>
            </div>

            <div className="pt-4">
              <h3 className="mb-2 text-lg font-medium">Payment Method</h3>
              <RadioGroup defaultValue="cod" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">shurjoPay</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              className="w-full mt-4 bg-[#9962FF] text-white hover:bg-[#9962ffe5] cursor-pointer"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
);
};

export default Checkout;
