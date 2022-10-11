import React from 'react'
import { cls } from '../../utils'
import heart from '/public/assets/heart-on.svg'

function Card({ data, purchase }) {
  const { brand, productName, thumbnail, price, sale } = data
  const saleCost = parseInt((price * (100 - sale)) / 100)

  return (
    <div>
      <div className="relative">
        <div className="w-full bg-cover overflow-hidden relative justify-center after:content('') after:block after:pb-[100%]">
          <img src={thumbnail} alt={productName} className="absolute" />
        </div>
        {!purchase && (
          <div className="absolute w-[13%] max-w-[35px] top-2.5 right-2.5">
            <img src={heart} alt="heart" />
          </div>
        )}
      </div>
      <div className={purchase ? '' : 'px-5 py-2.5'}>
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
            <div className="test-xs font-medium text-black-600">{price} ¥</div>
          )}
        </div>
        {!purchase && (
          <div className="flex text-sm font-bold">
            <div className="text-primary mr-3">{sale}%</div>
            <div className="text-black-100">{saleCost} ¥</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
