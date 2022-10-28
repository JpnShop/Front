import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { detailProducts } from '../../../dummy/detail'
import { useGetProductQuery } from '../../../store/api/productApiSlice'
import { useGetProductsQuery } from '../../../store/api/productApiSlice'
import AnotherCard from './AnotherCard'
import { useGetFavoriteItemsQuery } from '../../../store/api/favoriteApiSlice'

const Another = () => {
  const params = useParams()
  const { data } = useGetProductQuery(params.id)
  const { data: favoriteList } = useGetFavoriteItemsQuery()
  const navigate = useNavigate()
  const { data: datas } = useGetProductsQuery()
  const list = datas?.filter((item) => item.brand === data.brand)

  return (
    <div className="pl-5">
      <div className="flex justify-between pr-5 items-center">
        <h4 className="font-bold my-4">브랜드의 다른상품</h4>
        <span className="text-sm text-black-600 font-medium">더보기</span>
      </div>
      <div className="flex gap-5 overflow-x-scroll">
        {list?.map((item) => (
          <div key={item.productId}>
            <AnotherCard item={item} favorites={favoriteList} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Another
