import React, { useMemo, useCallback } from 'react'
import HeartIcon from '../../common/HeartIcon'
import cart from '/public/assets/bag-black.svg'
import { useNavigate } from 'react-router-dom'
import { cls } from '../../../utils'
import { useAddCartItemMutation } from '../../../store/api/cartApiSlice'
import {
  useAddFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} from '../../../store/api/favoriteApiSlice'
import { useDispatch } from 'react-redux'
import { changeFavoriteItems } from '../../../store/slices/favoriteSlice'

const Card = ({ product, active, favorites, token }) => {
  const { detailThumbList, thumbnail, productName, sale, price, productId } =
    product
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const goDetailPage = (e) => {
    navigate(`/product/${productId}`)
  }
  const [addCartItem] = useAddCartItemMutation()
  const [addFavoriteItem] = useAddFavoriteItemMutation(undefined, {
    skip: !token,
  })
  const [deleteFavoriteItem] = useDeleteFavoriteItemMutation(undefined, {
    skip: !token,
  })
  const isFavorite = useMemo(
    () => favorites?.some((element) => element.productId === product.productId),
    [favorites, product],
  )
  const onHeartClick = useCallback(
    (e) => {
      e.stopPropagation()
      token
        ? isFavorite
          ? deleteFavoriteItem({ product_id: product.productId })
          : addFavoriteItem({ product_id: product.productId })
        : dispatch(changeFavoriteItems({ productId: product.productId }))
    },
    [isFavorite, product],
  )

  const addCartHandler = (e) => {
    e.stopPropagation()
    addCartItem({
      product_id: productId,
      count: 1,
    })
  }
  return (
    <div className="w-[230px] h-80 mb-24" onClick={goDetailPage}>
      <div
        className={cls(
          'w-[230px] h-[230px] bg-cover bg-center rounded-full overflow-hidden',
          active ? 'border-2 border-primary' : 'border-2 border-black-200',
        )}
      >
        <img src={thumbnail} alt={productName} />
      </div>
      <div className="mt-8 relative">
        <div className="text-sm text-black-800 font-medium mt-7.5">
          [{productName}]
        </div>
        <div className="text-xl text-black-100 font-bold mt-1.5">
          <span className="text-primary mr-2.5">{sale}%</span>
          {parseInt((price * (100 - sale)) / 100).toLocaleString()} ¥
        </div>
        {active ? (
          <div className="absolute flex right-1 bottom-0 gap-3">
            <div onClick={onHeartClick}>
              <HeartIcon size="25" off={!isFavorite} fill={'#000'} />
            </div>
            <img
              src={cart}
              alt="cart"
              width="25"
              hegiht="25"
              onClick={addCartHandler}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Card
