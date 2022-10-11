import React, { useState, useEffect } from 'react'
import HeaderLink from './HeaderLink'
import { cls } from '../../../utils'
import Logo from './Logo'
import { ReactComponent as BackOn } from '/public/assets/back-small.svg'
import { useLocation, useNavigate } from 'react-router-dom'

function Header(props) {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  return (
    <div
      className={cls(
        'w-full max-w-[600px] h-16 flex fixed top-0 items-center bg-white z-40 box-border',
        currentPath === '/' && 'border-b-2 border-primary',
      )}
    >
      <div className="w-full h-16 max-w-[600px] px-5 flex items-center">
        {currentPath === '/' ? (
          <Logo />
        ) : (
          <BackOn className="w-7" onClick={() => navigate(-1)} />
        )}
        <div className="w-full items-center justify-center text-[20px] font-bold mx-3">
          {props.children}
        </div>
        <div className="mr-[1.75px]">
          <HeaderLink />
        </div>
      </div>
    </div>
  )
}

export default Header
