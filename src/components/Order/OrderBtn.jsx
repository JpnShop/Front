import React from 'react'
import { cls } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useAddOrdersMutation } from '../../store/api/orderApiSlice'
import { useDispatch } from 'react-redux'
import { resetCount } from '../../store/slices/productSlice'

const OrderBtn = ({ items, paymathod }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [addOrders, { isLoading, isError, isSuccess }] = useAddOrdersMutation()
  const products = items.map((item) => {
    return {
      totalOrders: {
        productId: item.productId,
        count: item.count,
      },
    }
  })
  const [product] = products
  const paynowHandler = async () => {
    try {
      const orderData = await addOrders({ ...product, paymathod })
      const createDate = new Date()
      navigate('/order/completed', { state: { items, paymathod, createDate } })
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        dispatch(resetCount())
      }, 2000)
    }
  }
  const [item] = items
  return (
    <div className="hover:cursor-pointer fixed bottom-0 left-0 right-0 z-50 ">
      <div
        className={cls(
          'h-[80px] gap-4 w-full flex justify-center items-center text-white-200 bg-point pb-6 text-lg',
        )}
        onClick={() => paynowHandler(item.productId)}
      >
        <span className="px-1">
          총 {items?.reduce((acc, cur) => cur.count + acc, 0).toLocaleString()}
          개
        </span>
        <div className="w-[1px] h-[18px] bg-white"></div>
        <div className="px-1">
          {items
            ?.reduce(
              (acc, cur) =>
                ((cur.price * (100 - cur.sale)) / 100) * cur.count + acc,
              0,
            )
            .toLocaleString()}
          ¥<span className="pl-3">결제하기</span>
        </div>
      </div>
    </div>
  )
}

export default OrderBtn
