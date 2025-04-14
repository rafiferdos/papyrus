import { z } from "zod";

// name: string
// image?: string
// brand: string
// price: number
// category:
//   | 'Writing Instruments'
//   | 'Paper Products'
//   | 'Art Supplies'
//   | 'Educational'
// description: string
// quantity: number
// inStock: boolean
// isDeleted: boolean

export const productFormValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long"),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(10, "Description must be at least 10 characters long"),

  brand: z.string({
    required_error: "Brand is required",
    invalid_type_error: "Brand must be a string",
  }),

  price: z.string({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  // .positive("Price must be a positive number")
  // .int(),

  quantity: z.string({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  // .positive("Price must be a positive number")
  // .int(),

  category: z.enum(
    ["Writing Instruments", "Paper Products", "Art Supplies", "Educational"],
    {
      required_error: "category is required",
    }
  ),
  //   inStock: z.boolean(["available", "sold"], {
  //     required_error: "Status is required",
  //   }),
  inStock: z.string({
    required_error: "Availability is required",
    invalid_type_error: "inStock must be a boolean",
  }),

  image: z.string({
    required_error: "Images is required",
  }),

  isDeleted: z
    .boolean({
      required_error: "isDeleted is required",
      invalid_type_error: "isDeleted must be a boolean",
    })
    .optional(),
});
