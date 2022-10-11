import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import 'swiper/css'
import '~/todayBest_swiper.css'
import {
  womanBestList,
  manBestList,
  lifeBestList,
  koreaBestList,
} from '../../../dummy/main'

const SwiperContainer = ({ category }) => {
  let list
  switch (category) {
    case '우먼':
      list = womanBestList
      break
    case '맨':
      list = manBestList
      break
    case '라이프':
      list = lifeBestList
      break
    case '한국트렌드':
      list = koreaBestList
      break
    default:
      return
  }

  return (
    <div>
      <Swiper
        slidesPerView={'auto'}
        loop={true}
        spaceBetween={30}
        className="w-full px-5 today"
      >
        {list.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => <Card product={item} active={isActive}></Card>}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperContainer
