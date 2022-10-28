import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ShippingInfo from './ShippingInfo'
import ProductInfo from './ProductInfo'
import Coupon from '../common/Coupon'
import PayWay from './PayWay'
import TotalPrice from './TotalPrice'
import OrderBtn from './OrderBtn'

// productid로 조회

const index = () => {
  const { state } = useLocation()
  const [paymathod, setPaymathod] = useState({
    en: 'CARD',
    ko: '신용/체크카드',
  })
  const selectHandler = (item) => {
    setPaymathod(item)
  }
  return (
    <>
      <ShippingInfo />
      <ProductInfo items={state} />
      <Coupon />
      <PayWay onClick={selectHandler} paymathod={paymathod} />
      <TotalPrice items={state} />
      <OrderBtn items={state} paymathod={paymathod.ko} />
    </>
  )
}

export default index
