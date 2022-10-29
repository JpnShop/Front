import React from 'react'

const OrderProductInfo = ({ items }) => {
  return (
    <div className="py-9 border-b border-black-200">
      <h3 className="mb-3.5">주문상품정보</h3>
      {items.map(
        ({ productId, thumbnail, price, count, brand, productName, sale }) => (
          <div className="flex mt-3" key={productId}>
            <div
              className="mr-5 relative flex-shrink w-[100px] h-[100px] bg-cover  overflow-hidden "
              style={{
                backgroundImage: `url(${thumbnail})`,
              }}
            ></div>
            <div className="flex flex-col gap-2 w-[calc(100vw-120px)]">
              <p className="text-sm font-bold">{brand}</p>
              <p className="text-xs text-black-800">{productName}</p>
              <p className="text-xs text-black-600">
                {(
                  parseInt((price * (100 - sale)) / 100) * count
                ).toLocaleString()}{' '}
                ¥{' '}
              </p>
              <div className="text-sm font-bold flex justify-between">
                <div className="text-primary">{count}개 </div>
                <div>결제완료</div>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  )
}

export default OrderProductInfo
