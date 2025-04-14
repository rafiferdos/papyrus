export type TOrderStatus =
  | "Pending"
  | "Paid"
  | "Shipped"
  | "Completed"
  | "Cancelled";

export type TTransaction = {
  id: string;
  transactionStatus: string;
  bank_status: string;
  sp_code: string;
  sp_message: string;
  method: string;
  date_time: string;
};

export type TOrderProduct = {
  productId: string; // ObjectId → string
  quantity: number;
};

export type TOrder = {
  userId?: string; // ObjectId → string
  products: TOrderProduct[];
  totalAmount?: number;
  status: TOrderStatus;
  transaction: TTransaction;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
};
