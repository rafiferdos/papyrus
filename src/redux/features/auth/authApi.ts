import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
