import React, { useState } from 'react'
import Button from '../../components/common/Button'
import Title from '../../components/SignUp/Title'
import NextBtn from '../../components/common/NextBtn'
import { ReactComponent as ClearIcon } from '/public/assets/clear.svg'
import useInputValue from '../../hook/useInputValue'
import { useCheckUsernameQuery } from '../../store/api/authApiSlice'
const ID_REGEX = new RegExp('^[a-z0-9_-]{6,11}$')

const SignUpIdForm = () => {
  const [inputValue, setInputValue] = useState('')
  const [isCheckUsername, setIsCheckUsername] = useState(false)
  const [alret, setAlret] = useState(null)
  const [active, setActive, onFocusHandler] = useInputValue()
  const { error, isError } = useCheckUsernameQuery(inputValue, {
    skip: inputValue.length < 6 && !alret,
  })

  const ChangeHandler = (e) => {
    setInputValue(e.target.value)
  }

  const doubleCheck = () => {
    if (alret) return
    setIsCheckUsername((prev) => !prev)
  }

  const checkRegex = () => {
    ID_REGEX.test(inputValue)
      ? setAlret(null)
      : setAlret('6~11자의 영문 소문자와 숫자만 사용가능합니다.')
  }

  return (
    <>
      <Title title="아이디" text="생성" />
      <div className="mt-36">
        <label
          htmlFor="loginJoinMembershipId"
          className="inline-block mt-4 mb-2 leading-snug"
        >
          아이디
          <span className="inline-block overflow-hidden w-[4px] h-[4px] mt-[4px] rounded-full bg-red-600 indent-[999px] align-text-top ml-1">
            필수 입력
          </span>
        </label>
        <div className="relative  flex box-border h-[50px] border border-neutral-200 rounded justify-between items-center">
          <input
            value={inputValue}
            onChange={ChangeHandler}
            onClick={() => onFocusHandler}
            onBlur={checkRegex}
            name="id"
            placeholder="6자 이상의 영문, 숫자로 입력해 주세요."
            maxLength="11"
            minLength="6"
            className="pl-3 h-[48px] border-none flex-initial box-border w-full py-[12px] rounded text-[14px] transition shadow-white"
          />

          <div className="absolute flex gap-1 right-2">
            {active && (
              <ClearIcon width="20px" onClick={() => onBlurHandler('id')} />
            )}
          </div>
        </div>
        <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">{alret}</p>
        {isCheckUsername && (
          <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">
            {isError && error.status === 500
              ? error.data?.msg
              : error?.data
              ? error.data
              : null}
          </p>
        )}
        <Button
          classprop=" border border-black-100 mt-6 gap-2"
          onClick={doubleCheck}
        >
          중복확인
        </Button>
        <NextBtn
          next="pwform"
          inputValue={inputValue}
          disabled={
            inputValue.length && !alret && isError && error.status !== 500
          }
        >
          다음
        </NextBtn>
      </div>
    </>
  )
}

export default SignUpIdForm
