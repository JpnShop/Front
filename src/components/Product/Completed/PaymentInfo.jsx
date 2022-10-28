import React from 'react'
import { useGetUserInfoQuery } from '../../../store/api/userApiSlice'

const PaymentInfo = ({ items, paymathod, createDate }) => {
  const { data } = useGetUserInfoQuery()
  return (
    <>
      <div className="py-9">
        <h3>결제정보</h3>
        <div className=" mt-[20px] w-full text-sm border-b border-black-100">
          <div className="grid  grid-cols-2 border-t border-black-200 leading-9  py-1">
            <div className="text-black-400">결제방법</div>
            <div className="text-black-800">{paymathod}</div>
          </div>
          <div className="grid  grid-cols-2  border-t border-black-200 leading-9  py-1">
            <div className="text-black-400">주문접수일시</div>
            <div className="text-black-800">
              {createDate.getFullYear()}.{createDate.getMonth() + 1}.
              {createDate.getDate()}
            </div>
          </div>
          <div className="grid  grid-cols-2  border-t border-black-200 leading-9 py-1">
            <div className="text-black-400">결제완료일시</div>
            <div className="text-black-800">
              {' '}
              {createDate.getFullYear()}.{createDate.getMonth() + 1}.
              {createDate.getDate()}
            </div>
          </div>
          <div className="grid  grid-cols-2  border-t border-black-200 leading-9  py-1">
            <div className="text-black-400">할인금액</div>
            <div className="text-black-800">
              ¥{' '}
              {items
                ?.reduce(
                  (acc, cur) =>
                    parseInt((cur.price * cur.sale) / 100) * cur.count + acc,
                  0,
                )
                .toLocaleString()}
            </div>
          </div>
          <div className="grid  grid-cols-2  border-t border-black-200 leading-9  py-1">
            <div className="text-black-400">배송비</div>
            <div className="text-black-800">¥ 0</div>
          </div>
        </div>
        <div className="grid  grid-cols-2 mt-5 text-base font-bold">
          <div>결제금액</div>
          <div className="text-primary">
            ¥
            {items
              ?.reduce(
                (acc, cur) =>
                  parseInt((cur.price * (100 - cur.sale)) / 100) * cur.count +
                  acc,
                0,
              )
              .toLocaleString()}
          </div>
        </div>
      </div>
      <div className="py-9">
        <h3>배송정보</h3>
        <div className=" mt-[20px] w-full text-sm border-b border-black-100">
          <div className="grid  grid-cols-2 border-t border-black-200 leading-9  py-1">
            <div className="text-black-400">받으시는 분</div>
            <div className="text-black-800">유키</div>
          </div>
          <div className="grid  grid-cols-2  border-t border-black-200 leading-9  py-1">
            <div className="text-black-400">휴대폰 번호</div>
            <div className="text-black-800">1234-12-1234</div>
          </div>
          <div className="grid  grid-cols-2  border-t border-black-200 leading-9 py-1">
            <div className="text-black-400">이메일</div>
            <div className="text-black-800">yuki123@google.com</div>
          </div>
          <div className="grid  grid-cols-2  border-t border-black-200 py-1">
            <div className="text-black-400">주소</div>
            <div className="text-black-800">
              Tōkyō-to, Shibuya-ku, Jinnan,1 Chome−20−9 公園通りビル
            </div>
          </div>
        </div>
        <ul className="mt-3 text-[10px] leading-[14.48px] text-black-400">
          <li className="relative before:absolute  before:content-['']  before:bg-black-200  before:w-[3px]  before:h-[3px]  before:rounded-full  before:top-[5px] before:left-[-6px]">
            상품이 품절되는 경우 주문이 자동으로 취소되며, 주문하신 분의
            이메일로 관련 안내를 발송해 드립니다.
          </li>
          <li className="relative before:absolute  before:content-['']  before:bg-black-200  before:w-[3px]  before:h-[3px]  before:rounded-full  before:top-[5px] before:left-[-6px]">
            상세내역은 마이페이지에서 확인하실 수 있습니다.
          </li>
        </ul>
      </div>
    </>
  )
}

export default PaymentInfo
