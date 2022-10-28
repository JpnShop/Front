import React, { useState } from 'react'
import { cls } from '../../utils'
import MemberInfo from './MemberInfo'
import UserInfo from '../../pages/SignUp/UserInfo'
import { ReactComponent as GoBackIcon } from '/public/assets/back-on.svg'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetInfo, changeInfo } from '../../store/slices/shippingInfoSlice'
import { useGuestAddInfoMutation } from '../../store/api/orderApiSlice'
import { useGetUserInfoQuery } from '../../store/api/orderApiSlice'
import { useCookies } from 'react-cookie'

const ShippingInfo = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const token = cookies.accessToken
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const toggleBtn = () => {
    setOpen((prev) => !prev)
  }
  const data = useSelector((state) => state.shippingInfo)
  const [guestAddInfo] = useGuestAddInfoMutation()
  const { data: result } = useGetUserInfoQuery()
  const saveShippinInfo = async () => {
    try {
      const response = await guestAddInfo({
        address: {
          city: data?.city,
          street: data?.street,
          zipcode: data?.zipcode,
        },
        furiganaFirst: data?.furiganaFirst,
        firstName: data?.firstName,
        furiganaLast: data?.furiganaLast,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
      })
      console.log(response)
      if (!response?.error) {
        alert('주소지가 저장되었습니다.')
      } else {
        throw response.error
      }
    } catch (err) {
      alert(err.data.msg)
    } finally {
      // 서버 에러 해결 후 정리
      dispatch(resetInfo())
      setOpen(false)
    }
  }
  return (
    <>
      <div className="border-b border-black-200 py-5">
        <div className="flex items-center " onClick={toggleBtn}>
          <h3 className="px-5 flex-grow font-bold">배송정보</h3>
          <GoBackIcon
            width="14px"
            height="14px"
            className={cls('mr-5', open ? 'rotate-90' : '-rotate-90')}
          />
        </div>
        {open && (
          <>
            {token ? (
              <MemberInfo />
            ) : (
              <div className="px-5">
                <UserInfo onClickHndler={toggleBtn} />
                <div className="flex justify-end">
                  <div
                    className="text-sm rounded py-2 px-3 bg-point text-white w-[120px] text-center"
                    onClick={saveShippinInfo}
                  >
                    저장하기
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default ShippingInfo
