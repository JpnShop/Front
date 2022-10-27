import React, { useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import HeartIcon from '../../common/HeartIcon'
import Coupon from '../../common/Coupon'
import { ReactComponent as GoBackIcon } from '/public/assets/back-on.svg'
import { ratingStar } from '../../../utils/star'
import { useGetProductReviewsCountQuery } from '../../../store/api/reviewApiSlice'
import {
  useAddFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} from '../../../store/api/favoriteApiSlice'

const Explanation = ({ list, favorites }) => {
  const { brand, productName, price, sale, star } = list
  const params = useParams()
  const [addFavoriteItem] = useAddFavoriteItemMutation()
  const [deleteFavoriteItem] = useDeleteFavoriteItemMutation()
  const isFavorite = useMemo(
    () => favorites?.some((element) => element.productId === list.productId),
    [favorites, list],
  )
  const onHeartClick = useCallback(() => {
    console.log('클릭')
    isFavorite
      ? deleteFavoriteItem({ product_id: list.productId })
      : addFavoriteItem({ product_id: list.productId })
  }, [isFavorite, list])
  const { data: questionCount } = useGetProductReviewsCountQuery(params.id)
  return (
    <div className="w-full flex-1 mt-5 pb-2">
      <div className="pl-5 pr-5 border-b border-black-200 flex-grow pb-7">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-1">
            <span className="text-color-800 text-sm font-bold">{brand}</span>
            <GoBackIcon className="rotate-180 w-[14px] h-[14px]" />
          </div>
          <div onClick={onHeartClick}>
            <HeartIcon off={!isFavorite} size="22px" />
          </div>
        </div>
        <h2 className="mt-5 font-bold">{productName}</h2>
        <div className="flex items-center my-3">
          <div
            className="ratingStar mr-3"
            style={{
              backgroundPositionY: ratingStar(star),
            }}
          ></div>
          <span className="text-black-600 text-xs underline">
            {!questionCount
              ? '작성된 리뷰가 없습니다.'
              : `{questionCount}개의 리뷰보기`}
          </span>
        </div>
        <div className="flex items-end mt-2">
          <div className="flex flex-col mr-4">
            <span className="text-black-400 text-xs line-through items-center">
              {price.toLocaleString()} ¥
            </span>
            <span className="text-xl font-bold text-primary mr-2">{sale}%</span>
          </div>
          <div className="flex-grow text-xl font-bold">
            ¥{parseInt((price * (100 - sale)) / 100).toLocaleString()}
          </div>
          <div className="text-white bg-point py-2 px-3.5 rounded-[5px] font-medium">
            {/* {price > 5000 && '무료배송 상품'} */}
            무료배송 상품
          </div>
        </div>
      </div>
      <Coupon>
        <span className="mr-5 text-primary font-bold">40%</span>
        <span className="mr-1 font-bold">
          ¥ {parseInt((price * (100 - sale)) / 100).toLocaleString()}
        </span>
      </Coupon>
    </div>
  )
}

export default Explanation
