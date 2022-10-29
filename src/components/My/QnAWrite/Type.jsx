import React, { useState } from 'react'
import Button from '../../common/Button'
import { cls } from '../../../utils'
import { ReactComponent as Nochecked } from '/public/assets/allNotCheck.svg'
import { ReactComponent as Checked } from '/public/assets/allCheck.svg'
import { useNavigate } from 'react-router-dom'
import InquireProducts from './InquireProducts'

const Type = ({
  types,
  userValue,
  onChangeCheckedHandler,
  dataId,
  setDataId,
}) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const controlOpenHandler = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <>
      <div className="px-5 mb-5">
        <h3 className="font-bold my-5 ">문의 유형</h3>
        <div className="grid grid-cols-2 gap-5 py-5 border-t border-black-200 text-sm">
          {types.map((item, idx) => (
            <React.Fragment key={idx}>
              <div
                onClick={() => onChangeCheckedHandler(idx)}
                className="flex items-center gap-4"
              >
                {userValue.type === types[idx] ? <Checked /> : <Nochecked />}
                <span
                  className={cls(
                    'text-sm text-black-600',
                    userValue.type === types[idx] && 'text-primary',
                  )}
                >
                  {item}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
        {userValue.type !== '기타문의' && (
          <Button
            classprop="bg-primary text-white text-sm"
            onClick={controlOpenHandler}
          >
            문의상품 검색
          </Button>
        )}
      </div>

      <div
        className={cls(
          'transition ease-in-out duration-500',
          isOpen
            ? 'px-5 inset-0 transition-x-full bg-white z-[100] fixed translate-x-0'
            : 'translate-x-full',
        )}
      >
        {isOpen && (
          <InquireProducts
            setIsOpen={setIsOpen}
            onClick={controlOpenHandler}
            setDataId={setDataId}
          />
        )}
      </div>
    </>
  )
}

export default Type
