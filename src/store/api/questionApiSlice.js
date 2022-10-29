import { apiSlice } from './apiSlice'

export const questionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => 'customers/questions',
    }),
    getQuestion: builder.query({
      query: (id) => {
        return {
          url: `/customers/questions/products/${id}/questions`,
          method: 'GET',
        }
      },
    }),
    getMyQuestions: builder.query({
      query: () => 'customers/questions/my',
    }),
    getMyDetailQuestion: builder.query({
      query: (id) => `customers/questions/${id}?password=0`,
    }),
    addQuestion: builder.mutation({
      query: ({ userValue, dataId }) => {
        console.log(userValue, dataId)
        return {
          url: `customers/questions/${dataId}`,
          method: 'POST',
          body: userValue,
        }
      },
    }),
  }),
})

export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useGetMyQuestionsQuery,
  useAddQuestionMutation,
  useGetMyDetailQuestionQuery,
} = questionApi
