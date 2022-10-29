import React from 'react'

const Card = ({ item }) => {
  return (
    <div className="px-5 flex mb-4 gap-2">
      <div
        className="relative flex-shrink w-[56px] h-[56px] bg-cover rounded-md overflow-hidden "
        style={{
          backgroundImage: `url(${item?.thumbnail})`,
        }}
      ></div>
      <div className="text-xs flex flex-col gap-1">
        <div className="font-bold">{item?.brand}</div>
        <div className="text-black-800">{item?.productName}</div>
      </div>
    </div>
  )
}

export default Card
