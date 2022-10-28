import { apiSlice } from '../api/apiSlice'

export const cartApi = apiSlice.injectEndpoints({
  tagTypes: ['Carts'],
  endpoints: (builder) => ({
    //카드 상품 불러오기
    getCartItems: builder.query({
      query: () => 'carts',
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Cart', id })), 'Cart']
          : ['Cart'],
    }),
    deleteCartItem: builder.mutation({
      query: (data) => ({
        url: `carts`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    addCartItem: builder.mutation({
      query: (data) => ({
        url: 'carts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    changeCount: builder.mutation({
      query: (data) => {
        return {
          url: 'carts',
          method: 'PUT',
          body: data,
        }
      },
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
  useChangeCountMutation,
  useAddCartItemMutation,
} = cartApi
