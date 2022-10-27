import React, { useState, useCallback, useEffect, useMemo } from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode'
import { useNavigate, useLocation } from 'react-router-dom'
import NextBtn from '../../components/common/NextBtn'
import Title from '../../components/SignUp/Title'
import '~/animate.css'
import { useSignupMutation } from '../../store/api/authApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { resetInfo, changeInfo } from '../../store/slices/shippingInfoSlice'
import ErrorCom from '../../components/common/ErrorCom'
import Loader from '../../components/layout/Loader'
import { useCheckEmailQuery } from '../../store/api/authApiSlice'
import Modal from '../../components/common/Modal'
import { cls } from '../../utils'
const EMAIL_REGEX =
  /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

const UserInfo = () => {
  const dispatch = useDispatch()
  const { state, pathname } = useLocation()
  const telOptions = ['Japan(+81)', 'Korea(+82)']
  const [signup, { isLoading, isError }] = useSignupMutation()
  const inputValue = useSelector((state) => state.shippingInfo)
  const [alret, setAlret] = useState({
    email: null,
    lastName: null,
    furiganaFirst: null,
    furiganaLast: null,
    phoneNumber: null,
    zipcode: null,
    city: null,
    street: null,
  })
  const data = useCheckEmailQuery(inputValue.email, {
    skip: inputValue.email && !alret.email && alret.email,
  })
  const [disabled, setDisabled] = useState(false)
  const [openPost, setOpenPost] = useState(false)
  const [animation, setAnimation] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const navigate = useNavigate()
  const onClick = async () => {
    try {
      const signupHandler = await signup({
        username: state.id,
        password: state.pw,
        email: inputValue.email,
        role: null,
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
        phoneNumber: inputValue.country + inputValue.phoneNumber,
        address: {
          city: inputValue.city,
          street: inputValue.street,
          zipcode: inputValue.zipcode,
        },
        furiganaFirst: inputValue.furiganaFirst,
        furiganaLast: inputValue.furiganaLast,
      })
      if (signupHandler?.error.status === 500) {
        return alert('서버에러가 발생했습니다.')
      }
      navigate('/signup/finish')
    } catch (error) {
      alert(error.data.msg)
    } finally {
      dispatch(resetInfo())
    }
  }

  const checkRegex = (inputId) => {
    if (inputId === 'email') {
      EMAIL_REGEX.test(inputValue.email)
        ? setAlret({
            ...alert,
            email: '',
          })
        : setAlret({
            ...alret,
            email: '올바르지 않은 이메일입니다.',
          })
    } else {
      setAlret({
        ...alret,
        [inputId]: '필수 입력값입니다.',
      })
    }
  }

  const ChangeHandler = useCallback((e) => {
    const { name, value } = e.target
    dispatch(changeInfo({ name, value }))
    checkRegex(name)
  })

  const onOpenHandler = () => {
    setOpenPost(true)
    setAnimation('openPost')
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      setAnimation('')
    }, 1000)
  }

  const onCloseHandler = () => {
    setAnimation('closePost')
    document.body.style.overflow = 'auto'
    setTimeout(() => {
      setOpenPost(false)
      setAnimation('')
    }, 1000)
  }

  const onCompleteHandler = (data) => {
    dispatch(changeInfo({ name: 'zipcode', value: data.zonecode }))
    dispatch(changeInfo({ name: 'city', value: data.roadAddress }))
    onCloseHandler()
  }

  useEffect(() => {
    inputValue.email !== '' &&
      inputValue.lastName !== '' &&
      inputValue.furiganaFirst !== '' &&
      inputValue.phoneNumber !== '' &&
      inputValue.zipcode !== '' &&
      setDisabled(true)
  }, [alret])

  const duplicateHandler = () => {
    if (!modalIsOpen && inputValue.email === '') return
    if (alret.email !== '') return
    setModalIsOpen((prev) => !prev)
  }

  useEffect(() => {
    console.log(modalIsOpen)
  }, [modalIsOpen])

  if (isError)
    return <ErrorCom Contents={'회원가입에 실패했습니다 다시 시도해 주세요'} />
  if (isLoading) return <Loader />

  return (
    <div>
      <div className="info">
        {pathname.includes('/signup') && (
          <>
            <Title title="정보" text="입력" />
            <label
              htmlFor="loginJoinMembershipEmail"
              className="mt-[77px] inline-block font-bold leading-4 mb-8"
            >
              이메일
            </label>
            <div className="relative flex box-border border border-neutral-200 rounded items-center border-box">
              <input
                value={inputValue['email']}
                onChange={ChangeHandler}
                onBlur={() => checkRegex('email')}
                name="email"
                placeholder="이메일을 입력해주세요."
                className="px-3 border-none h-[3rem] flex-initial box-border w-full py-[0.75rem] rounded text-[0.875rem] transition shadow-white"
              />
              <button
                className="absolute right-[0.625rem] w-[5.438rem] h-[1.563rem] text-xs border border-primary text-primary rounded font-medium"
                onClick={duplicateHandler}
              >
                중복확인
              </button>
            </div>
            <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">
              {alret.email}
            </p>
            {modalIsOpen && (
              <Modal
                onClick={duplicateHandler}
                title={
                  data.status == 'rejected' && data.error.data.status === 500
                    ? data.error.data.msg
                    : data.error.data
                }
                className={cls(
                  data.status == 'rejected' &&
                    data.error.data.status === 500 &&
                    data.error.data.msg &&
                    'text-red-600',
                )}
              />
            )}
          </>
        )}
        <div>
          <label
            htmlFor="loginJoinMembershipName"
            className="inline-block font-bold leading-4 mb-8 mt-9"
          >
            이름
          </label>
          <div className="flex">
            <input
              name="firstName"
              value={inputValue['firstName']}
              onChange={ChangeHandler}
              onBlur={() => checkRegex('firstName')}
              placeholder="성"
              className="pl-3 w-full h-[3rem] flex-initial box-border w- py-[0.75rem] text-[0.875rem] transition shadow-white border border-neutral-200 rounded mr-[0.813rem]"
            />
            <input
              name="lastName"
              value={inputValue['lastName']}
              onBlur={() => checkRegex('lastName')}
              onChange={ChangeHandler}
              placeholder="이름"
              className="pl-3 w-full h-[3rem] flex-initial box-border py-[0.75rem] text-[0.875rem] transition shadow-white border border-neutral-200 rounded"
            />
          </div>
          <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">
            {alert.firstName} {alert.lastName}
          </p>
          <label
            htmlFor="loginJoinMembershipName"
            className="inline-block font-bold leading-4 mb-8 mt-9"
          >
            후리가나
          </label>
          <div className="flex">
            <input
              name="furiganaFirst"
              value={inputValue['furiganaFirst']}
              onChange={ChangeHandler}
              onBlur={() => checkRegex('furiganaFirst')}
              placeholder="성"
              className="pl-3 w-full h-[3rem] flex-initial box-border w- py-[0.75rem] text-[0.875rem] transition shadow-white border border-neutral-200 rounded mr-[0.813rem]"
            />
            <input
              name="furiganaLast"
              value={inputValue['furiganaLast']}
              onBlur={() => checkRegex('furiganaLast')}
              onChange={ChangeHandler}
              placeholder="이름"
              className="pl-3 w-full h-[3rem] flex-initial box-border py-[0.75rem] text-[0.875rem] transition shadow-white border border-neutral-200 rounded"
            />
          </div>
          <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">
            {alert.furiganaFirst} {alert.furiganaLast}
          </p>
          <label
            htmlFor="loginJoinMembershipTel"
            className="inline-block font-bold leading-4 mb-8 mt-9"
          >
            전화번호
          </label>
          <div className="flex items-center">
            <select
              onChange={ChangeHandler}
              name="country"
              className="text-black-400 p-[0.625rem] pr-[1.5rem] h-[3rem] flex-initial box-border text-[0.875rem] transition shadow-white border border-neutral-200 rounded bg-[url('/public/assets/select_down.svg')] bg-no-repeat bg-[center_right_0.625rem]"
            >
              {telOptions &&
                telOptions.map((option) => {
                  return (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  )
                })}
            </select>
            <span className="mx-[0.625rem] text-black-200"> - </span>
            <input
              name="phoneNumber"
              onChange={ChangeHandler}
              value={inputValue['phoneNumber']}
              onBlur={() => checkRegex('phoneNumber')}
              className="pl-3 w-full h-[3rem] flex-initial box-border py-[0.75rem] text-[0.875rem] transition shadow-white border border-neutral-200 rounded"
            />
          </div>
          <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">
            {alert.phoneNumber}
          </p>
          <label
            htmlFor="loginJoinMembershipzipcodeber"
            className="inline-block font-bold leading-4 mb-8 mt-9"
          >
            주소
          </label>
          <div className="mb-3 relative flex box-border border border-neutral-200 rounded items-center border-box">
            <input
              name="zipcode"
              value={inputValue['zipcode']}
              onChange={ChangeHandler}
              onBlur={() => checkRegex('zipcode')}
              placeholder="우편번호를 검색해 주세요."
              className="px-3 h-[3rem] border-none flex-initial box-border w-full py-[0.75rem] rounded text-[0.875rem] transition shadow-white"
            />
            <button
              className="absolute right-[0.625rem] whitespace-nowrap p-[0.313rem] w-[5.438rem] h-[1.563rem] text-xs border border-primary text-primary rounded font-medium align-middle"
              onClick={onOpenHandler}
            >
              우편번호검색
            </button>
            {openPost && (
              <div
                className={`${animation} w-full h-full fixed z-50 top-0 left-0 bg-white flex flex-col items-center`}
              >
                <div className="w-full h-20 py-5 font-bold text-lg flex items-center justify-center relative">
                  <div>주소 찾기</div>
                  <div className="absolute right-5" onClick={onCloseHandler}>
                    <div className="relative w-6 h-6 inset-y-0 flex justify-center items-center">
                      <div className="w-6 h-0.5 bg-black origin-center rotate-45 absolute"></div>
                      <div className="w-6 h-0.5 bg-black origin-center -rotate-45 "></div>
                    </div>
                  </div>
                </div>
                <DaumPostcodeEmbed
                  style={{ height: '100%' }}
                  onComplete={onCompleteHandler}
                  onClose={onCloseHandler}
                />
              </div>
            )}
          </div>
          <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">
            {alert.zipcode}
          </p>
          <div className="mb-3 relative flex box-border border border-neutral-200 rounded items-center border-box">
            <input
              name="city"
              value={inputValue.city}
              onChange={ChangeHandler}
              onBlur={() => checkRegex('city')}
              placeholder="주소를 입력 해 주세요."
              className="px-3 h-[3rem] border-none flex-initial box-border w-full py-[0.75rem] rounded text-[0.875rem] transition shadow-white"
            />
          </div>

          <div className="mb-3 relative flex box-border border border-neutral-200 rounded items-center border-box">
            <input
              name="street"
              value={inputValue['street']}
              onChange={ChangeHandler}
              onBlur={() => checkRegex('street')}
              placeholder="상세 주소를 입력 해 주세요."
              className="px-3 h-[3rem] border-none flex-initial box-border w-full py-[0.75rem] rounded text-[0.875rem] transition shadow-white"
            />
          </div>
        </div>
      </div>

      {pathname.includes('/signup') && (
        <NextBtn
          onClick={onClick}
          next="finish"
          inputValue={inputValue}
          disabled={
            disabled && data.error?.data === '사용 가능한 이메일입니다.'
          }
        >
          다음
        </NextBtn>
      )}
    </div>
  )
}

export default UserInfo
