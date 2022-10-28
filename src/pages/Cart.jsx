import React from 'react'
import CartList from '../components/Cart'
import { useGetCartItemsQuery } from '../store/api/cartApiSlice'
import ErrorCom from '../components/common/ErrorCom'
import Loading from '../components/layout/Loading'
import { cartItems as data } from '../dummy/cart'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'

const Cart = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const token = cookies.accessToken
  const cartItems = useSelector((state) => state.cart)
  const { data, isLoading, isError, isSuccess } = useGetCartItemsQuery({
    skip: !token,
  })

  return (
    <>
      {token ? (
        <CartList cartItems={data} />
      ) : (
        <CartList cartItems={cartItems} />
      )}
    </>
  )
}

export default Cart
