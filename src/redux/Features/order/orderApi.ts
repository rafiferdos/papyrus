import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all order
    getAllOrder: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString()
        return {
          url: `/orders/all-order-list?${queryString}`,
          method: 'GET',
        }
      },
      providesTags: ['Orders', 'Order'],
    }),

    // Get my order
    getMyOrder: builder.query({
      query: () => {
        return {
          url: `/orders/my-order-list`,
          method: 'GET',
        }
      },
      providesTags: ['Orders', 'Order'],
    }),

    // Get single order
    getSingleOrder: builder.query({
      query: (orderId) => {
        return {
          url: `/orders/single-order/${orderId}`,
          method: 'GET',
        }
      },
      providesTags: ['Orders', 'Order'],
    }),

    // Get verify order
    verifyOrder: builder.query({
      query: (order_id) => {
        return {
          url: `/order/verify`,
          params: { order_id },
          method: 'GET',
        }
      },
      providesTags: ['Orders', 'Order'],
    }),

    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => {
        // Get token from localStorage
        const token = localStorage.getItem('token')

        return {
          url: '/order',
          method: 'POST',
          body: orderData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      invalidatesTags: ['Order', 'User'],
    }),

    // Update a specific order
    updateDeliveryOrder: builder.mutation({
      query: ({ updateData, orderId }) => ({
        url: '/orders/change-order-status/' + orderId,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),

    // Delete a specific order by ID
    deleteSingleOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/delete-single-order/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),

    // Delete all order
    deleteAllOrder: builder.mutation({
      query: () => ({
        url: `/orders/delete-all-order`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
  }),
})

export const {
  useGetAllOrderQuery,
  useGetMyOrderQuery,
  useGetSingleOrderQuery,
  useVerifyOrderQuery,

  useCreateOrderMutation,
  
  useUpdateDeliveryOrderMutation,
  useDeleteSingleOrderMutation,
  useDeleteAllOrderMutation,
} = orderApi;