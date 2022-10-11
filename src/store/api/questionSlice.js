import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../api/baseQuery'

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_BASE_URL2,
  // }),
  endpoints: (builder) => ({
    //카드 상품 불러오기
    getQuestions: builder.query({
      // query: () => '/customers/question',
      query: () => 'question',
    }),
    getQustion: builder.query({
      query: (id) => `question/${id}`,
    }),
    addQuestion: builder.mutation({
      query: ({ data }) => ({
        url: `customers/questions`,
        method: 'POST',
        // mode: 'cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2NTQ4MDYwOH0.AIqxqJMQ9Sn40jm3mEHs5E8DTMIBEHnXKcE7qbMre8tPI3I14Kr4Qh5j3NM-SjBvrjIKRQ0FFi7jFDFlsC-QcQ`,
        },
        body: data,
      }),
    }),
  }),
})

export const {
  useGetQuestionsQuery,
  useGetQustionQuery,
  useAddQuestionMutation,
} = questionApi
