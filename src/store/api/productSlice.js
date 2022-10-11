import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const producttApi = createApi({
  reducerPath: 'producttApi',
  // baseQuery,
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL2,
  }),
  endpoints: (builder) => ({
    //카드 상품 불러오기
    getProducts: builder.query({
      query: () => 'products',
    }),
    // getWomenProducts: builder.query({
    //   query: () => 'products',
    //   // transformResponse: (response) =>
    //   //   response.filter((item) => item.type === 'women'),
    // }),
    // getMenProducts: builder.query({
    //   query: () => 'products',
    //   // transformResponse: (response) =>
    //   //   response.filter((item) => item.type === 'men'),
    // }),
  }),
})

export const { useGetProductsQuery } = producttApi
