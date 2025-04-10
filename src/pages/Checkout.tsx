import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Checkout() {
    return (
        <div className="w-full">

            <div className="w-full max-w-6xl mx-auto my-6 px-4 lg:px-0">
                <h1 className="text-3xl font-bold text-neutral-900 mb-6">Billing Information</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Billing Form */}
                    <div className="w-full lg:w-3/4 space-y-5">
                        <div className="grid lg:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="Your first name" />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Your last name" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="address">Details Address</Label>
                            <textarea id="full address" placeholder="Street address" className="w-full border-2 h-36" />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4">
                            <div>
                                <Label>Country / Region</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                        <SelectItem value="finland">Finland</SelectItem>
                                        <SelectItem value="denmark">Denmark</SelectItem>
                                        <SelectItem value="australia">Australia</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Division</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dhaka">Dhaka</SelectItem>
                                        <SelectItem value="texas">Rajshahi</SelectItem>
                                        <SelectItem value="michigan">Sylhet</SelectItem>
                                        <SelectItem value="alaska">Khulna</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Email address" />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" placeholder="Phone number" />
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/4 border rounded-xl p-4 bg-white space-y-4">
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
                                    <Label htmlFor="paypal">SurjaPay</Label>
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
