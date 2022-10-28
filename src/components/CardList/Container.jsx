import React from 'react'
import Card from './Card'
import NoList from './NoList'
import {
  useAddFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} from '../../store/api/favoriteApiSlice'
import { useGetFavoriteItemsQuery } from '../../store/api/favoriteApiSlice'
function Container({ list, pt = 'pt-52' }) {
  const { data: favorites } = useGetFavoriteItemsQuery()

  return (
    <div className={`${pt}`}>
      {list && list.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-[2px]">
          {list.map((item, idx) => (
            <Card key={idx} data={item} favorites={favorites} />
          ))}
        </div>
      ) : (
        <div className="pt-28">
          <NoList title={'최근 본 상품이 없습니다'} />
        </div>
      )}
    </div>
  )
}

export default Container
