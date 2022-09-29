import React from 'react'
const TabList = ({cls, tab, setTab, reviewCount, setReviewCount}) => {
  return (
    <ul className="flex justify-center items-center text-center mt-10">
      <li className={cls('text-sm w-1/2 bg-point p-3.5', tab === 0 ? 'bg-point text-white font-bold' : 'bg-white-200 text-black-200 font-normal')} onClick={()=>{setTab(0)}}>
        <h3>작성 가능한 리뷰 ({reviewCount})</h3>
      </li>
      <li className={cls('text-sm grow p-3.5', tab === 1 ? 'bg-point text-white font-bold' : 'bg-white-200 text-black-200 font-normal')} onClick={()=>{setTab(1)}}>
        <h3>작성한 리뷰 ({reviewCount})</h3>
      </li>
    </ul>
  )
}

export default TabList