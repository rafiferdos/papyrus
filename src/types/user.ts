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
