import React, { useState, useRef } from 'react'
import ContentBox from './ContentBox'
import Modal from '../../common/Modal'
import useOutSideHook from '../../../hook/useOutSideHook'
import { useNavigate } from 'react-router-dom'

const QnAList = ({ questions }) => {
  const navigate = useNavigate()
  const [modalFlag, setModalFlag] = useState(false)

  const modalRef = useRef(null)
  useOutSideHook(modalRef, () => {
    setModalFlag((prev) => !prev)
  })

  return (
    <>
      {questions.length === 0 && (
        <>
          <div className="w-full text-center pt-5 mt-5">
            문의 내역이 없습니다
          </div>
        </>
      )}
      {questions.map((item) => (
        <ContentBox
          id="test"
          item={item}
          key={item.id}
          ModalControlHandler={() => setModalFlag((prev) => !prev)}
        />
      ))}
      {modalFlag && (
        <Modal
          onClick={() => setModalFlag((prev) => !prev)}
          title="비공개 글입니다."
        ></Modal>
      )}
    </>
  )
}

export default QnAList
