import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://papyrus-server-3v213ozv6-sifatullahs-projects.vercel.app/',
  credentials: 'include',
  prepareHeaders: (headers,
    //  { getState }
    ) => {
    // const token = (getState() as RootState).auth.token

    // if (token) headers.set('authorization', `Bearer ${token}`)

    return headers
  },
})

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery,
  tagTypes: ['User', 'Product', 'Cart', 'Order'],
  endpoints: () => ({}),
})