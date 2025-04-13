import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Checkout() {
    return (
        <div className="w-full">

            <div className="w-full max-w-6xl mx-auto my-6 px-4 lg:px-0 mt-20">
                <h1 className="text-3xl font-bold text-neutral-900 mb-6">Billing Information</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Billing Form */}
                    <div className="w-full lg:w-3/4 space-y-6">
                        <div className="grid lg:grid-cols-3 gap-4">
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
                            <textarea id="full address" placeholder="type detail address" className="w-full border-2 h-36 rounded-2xl p-2" />
                        </div>

                        <div className="grid lg:grid-cols-3 gap-4">
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

                        <div className="grid lg:grid-cols-2 gap-4">
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
                    <div className="w-full lg:w-1/4 border rounded-xl p-4 space-y-4">
                        <h2 className="text-xl font-semibold text-neutral-900">Order Summary</h2>

                        <div className="flex justify-between items-center border-b pb-3">
                            <div className="flex items-center gap-3">
                                <img src="/images/product.png" alt="Product-image" className="w-16 h-16 rounded-md" />
                                <div>
                                    <p className="text-sm">Product Name</p>
                                    <p className="text-sm text-muted-foreground">XL</p>
                                </div>
                            </div>
                            <p className="font-semibold">00</p>
                        </div>

                        <div className="flex justify-between text-sm border-b pb-3">
                            <span>Shipping</span>
                            <span className="font-medium">Free</span>
                        </div>

                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>00</span>
                        </div>

                        {/* Payment Options */}
                        <div className="pt-4">
                            <h3 className="text-lg font-medium mb-2">Payment Method</h3>
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

                        <Button className="w-full mt-4 bg-[#9962FF] text-white hover:bg-[#9962ffe5] cursor-pointer">Place Order</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
