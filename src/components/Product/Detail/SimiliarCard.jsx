import React, { useMemo, useCallback } from 'react'
import HeartIcon from '../../common/HeartIcon'
import {
  useAddFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} from '../../../store/api/favoriteApiSlice'

const SimiliarCard = ({ item, favorites }) => {
  const [addFavoriteItem] = useAddFavoriteItemMutation()
  const [deleteFavoriteItem] = useDeleteFavoriteItemMutation()
  const isFavorite = useMemo(
    () => favorites?.some((element) => element.productId === item.productId),
    [favorites, item],
  )

  const onHeartClick = useCallback(() => {
    isFavorite
      ? deleteFavoriteItem({ product_id: item.productId })
      : addFavoriteItem({ product_id: item.productId })
  }, [isFavorite, item])

  return (
    <div>
      <div
        className="w-[130px] h-[131px] bg-cover"
        style={{
          backgroundImage: `url(${item.thumbnail})`,
        }}
      ></div>
      <div className="flex justify-between items-center mt-1 px-2">
        <span className="text-sm font-bold truncate overflow-ellipsis w-[130px]">
          {item.brand}
        </span>
        <div onClick={onHeartClick}>
          <HeartIcon size="15" off={!isFavorite} />
        </div>
      </div>
      <div className=" overflow-ellipsis text-[10px] text-black-800 truncate w-[125px] px-2 mt-2">
        {item.productName}
      </div>
      <div className="px-2 flex justify-between items-center border-b border-primary pb-2">
        <span className="text-primary text-sm">{item.sale} %</span>
        <span className="text-sm">
          {parseInt((item.price * (100 - item.sale)) / 100).toLocaleString()} ¥
        </span>
      </div>
    </div>
  )
}

export default SimiliarCard
