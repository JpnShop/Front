import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import heart from '/public/assets/heart-on.svg'
import check from '/public/assets/allCheck.svg'
import notCheck from '/public/assets/allNotCheck.svg'

function Card({ editMode, data, deleteList, setDeleteList }) {
  const { brand, productName, productId, thumbnail, price, sale } = data
  const saleCost = parseInt((price * (100 - sale)) / 100)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (!editMode) {
      setSelected(false)
    }
  }, [editMode])
  return (
    <div>
      <div className="relative">
        <div className="w-full bg-cover overflow-hidden relative justify-center after:content('') after:block after:pb-[100%]">
          <img src={thumbnail} alt={productName} className="absolute" />
        </div>
        <div>
          {editMode ? (
            <div
              className="absolute top-2.5 right-2.5"
              onClick={() => {
                setSelected(!selected)
                if (selected) {
                  setDeleteList(
                    deleteList.filter((name) => name !== productName),
                  )
                } else {
                  setDeleteList([...deleteList, productName])
                }
              }}
            >
              <img
                src={selected ? check : notCheck}
                alt="check"
                className="w-[25px] h-[25px] border-2 border-white rounded-full bg-white"
              />
            </div>
          ) : (
            <div className="absolute w-[13%] max-w-[35px] top-2.5 right-2.5">
              <img src={heart} alt="heart" />
            </div>
          )}
        </div>
      </div>
      <div className="px-5 pt-2.5 pb-7">
        <div>
          <div className="text-sm font-bold">{brand}</div>
          <div className="text-xs font-normal text-black-800 truncate">
            {productName}
          </div>
          <div className="test-xs font-medium text-black-600">
            {price.toLocaleString()} ¥
          </div>
        </div>
        <div className="flex text-sm font-bold">
          <div className="text-primary mr-3">{sale}%</div>
          <div className="text-black-100">{saleCost.toLocaleString()} ¥</div>
        </div>
      </div>
    </div>
  )
}

export default Card
