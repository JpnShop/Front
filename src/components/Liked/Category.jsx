import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HeaderLink from '../layout/Header/HeaderLink'

export const Category = () => {
  const category = {
    like: '상품',
    'liked-brand': '브랜드',
    'liked-magazine': '매거진',
    'liked-oneul': '오늘',
    'recent-view': '최근 본',
  }
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="z-[120] fixed w-full max-w-[600px] overflow-hidden bg-white">
      <div className=" flex justify-between items-center mx-5 h-16">
        <div className=" text-xl font-bold">
          {pathname === '/recent-view' ? '최근 본 상품' : '찜'}
        </div>
        <HeaderLink />
      </div>
      <div className="flex h-[50px] justify-evenly items-center border-black border-b text-xl text-black-400">
        {Object.entries(category).map(([k, v]) => (
          <div
            key={k}
            onClick={() => navigate(`/${k}`)}
            className={
              pathname === `/${k}`
                ? 'relative font-bold text-black-100 after:border-b-[3px] after:border-black after:absolute after:-bottom-3 after:w-full after:left-0 hover:cursor-pointer'
                : null
            }
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category
