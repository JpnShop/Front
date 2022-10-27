import React, { useState } from 'react'
import { ReactComponent as GoBackIcon } from '/public/assets/back-on.svg'
import { cls } from '../../utils'
const payway = ['신용/체크카드', '무통장입금', '애플페이', '라인페이']

const PayWay = ({ paymathod, onClick }) => {
  const [open, setOpen] = useState(false)
  const toggleBtn = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div className="border-b border-primary">
      <div className="flex px-5  " onClick={toggleBtn}>
        <h4 className="flex-grow font-bold border-b py-5">결제 방법</h4>
        <div className="flex items-center">
          <GoBackIcon
            width="14px"
            height="14px"
            className={cls(open ? 'rotate-90' : '-rotate-90')}
          />
        </div>
      </div>
      {open && (
        <div className="grid grid-rows-2 grid-cols-2 px-5 py-5 gap-5">
          {payway.map((item, idx) => (
            <div
              key={idx}
              className={cls(
                'rounded flex items-center justify-center w-[162px] h-[52px] border border-black-400',
                paymathod === item
                  ? 'bg-point text-white-200 '
                  : 'bg-white-200 text-black-800 ',
              )}
              onClick={() => onClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default PayWay
