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

const tablist = ['우먼', '맨', '라이프', '한국트렌드']

const Main = () => {
  const [category, setCategory] = useState('우먼')
  return (
    <>
      <Header />
      <div className="pt-[54px]">
        <TopSwiper />
        <Lastest />
        <Magazine category={category} />
        <TabList tablist={tablist} setCategory={setCategory} />
        <TodayBest category={category} />
        <TodayLank category={category} />
        <TodayRecommended category={category} />
      </div>
    </>
  )
}

export default Main
