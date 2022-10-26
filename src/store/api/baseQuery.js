import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { setCredentials, logOut } from '../slices/authSlice'
import { Cookies } from 'react-cookie'

const { VITE_BASE_URL } = import.meta.env
const cookies = new Cookies()

export const baseQuery = fetchBaseQuery({
  baseUrl: VITE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = cookies.get('accessToken')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result?.error?.status === 401) {
    console.log('sending refresh token')
    const refreshResult = await baseQuery(
      {
        url: '/auth/reissue',
        method: 'POST',
        body: {
          accessToken: cookies.get('accessToken'),
          refreshToken: cookies.get('refreshToken'),
        },
      },
      api,
      extraOptions,
    )
    if (refreshResult?.data) {
      // const user = api.getState().auth.user/
      // api.dispatch(setCredentials({ ...refreshResult.data, user }))
      api.dispatch(
        setCredentials({
          ...refreshResult.data,
        }),
      )
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}
