/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddProductMutation } from "@/redux/Features/products/productApi";

import { toast } from "sonner";
import { productFormValidationSchema } from "./productFormValidation";

const AddProductForm = () => {
  const [createProduct] = useAddProductMutation();
  // form validation
  const form = useForm({
    resolver: zodResolver(productFormValidationSchema),
  });

  // Destructure form value
  const {
    formState: { isSubmitting },
  } = form;

  // submit handler function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const newData = {
        name: data.name,
        image: data.image,
        brand: data.brand,
        price: parseInt(data.price),
        category: data.category,
        description: data.description,
        quantity: parseInt(data.quantity),
        inStock: Boolean(data.inStock),
      };
      // console.log("new data =>", newData);
      const res = await createProduct(newData);
      // console.log(res);
      if (res?.data?.success == true) {
        toast.success(res?.data?.message);
        form.reset();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[50%] mx-auto h-full flex flex-col justify-center shadow-none overflow-scroll md:overflow-hidden rounded ">
      <Card className=" mx-auto flex flex-col justify-center shadow-xl overflow-scroll md:overflow-hidden rounded border-none">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full items-center gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="text-base font-bold">
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-[#c0bfbd] w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* End name */}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      htmlFor="description"
                      className="text-base font-bold"
                    >
                      Description
                    </Label>
                    <FormControl>
                      <Input
                        id="description"
                        placeholder="Enter Your product Description"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-[#c0bfbd]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* End Description */}

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="price" className="text-base font-bold">
                      Price
                    </Label>
                    <FormControl>
                      <Input
                        id="price"
                        placeholder="Enter product Price"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-[#c0bfbd]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* End price */}

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="quantity" className="text-base font-bold">
                      Quantity
                    </Label>
                    <FormControl>
                      <Input
                        id="quantity"
                        placeholder="Enter product quantity"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-[#c0bfbd]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* End quantity */}

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="image" className="text-base font-bold">
                      Image Link
                    </Label>
                    <FormControl>
                      <Input
                        id="image"
                        placeholder="Enter Your product Img Link"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-[#c0bfbd]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* End img */}

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="brand" className="text-base font-bold">
                      Brand
                    </Label>
                    <FormControl>
                      <Input
                        id="brand"
                        placeholder="Enter Product Brand"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-[#c0bfbd]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* End color */}

              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel className="text-base font-bold">
                      Availability
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-row space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            In Stock
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Out of Stock
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Availability */}

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel className="text-base font-bold">
                      Category
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-row space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Writing Instruments" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Writing Instruments
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Paper Products" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Paper Products
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Art Supplies" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Art Supplies
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Educational" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Educational
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Condition */}

              {/* <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel className="text-base font-bold">
                      product Status
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-row space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="available" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Available
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sold" />
                          </FormControl>
                          <FormLabel className="font-normal">Sold</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* End status */}

              <Button
                type="submit"
                className="w-full  dark:bg-white dark:text-black bg-gray-900 text-white tracking-wide cursor-pointer mt-3"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Add Product"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductForm;
