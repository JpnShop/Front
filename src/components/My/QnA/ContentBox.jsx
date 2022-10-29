import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackIcon from '../../common/BackIcon'
import PublicContent from './PublicContent'
import PrivateContent from './PrivateContent'
import Modal from '../../common/Modal'

const ContentBox = ({ item, ModalControlHandler }) => {
  const navigate = useNavigate()

  const viewDetail = () => {
    if (item.privateYn) {
      return ModalControlHandler()
    }
    navigate(`/my/qna/${item?.id}`)
  }

  return (
    <>
      <div className="mb-5 px-5">
        <div className="flex items-center justify-between py-4 ">
          <p className="font-bold">{item?.createdDate?.slice(0, -9)}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs" onClick={viewDetail}>
              답변상세보기
            </span>
            <BackIcon fill="#252525" size={14} className="rotate-180" />
          </div>
        </div>
        {item.privateYn ? (
          <PrivateContent item={item} />
        ) : (
          <PublicContent item={item} />
        )}
      </div>
      <div className="w-full h-[10px] bg-white-200 "></div>
    </>
  )
}

export default ContentBox
