import { apiSlice } from '../api/apiSlice'

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrders: builder.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: `orders`,
          method: 'POST',
          data: data,
        }
      },
    }),
    guestAddInfo: builder.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: 'orders',
          method: 'POST',
          data: data,
        }
      },
    }),
    getUserInfo: builder.query({
      query: () => 'orders',
    }),
  }),
})

export const {
  useAddOrdersMutation,
  useGuestAddInfoMutation,
  useGetUserInfoQuery,
} = orderApi
