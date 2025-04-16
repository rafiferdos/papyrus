import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "@/redux/Features/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/Features/auth/authSlice";
import { CartItem } from "@/redux/Features/products/cart.api";
import { useGetAllProductDataQuery } from "@/redux/Features/products/productApi";
import { useCreateOrderMutation } from "@/redux/Features/order/orderApi";

interface FormData {
  shippingAddress: string;
  orderTitle: string;
  phone: string;
  division: string;
  district: string;
  thana: string;
}
export default function Checkout() {
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  // Get cart items from Redux store
  const cartItems = useSelector(
    (state: RootState) => state.cart.products
  ) as CartItem[];

  // Get current user from Redux state
  const currentUser = useAppSelector(useCurrentUser);
  console.log("Current user from auth:", currentUser);

  // Get the userId from currentUser
  const userId = currentUser?.userId;

  // Fetch user data using the same approach as in MyProfile.tsx
  const { data, 
    // isLoading 
  } = useGetUserQuery(userId, {
    skip: !userId,
  });

  // Extract user data from the API response
  const user = data?.data;
  const { data: productsData } = useGetAllProductDataQuery({});

  // Add the getProductPrice helper function
  const getProductPrice = (productId: string): number => {
    const product = productsData?.data?.result?.find(
      (p: { _id: string; price: number }) => p._id === productId
    );
    return product?.price || 0;
  };
  // Calculate subtotal and total
  const subtotal = cartItems.reduce((total: number, item: CartItem) => {
 
    const productPrice = getProductPrice(item.productId); // You'll need to implement this
    return total + productPrice * item.quantity;
  }, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;




  const cartData = useAppSelector((state) => state.cart);

  const [createOrder, { isLoading }] =
    useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    const Data = await createOrder({ products: cartData.products });
    // Handle success or error here
    console.log(Data);
  };







  
  // const [
  //   createOrder,
  //   {
  //     isLoading: isCreatingOrder,
  //     // isSuccess,
  //     // data,
  //     // isError,
  //     // error,
  //   },
  // ] = useCreateOrderMutation();
  // const {
  //   // register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>();

  // const onSubmit = async (formData: FormData) => {
  //   try {
  //     const orderItems = cartItems.map((item) => ({
  //       productId: item.productId,
  //       quantity: item.quantity,
  //     }));

  //     const orderDetail = {
  //       orderItems,
  //       shippingAddress: {
  //         address: formData.shippingAddress,
  //         division: formData.division,
  //         district: formData.district,
  //         thana: formData.thana,
  //         phone: formData.phone,
  //       },
  //     };

  //     await createOrder(orderDetail).unwrap();
  //   } catch (err) {
  //     console.error("Order creation failed:", err);
  //   }
  // };

  // Set user info when API data is loaded
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || "Guest User",
        email: user.email || "",
      });
      console.log("User info set from API:", user);
    }
  }, [user]);

  return (
    <div className="w-full">
      <div className="w-full max-w-6xl px-4 mx-auto my-6 mt-20 lg:px-0">
        <h1 className="mb-6 text-3xl font-bold">Billing Information</h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Billing Form */}
          <div className="w-full space-y-6 lg:w-3/4">
            <div className="grid gap-4 lg:grid-cols-3">
              <div>
                <Label htmlFor="firstName" className="pb-2">
                  Full Name
                </Label>
                <Input
                  id="firstName"
                  value={
                    isLoading ? "Loading..." : userInfo?.name || "Guest User"
                  }
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="pb-2">
                Detail Address
              </Label>
              <textarea
                id="full address"
                placeholder="type detail address"
                className="w-full p-2 border-2 h-36 rounded-2xl"
              />
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
                <Label htmlFor="email" className="pb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={isLoading ? "Loading..." : userInfo?.email || ""}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="pb-2">
                  Phone
                </Label>
                <Input id="phone" placeholder="Phone number" />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full p-4 space-y-4 border lg:w-1/4 rounded-xl">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Your cart is empty
              </p>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item: CartItem) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between pb-3 border-b"
                    >
                      <div className="flex items-center gap-3">
                        {/* Assuming you have a way to fetch the image URL based on productId */}
                        {productsData?.data?.result?.find(
                          (p: { _id: string; image: string }) =>
                            p._id === item.productId
                        )?.image && (
                          <img
                            src={
                              productsData?.data?.result?.find(
                                (p: { _id: string; image: string }) =>
                                  p._id === item.productId
                              )?.image
                            }
                            alt={
                              productsData?.data?.result?.find(
                                (p: { _id: string; name: string }) =>
                                  p._id === item.productId
                              )?.name
                            }
                            className="object-cover w-16 h-16 rounded-md"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium">
                            {
                              productsData?.data?.result?.find(
                                (p: { _id: string; name: string }) =>
                                  p._id === item.productId
                              )?.name
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        $
                        {(
                          getProductPrice(item.productId) * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pb-3 text-sm border-b">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pb-3 text-sm border-b">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </>
            )}

            {/* Payment Options */}
            <div className="pt-4">
              <h3 className="mb-2 text-lg font-medium">Payment Method</h3>
              <RadioGroup defaultValue="cod" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">ShurjoPay ☀️</Label>
                </div>
              </RadioGroup>
            </div>
            <Button className="w-full" onClick={handlePlaceOrder}>
              Place Order
            </Button>

            {cartItems.length === 0 && (
              <p className="text-xs text-center text-muted-foreground">
                You need items in your cart to place an order
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
