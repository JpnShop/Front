import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const { VITE_BASE_URL2 } = import.meta.env

export const baseQuery = fetchBaseQuery({
  baseUrl: VITE_BASE_URL2,
  credentials: 'include',
  prepareHeaders: (headers) => {
    // const accessToken = getCookie('accessToken')
    if (true) {
      headers.set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2NTQ3OTU4Mn0.SjTKspYRCmummjYl59VLd96TuvzcePisW20StvcqSOE7yWNBIdbcEIqv1T45XXfNTaKNWxyEVnOzUuYkBwI7YA`,
      )
    }
    return headers
  },
})
