// export type TProduct = {
//   name: string;
//   image?: string;
//   brand: string;
//   price: number;
//   category:
//     | "Writing Instruments"
//     | "Paper Products"
//     | "Art Supplies"
//     | "Educational";
//   description: string;
//   quantity: number;
//   inStock: boolean;
//   isDeleted: boolean;
//   _id: string;
// };

export enum ProductCategory {
  Writing = "Writing",
  OfficeSupplies = "Office Supplies",
  ArtSupplies = "Art Supplies",
  Educational = "Educational",
  Technology = "Technology",
}

// Full Product details for frontend display
export interface TProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}
