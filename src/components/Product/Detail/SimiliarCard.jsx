import React, { useMemo, useCallback } from 'react'
import HeartIcon from '../../common/HeartIcon'
import {
  useAddFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} from '../../../store/api/favoriteApiSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeFavoriteItems } from '../../../store/slices/favoriteSlice'

const SimiliarCard = ({ item, favorites, token }) => {
  const [addFavoriteItem] = useAddFavoriteItemMutation(undefined, {
    skip: !token,
  })
  const [deleteFavoriteItem] = useDeleteFavoriteItemMutation(undefined, {
    skip: !token,
  })
  const isFavorite = useMemo(
    () => favorites?.some((element) => element.productId === item.productId),
    [favorites, item],
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const goDetailPage = (e) => {
    navigate(`/product/${item.productId}`)
  }
  const onHeartClick = useCallback(
    (e) => {
      e.stopPropagation()
      token
        ? isFavorite
          ? deleteFavoriteItem({ product_id: item.productId })
          : addFavoriteItem({ product_id: item.productId })
        : dispatch(changeFavoriteItems({ productId: item.productId }))
    },
    [isFavorite, item],
  )

  return (
    <div onClick={goDetailPage}>
      <div
        className="w-[150px] h-[150px] bg-cover"
        style={{
          backgroundImage: `url(${item.thumbnail})`,
        }}
      ></div>
      <div className="w-[150px] flex justify-between items-center mt-1 px-2">
        <span className="text-sm font-bold truncate overflow-ellipsis w-[130px]">
          {item.brand}
        </span>
        <div onClick={onHeartClick}>
          <HeartIcon size="17" off={!isFavorite} />
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
