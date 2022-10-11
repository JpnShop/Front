import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://43.200.38.47:9090',
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
