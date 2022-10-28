import React, { useMemo, useCallback } from 'react'
import HeartIcon from '../../common/HeartIcon'
import {
  useAddFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} from '../../../store/api/favoriteApiSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeFavoriteItems } from '../../../store/slices/favoriteSlice'

const AnotherCard = ({ item, favorites, token }) => {
  const dispatch = useDispatch()
  const { thumbnail, productName, price, sale } = item
  const [addFavoriteItem] = useAddFavoriteItemMutation()
  const [deleteFavoriteItem] = useDeleteFavoriteItemMutation()
  const isFavorite = useMemo(
    () => favorites?.some((element) => element.productId === item.productId),
    [favorites, item],
  )
  const onHeartClick = useCallback(
    (e) => {
      e.stopPropagation()
      token
        ? isFavorite
          ? deleteFavoriteItem({ product_id: item.productId })
          : addFavoriteItem({ productId: item.productId })
        : dispatch(changeFavoriteItems({ productId: item.productId }))
    },
    [isFavorite, item],
  )
  const navigate = useNavigate()
  const goDetailPage = (e) => {
    navigate(`/product/${item.productId}`)
  }
  return (
    <div onClick={goDetailPage}>
      <div
        className="new-style w-[142px] h-[142px] bg-cover rounded-full overflow-hidden border-primary border"
        style={{
          backgroundImage: `url(${thumbnail})`,
        }}
      ></div>
      <p className="px-2 mt-3 text-[10px] text-black-800 truncate w-[142px]">
        {productName}
      </p>
      <div className="px-2 flex justify-between items-center  pb-2">
        <div>
          <span className="text-primary text-sm mr-3 font-bold">{sale} %</span>
          <span className="text-sm font-bold">
            {parseInt((price * (100 - sale)) / 100).toLocaleString()} ¥
          </span>
        </div>
        <div onClick={onHeartClick}>
          <HeartIcon size="17" off={!isFavorite} />
        </div>
      </div>
    </div>
  )
}

export default AnotherCard
