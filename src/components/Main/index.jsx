import React, { useState } from 'react'
import Header from '../layout/Header'
import Magazine from './Magazine'
import TabList from './TabList'
import TodayBest from './TodayBest'
import Lastest from './Latest'
import { TodayLank } from './TodayLank'
import TodayRecommended from './TodayRecommended'
import TopSwiper from './TopSwiper'
import { useGetProductsQuery } from '../../store/api/productSlice'

const tablist = ['우먼', '맨', '라이프', '한국트렌드', '', '', '']

const Main = () => {
  const [category, setCategory] = useState(tablist[0])
  const changeCateogry = (e) => {
    setCategory(tablist[e.activeIndex])
  }
  const { data } = useGetProductsQuery()
  console.log(data)
  return (
    <>
      <Header />
      <div className="pt-[54px]">
        <TopSwiper />
        <Lastest />
        <Magazine category={category} />
        <TabList
          tablist={tablist}
          changeCateogry={changeCateogry}
          setCategory={setCategory}
        />
        <TodayBest category={category} />
        <TodayLank category={category} />
        <TodayRecommended category={category} />
      </div>
    </>
  )
}

export default Main
