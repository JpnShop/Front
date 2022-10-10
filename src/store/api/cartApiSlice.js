import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// import { apiSlice } from '../api/apiSlice'
// const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ['Cart'] })

// export const cartApiSlice = apiWithTags.injectEndpoints({
export const cartApi = createApi({
  reducerPath: 'cartApi',
  // baseQuery,
  tagTypes: ['Carts'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL2,
  }),
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
      query: (id) => ({
        url: `carts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    changeCount: builder.mutation({
      query: ({ data }) => ({
        url: 'carts',
        method: 'POST',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2NTQwNzQ3NX0.6T0xQdBo7r4UqFyZDOXpQGps0U3ptD5zEtAbrj-bhgbUd0j3eL6NzoHEtU0V9H0lRzjKQt5bHGRS7kTURlvPZw`,
        },
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
  useChangeCountMutation,
} = cartApi
