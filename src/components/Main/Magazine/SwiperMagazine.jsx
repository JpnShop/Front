import React, { useState } from 'react'
import HeartIcon from '../../common/HeartIcon'
import {
  magazineWoman,
  magazineMan,
  lifeMagize,
  koreaMagazine,
} from '../../../dummy/main'
import { useNavigate } from 'react-router-dom'

const SwiperMagazine = ({ category }) => {
  const [like, setLike] = useState(false)
  const navigate = useNavigate()

  let list
  switch (category) {
    case '우먼':
      list = magazineWoman
      break
    case '맨':
      list = magazineMan
      break
    case '라이프':
      list = lifeMagize
      break
    case '한국트렌드':
      list = koreaMagazine
      break
    default:
      return
  }

  return (
    <div className="flex overflow-x-scroll py-[39px] relative px-5">
      {list.map((item, index) => (
        <div
          key={index}
          className="relative mx-5"
          //추후 id 값 넣기
          onClick={() => navigate(`/magazine/${item.id}`)}
        >
          <img src={item.cover} className="] magazine-img" />
          <div className="absolute top-2 right-2">
            <HeartIcon size="23px" fill="#ffffff" off={!item.liked} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SwiperMagazine
