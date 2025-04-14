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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { TUser } from "@/types/auth.types";
import { setCredentials } from "@/redux/features/auth/authSlice";
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
      // console.log('Login attempt with:', data)
      // Use unwrap() to get the actual response data or throw an error
      const result = await login(data).unwrap();
      // Extract user data from result if available
      const userData = result.data?.user || result.user;
      if (userData && userData.userId) {
        // Set user ID in cart
        dispatch(setUserId(userData.userId))
      }
      // console.log('Login API successful response:', result)
      // Log the entire response structure to help debugging
      // console.log('Full response structure:', result)
      // Try to find the access token in different possible locations
      let token: string | undefined;
      // Check for common token locations in API responses
      if (result.data?.token) {
        token = result.data.token;
      } else if (result.token) {
        token = result.token;
      } else if (typeof result === "string") {
        token = result;
      } else if (typeof result.data === "string") {
        token = result.data;
      }
      // console.log('Access token extracted:', accessToken)
      // console.log('Access token type:', typeof accessToken)

      if (!token || typeof token !== "string") {
        console.error("Invalid token format received from server");
        toast.error("Authentication error: Invalid token format");
        return;
      }
      try {
        const user = verifyToken(token) as TUser;
        // Log user data to console
        // console.log('User data after login:', {
        //   user,
        //   token: accessToken,
        //   fullResponse: result,
        // })
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error details:", error);
      // Handle specific API error responses
      if (error.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.status === 404) {
        toast.error("API endpoint not found");
      } else if (error.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to login. Please try again.");
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
          <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
