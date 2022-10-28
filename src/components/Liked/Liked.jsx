import React from 'react'
import Container from './Container'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { useGetFavoriteItemsQuery } from '../../store/api/favoriteApiSlice'

export const Liked = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const token = cookies.accessToken
  const { data, isLoading, isError } = useGetFavoriteItemsQuery(undefined, {
    skip: !token,
  })
  // const favriteItems = useSelector((state) => state.favorites)
  return (
    <div>
      <Container likedList={data} />
    </div>
  )
}

export default Liked
