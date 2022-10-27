import React, { useState } from 'react'
import HeartIcon from '../../common/HeartIcon'
import cart from '/public/assets/bag-black.svg'
import { useNavigate } from 'react-router-dom'
import { cls } from '../../../utils'

const Card = ({ product, active }) => {
  const { detailThumbList, thumbnail, productName, sale, price, productId } =
    product
  const [favorite, setFavorite] = useState(product?.liked ? true : false)
  const navigate = useNavigate()
  const onClick = (e) => {
    e.stopPropagation()
    setFavorite((prev) => !prev)
  }
  const goDetailPage = (e) => {
    navigate(`/product/${productId}`)
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
            <div onClick={onClick}>
              <HeartIcon size="25" off={favorite} fill={'#000'} />
            </div>
            <img src={cart} alt="cart" width="25" hegiht="25" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Card
