import React from 'react'
import { detailProducts } from '../../../dummy/detail'
import { useGetProductsQuery } from '../../../store/api/productApiSlice'
import { useGetFavoriteItemsQuery } from '../../../store/api/favoriteApiSlice'
import SimiliarCard from './SimiliarCard'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'

const Similiar = ({ tag }) => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const token = cookies.accessToken
  const favriteItems = useSelector((state) => state.favorites)

  const { data } = useGetProductsQuery()
  const { data: favoriteList } = useGetFavoriteItemsQuery()
  let items
  items = data
    ?.filter((item) => item.tags.includes(tag[3]))
    .filter((item) => item.tags.includes(tag[2]))

  return (
    <div className="pl-5">
      <div className="flex justify-between pr-5 items-center">
        <h4 className="font-bold my-4">비슷한 상품</h4>
        <span className="text-sm text-black-600 font-medium">더보기</span>
      </div>
      <div className="flex gap-5 overflow-x-scroll">
        {items ? (
          items?.map((item, idx) => (
            <SimiliarCard
              item={item}
              favorites={token ? favoriteList : favriteItems}
              token={token}
              key={idx}
            />
          ))
        ) : (
          <div className="px-5 text-xs text-black-600">
            비슷한 상품이 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

export default Similiar
