// export type TOrderStatus =
//   | "Pending"
//   | "Paid"
//   | "Shipped"
//   | "Completed"
//   | "Cancelled";

// export type TTransaction = {
//   id: string;
//   transactionStatus: string;
//   bank_status: string;
//   sp_code: string;
//   sp_message: string;
//   method: string;
//   date_time: string;
// };

// export type TOrderProduct = {
//   productId: string; // ObjectId → string
//   quantity: number;
// };

// export type TOrder = {
//   userId?: string; // ObjectId → string
//   products: TOrderProduct[];
//   totalAmount?: number;
//   status: TOrderStatus;
//   transaction: TTransaction;
//   createdAt?: Date;
//   updatedAt?: Date;
//   _id: string;
// };

//* =============

// user type already provided:
export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isDeactivate: boolean;
  phone?: string;
  address?: string;
  city?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

// product type used inside order
export type TProduct = {
  _id: string;
  name: string;
  image: string;
};

// product entry in an order
export type TOrderProduct = {
  _id: string; // this is usually the order item ID
  productId: TProduct; // previously this was just string
  quantity: number;
};

// enum-like status type
export type TOrderStatus =
  | "Pending"
  | "Paid"
  | "Shipped"
  | "Completed"
  | "Cancelled";

// transaction type for payment data
export type TTransaction = {
  id: string;
  transactionStatus: string;
  bank_status: string;
  sp_code: string;
  sp_message: string;
  method: string;
  date_time: string;
};

// final order type
export type TOrder = {
  _id: string;
  userId: TUser; // previously was string; now proper type
  products: TOrderProduct[];
  totalAmount: number; // ensure this is not optional
  status: TOrderStatus;
  transaction: TTransaction;
  createdAt: string;
  updatedAt?: string;
};
