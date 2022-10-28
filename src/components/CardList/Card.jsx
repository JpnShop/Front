import React, { useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cls } from '../../utils'
import HeartIcon from '../common/HeartIcon'
import {
  useAddFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} from '../../store/api/favoriteApiSlice'

function Card({ data, purchase, favorites }) {
  const { brand, productName, thumbnail, price, sale } = data
  const saleCost = parseInt((price * (100 - sale)) / 100)
  const location = useLocation().pathname
  const navigate = useNavigate()
  const [addFavoriteItem] = useAddFavoriteItemMutation()
  const [deleteFavoriteItem] = useDeleteFavoriteItemMutation()
  const isFavorite = useMemo(
    () => favorites?.some((element) => element.productId === data.productId),
    [favorites, data],
  )
  const onHeartClick = useCallback(
    (e) => {
      e.stopPropagation()
      isFavorite
        ? deleteFavoriteItem({ product_id: data.productId })
        : addFavoriteItem({ product_id: data.productId })
    },
    [isFavorite, data],
  )

  return (
    <div onClick={() => navigate(`/product/${data.productId}`)}>
      <div className="relative">
        <div className="w-full bg-cover overflow-hidden relative justify-center after:content('') after:block after:pb-[100%]">
          <img src={thumbnail} alt={productName} className="absolute" />
        </div>
        {!purchase && (
          <div
            onClick={onHeartClick}
            className="absolute w-[13%] max-w-[35px] top-2.5 right-2.5"
          >
            <HeartIcon off={!isFavorite} size="25px" />
          </div>
        )}
      </div>
      <div className={purchase ? '' : 'px-5 pt-2.5 pb-7'}>
        <div>
          <div
            className={cls(
              'font-bold',
              purchase ? 'text-xs pt-2 pb-1 truncate' : 'text-sm',
            )}
          >
            {brand}
          </div>
          <div
            className={cls(
              'font-normal text-black-800',
              purchase
                ? 'text-[10px] overflow-hidden line-clamp-2 md:line-clamp-none'
                : 'text-xs truncate',
            )}
          >
            {productName}
          </div>
          {!purchase && (
            <div className="test-xs font-medium text-black-600">
              {price.toLocaleString()} ¥
            </div>
          )}
        </div>
        {!purchase ||
          (!location.includes('recent-view') && (
            <div className="flex text-sm font-bold">
              <div className="text-primary mr-3">{sale}%</div>
              <div className="text-black-100">
                {saleCost.toLocaleString()} ¥
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Card
