import React, { useMemo } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import './TopSwiper.css'
import Slide from './Slide'

const TopSwiper = () => {
  const postList = useMemo(() => {
    return [
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '오늘의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '내일의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '모래의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '내일의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '영서의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '휘린의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '인석의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '다영의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '하이의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
      {
        src: 'https://ifh.cc/g/6aO2yl.jpg',
        title: '바이의  \n패션 컬랙션북',
        description: '어라운드앤의 감성 컬렉션',
      },
    ]
  })
  SwiperCore.use([Autoplay, Pagination])

  return (
    <div>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        className="topslide"
      >
        {postList.map((element, index) => {
          return (
            <SwiperSlide className="topslide" key={index}>
              <Slide className="topslide" item={element} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default TopSwiper