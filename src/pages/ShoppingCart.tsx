import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IncrementDecrementBtn from "@/components/ui/incrementDecrementBtn";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
    return (
        <div className="pb-10 mt-20">
            <div className="w-full mx-auto">
                <h1 className="text-3xl font-bold text-neutral-900 my-6">My Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart Table */}
                    <Card className="w-full lg:w-3/4 overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600">
                                    <th className="p-3 text-left">Product</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Quantity</th>
                                    <th className="p-3 text-left">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                <tr className="border-b">
                                    <td className="p-3 flex items-center gap-4">
                                        <img src="" alt="product-img" className="w-16 h-16 object-cover rounded" />
                                        <span className="font-medium text-white">xy</span>
                                    </td>
                                    <td className="p-3 text-white">00</td>
                                    <td className="p-3 w-24">
                                        <IncrementDecrementBtn />
                                    </td>
                                    <td className="p-3 text-white">00</td>
                                </tr>

                                <tr className="border-b">
                                    <td className="p-3 flex items-center gap-4">
                                        <img src="" alt="product-img" className="w-16 h-16 object-cover rounded" />
                                        <span className="font-medium text-white">xy</span>
                                    </td>
                                    <td className="p-3 text-white">00</td>
                                    <td className="p-3 w-24">
                                        <IncrementDecrementBtn />
                                    </td>
                                    <td className="p-3 text-white">00</td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="flex justify-between px-6 py-4 border-t text-sm">
                            <Button variant="outline" className="rounded-full">Return to Shop</Button>
                        </div>
                    </Card>

                    {/* Cart Summary */}
                    <Card className="w-full lg:w-1/4 p-5 space-y-4">
                        <h2 className="text-xl font-semibold">Cart Total</h2>
                        <div className="flex justify-between text-sm border-b pb-2">
                            <span>Subtotal:</span>
                            <span className="font-medium">00</span>
                        </div>
                        <div className="flex justify-between text-sm border-b pb-2">
                            <span>Shipping:</span>
                            <span className="font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Total:</span>
                            <span className="font-semibold">00</span>
                        </div>

                        <Link to="/checkout"><Button className="w-full rounded-full bg-[#9962FF] text-white hover:bg-[#9962ffe5] cursor-pointer">
                            Proceed to Checkout
                        </Button></Link>

                    </Card>
                </div>
            </div>
        </div>
    );
}
