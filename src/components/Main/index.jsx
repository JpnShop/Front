import React, { useState } from 'react'
import Magazine from './Magazine'
import TabList from './TabList'
import TodayRecommended from './TodayRecommended'
const tablist = ['우먼', '맨', '라이프', '한국트렌드', '', '', '']

const Main = () => {
  const [category, setCategory] = useState(tablist[0])
  const changeCateogry = (e) => {
    setCategory(tablist[e.activeIndex])
  }
  return (
    <>
      <Magazine category={category} />
      <TabList
        tablist={tablist}
        changeCateogry={changeCateogry}
        setCategory={setCategory}
      />
      <TodayRecommended category={category} />
    </>
  )
}

export default Main
