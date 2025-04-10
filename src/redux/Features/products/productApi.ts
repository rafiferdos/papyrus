import { baseApi } from '@/redux/api/baseApi'

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/api/product',
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: ['Product'],
    }),

    // getAllProductData: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams()
    //     if (args)
    //       args.forEach((item: { name: string; value: string }) =>
    //         params.append(item.name, item.value)
    //       )
    //     return {
    //       url: `/api/product`,
    //       params: params,
    //     }
    //   },
    //   providesTags: ['Product'],
    // }),


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
          url: `/api/product${queryString}`,
          method: 'GET',
        }
      },
      providesTags: ['Product'],
    }),
    

    getOneProductData: builder.query({
      query: (productId) => {
        return {
          url: `/api/product/${productId}`,
        }
      },
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/product/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, productInfo }) => ({
        url: `/api/product/${productId}`,
        method: 'PUT',
        body: productInfo,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useAddProductMutation,
  useGetAllProductDataQuery,
  useGetOneProductDataQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi