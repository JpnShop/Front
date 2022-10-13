import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../../store/api/productSlice'
import MainSlide from './MainSlide'
import Explanation from './Explanation'
import DetailDesc from './DetailDesc'
import Relation from './Magazine'
import SubContent from './SubContent'
import DetailBtn from './DetailBtn'
import Brand from './Brand'
import Loading from '../../layout/Loading'
import ErrorCom from '../../common/ErrorCom'
import { useDispatch } from 'react-redux'
import GoTop from '../../common/GoTop'

const Detail = () => {
  const { id } = useParams()
  const { data: list, isLoading, isError } = useGetProductQuery(id)
  const [showButton, setShowButton] = useState(false)
  const [kakaoShare, setKakaoShare] = useState(false)
  const recentViewProduct = 'recentViewProduct'

  useEffect(() => {
    // 카카오 sdk 추가
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => setKakaoShare(true)
    // return () => {
    //   document.body.removeChild(script)
    // }
  }, [])

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(recentViewProduct))

    // local에 저장된 '최근 본 상품'이 없다면 key값을 설정하고 그 product id만 로컬에 저장 후 return
    if (!local) {
      window.localStorage.setItem(recentViewProduct, JSON.stringify([id]))
      return
    }

    // 이전에 본 기록이 있는 product id는 지운 후, 맨 앞에서 추가
    local.map((item, idx) => {
      if (item === id) local.splice(idx, 1)
    })

    // 최근 본 상품 최대 20개만 저장
    if (local.length >= 20) local.pop()

    // 새로운 product id를 맨 앞으로 저장
    window.localStorage.setItem(
      recentViewProduct,
      JSON.stringify([id, ...local]),
    )
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorCom Title="에러 발생" />
      ) : (
        list && (
          <div className="relative mb-10">
            <MainSlide list={list.detailThumbList} />
            <Explanation list={list} />
            <Brand list={list} />
            <DetailDesc list={list.detailList} />
            <div className="w-full h-[10px] bg-white-200 my-8"></div>
            <Relation />
            <div className="w-full h-[10px] bg-white-200 my-8"></div>
            <SubContent />
            <DetailBtn list={list} kakaoShareBtn={kakaoShare} />
            <GoTop />
          </div>
        )
      )}
    </>
  )
}

export default Detail
