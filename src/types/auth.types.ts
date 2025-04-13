type TRole = "admin" | "user";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TRole;
  isActive?: boolean;
};
