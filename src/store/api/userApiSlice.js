import { apiSlice } from '../api/apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => 'members',
    }),
  }),
})
export const { useGetUserInfoQuery } = userApi
