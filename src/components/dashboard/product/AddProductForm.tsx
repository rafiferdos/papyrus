import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardHeader,
} from "@/components/ui/card";
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
// import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { listingFormValidationSchema } from "./ListingsFormValidation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import { toast } from "sonner";

const AddProductForm = () => {
  // form validation
  const form = useForm({
    // resolver: zodResolver(listingFormValidationSchema),
  });

  // Destructure form value
  const {
    formState: { isSubmitting },
  } = form;

  // submit handler function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // try {
    //   const res = await createListing(data);
    //   if (res?.status === true) {
    //     toast.success(res?.message);
    //     form.reset();
    //   } else {
    //     toast.error(res?.message);
    //   }
    // } catch (error: any) {
    //   console.error(error);
    // }
  };
  return (
    <div className="w-full md:w-[80%] lg:w-[50%] mx-auto h-full flex flex-col justify-center shadow-none overflow-scroll md:overflow-hidden rounded mb-6">
      <Card className=" mx-auto flex flex-col justify-center shadow-xl overflow-scroll md:overflow-hidden rounded border-none">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full items-center gap-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="text-base font-bold">
                      Title
                    </Label>
                    <FormControl>
                      <Input
                        id="title"
                        placeholder="Enter Listing Title"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-[#c0bfbd] w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* End Title */}
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
                        placeholder="Enter Your Listing Description"
                        {...field}
                        value={field.value || ""}
                        className="placeholder:text-[#c0bfbd]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* End Email */}
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
                        placeholder="Enter Listing Price"
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
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="images" className="text-base font-bold">
                      Image Link
                    </Label>
                    <FormControl>
                      <Input
                        id="images"
                        placeholder="Enter Your Listing Img Link"
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
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="color" className="text-base font-bold">
                      Listing Color
                    </Label>
                    <FormControl>
                      <Input
                        id="color"
                        placeholder="Black"
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
                name="availability"
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
                            <RadioGroupItem value="in stock" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            In Stock
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="out of stock" />
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
                name="condition"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel className="text-base font-bold">
                      Listing Condition
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-row space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="brandNew" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Brand New
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="gentlyUsed" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Gently Used
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="fairCondition" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Fair Condition
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="goodCondition" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Good Condition
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Condition */}

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel className="text-base font-bold">
                      Listing Status
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
              />
              {/* End status */}

              <Button
                type="submit"
                className="w-full  bg-purple-500 hover:bg-purple-600 text-white tracking-wide cursor-pointer mt-3"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create Listing"
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
