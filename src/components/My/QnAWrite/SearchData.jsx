import React from 'react'

const SearchData = ({ items, setDataId, setIsOpen }) => {
  const onClickHandelr = (id) => {
    setDataId(id)
    alert('상품이 선택되었습니다')
    setIsOpen((prev) => !prev)
  }
  return (
    <>
      <div className="w-full grid grid-cols-3 gap-2">
        {items.length !== 0 &&
          items?.map(({ thumbnail, productName, brand, productId }) => (
            <div key={productId} onClick={() => onClickHandelr(productId)}>
              <div
                className="bg-cover overflow-hidden relative w-[calc((100vw-48px)/3)] h-[calc((100vw-48px)/3)]"
                style={{
                  backgroundImage: `url(${thumbnail})`,
                }}
              ></div>
              <div className="w-[calc((100vw-48px)/3)] mt-[6px]">
                <div className="text-[14px] font-bold">{brand}</div>
                <div className="text-[10px] text-black-800 truncate">
                  {productName}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full flex items-center ">
        {items.length === 0 && (
          <span className="whitespace-nowrap text-center text-sm">
            문의 관련 상품을 검색해주세요.
          </span>
        )}
      </div>
    </>
  )
}

export default SearchData
