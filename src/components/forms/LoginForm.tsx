"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { verifyToken } from "@/utils/verifyToken";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/Features/auth/authApi";
import { TUser } from "@/types/auth.types";
import { setCredentials } from "@/redux/Features/auth/authSlice";
import { setUserId } from "@/redux/features/products/cart.api";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (data: { email: string; password: string }) => {
    try {
      // Use unwrap() to get the actual response data or throw an error
      const result = await login(data).unwrap();

      console.log("Full login response:", result);

      // Get the token
      let token: string | undefined;
      if (result.data?.token) {
        token = result.data.token;
      } else if (result.token) {
        token = result.token;
      } else if (typeof result.data === "string") {
        token = result.data;
      }

      if (!token || typeof token !== "string") {
        console.error("Invalid token format received from server");
        toast.error("Authentication error: Invalid token format");
        return;
      }

      try {
        // Decode the token to get user data
        const user = verifyToken(token) as TUser;
        console.log("Decoded user from token:", user);

        // Extract userId from the decoded token
        // The token likely contains userId instead of _id based on your response
        // Check both to be safe
        const userId = user.userId || user._id;

        if (userId) {
          dispatch(setUserId(userId));
          console.log("Set userId in cart from token:", userId);
        } else {
          console.error("No userId found in decoded token");
        }

        toast.success(result.message || "Login successful");
        dispatch(
          setCredentials({
            user: user,
            token: token,
          })
        );
        navigate("/");
      } catch (tokenError) {
        console.error("Token verification error:", tokenError);
        toast.error("Authentication error: Could not verify token");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      if (typeof error === "object" && error !== null && "status" in error) {
        const apiError = error as { status: number };
        if (apiError.status === 400) {
          toast.error("Invalid email or password");
        } else if (apiError.status === 401) {
          toast.error("Unauthorized access");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFinish)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Link to="/register">
            <Button variant="link">Don't have an account? Sign Up</Button>
          </Link>
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
