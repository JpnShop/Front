import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as CartIcon } from '/public/assets/bag.svg'
import { useGetCartItemsQuery } from '../../store/api/cartApiSlice'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'

const CartICon = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const token = cookies.accessToken
  let cartItems

  if (token) {
    const { data: list } = useGetCartItemsQuery(undefined, { skip: !token })
    cartItems = list
  } else {
    cartItems = useSelector((state) => state.cart)
  }

  return (
    <Link to="/cart" className="relative top-[-2px]">
      <CartIcon width="26" height="26" alt="장바구니" />
      <span className="count absolute right-0 bottom-[-0.188rem] text-[0.625rem] rounded-[50%] bg-primary text-white w-[0.875rem] h-[0.875rem] text-center leading-[0.875rem]">
        {cartItems ? cartItems.reduce((acc, cur) => cur.count + acc, 0) : 0}
      </span>
    </Link>
  )
}

export default CartICon
