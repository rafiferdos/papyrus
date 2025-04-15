import { TProduct } from "@/components/product/AllProducts";
import { baseApi } from "@/redux/api/baseApi";
import { TResponse } from "@/types/global";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/product',
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: ['Product'],
    }),

    getAllProductData: builder.query({
      query: (args) => {
        let queryString = ''
        if (args && args.length > 0) {
          const params = new URLSearchParams()
          args.forEach((item: { name: string; value: string }) =>
            params.append(item.name, item.value)
          )
          queryString = `?${params.toString()}`
        }

        return {
          url: `/product${queryString}`,
          method: 'GET',
        }
      },
      providesTags: ['Product'],
    }),

    getOneProductData: builder.query({
      query: (productId) => {
        return {
          url: `/product/${productId}`,
        }
      },
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, productInfo }) => ({
        url: `/product/${productId}`,
        method: 'PUT',
        body: productInfo,
      }),
      invalidatesTags: ['Product'],
    }),

    getMultipleProducts: builder.query<TResponse<TProduct[]>, string[]>({
      query: (ids) => ({
        url: '/products/multiple',
        method: 'POST',
        body: { ids },
      }),
    }),
  }),
})

export const {
  useAddProductMutation,
  useGetAllProductDataQuery,
  useGetOneProductDataQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetMultipleProductsQuery,
} = productApi;
