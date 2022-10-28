import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import 'swiper/css'
import '~/todayBest_swiper.css'
import { useGetProductsQuery } from '../../../store/api/productApiSlice'
import {
  womanBestList,
  manBestList,
  lifeBestList,
  koreaBestList,
} from '../../../dummy/main'

const SwiperContainer = ({ category }) => {
  const { data } = useGetProductsQuery()
  let list
  switch (category) {
    case '우먼':
      list = data.filter((item) => item.tags.includes('women'))
      break
    case '맨':
      list = data.filter((item) => item.tags.includes('men'))
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
          <SwiperSlide key={item.productId}>
            {({ isActive }) => <Card product={item} active={isActive}></Card>}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperContainer
