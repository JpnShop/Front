import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Tab from './Tab'

const TabList = ({ tablist, setCategory }) => {
  return (
    <div className="relative">
      <Swiper
        // install Swiper modules
        className="tablist pl-5 mt-4 pb-20 overflow-y-visible"
        spaceBetween={60}
        loop={true}
        slidesPerView={'auto'}
        slideToClickedSlide={true}
      >
        {tablist.map((item, idx) => (
          <SwiperSlide
            className={
              'tab leading-normal border border-primary rounded-2xl text-center text-xs text-primary whitespace-nowrap'
            }
            key={idx}
          >
            {({ isActive }) => (
              <Tab item={item} isActive={isActive} setCategory={setCategory} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-2.5 bg-white-200 absolute bottom-0"></div>
    </div>
  )
}

export default TabList
