import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as CartIcon } from '/public/assets/bag.svg'
import { ReactComponent as SetIcon } from '/public/assets/setting_icon.svg'
const Header = () => {
  return (
    <ul className="flex justify-end items-center h-[4.125rem] gap-3.5 leading-none px-5">
      <li>
        <Link to="/cart" className="relative">
          <CartIcon className="w-8" alt="장바구니" />
          <span className="count absolute right-0 bottom-[-0.188rem] text-[0.625rem] rounded-[50%] bg-primary text-white w-[0.875rem] h-[0.875rem] text-center leading-[0.875rem]">
            2
          </span>
        </Link>
      </li>
      <li>
        <Link to="/">
          <SetIcon className="w-6 " alt="" />
        </Link>
      </li>
    </ul>
  )
}

export default Header