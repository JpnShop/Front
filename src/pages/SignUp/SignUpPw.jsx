import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { ReactComponent as ClearIcon } from '/public/assets/clear.svg'
import { ReactComponent as ViewIcon } from '/public/assets/view.svg'
import NextBtn from '../../components/common/NextBtn'
import Title from '../../components/SignUp/Title'
import useInputValue from '../../hook/useInputValue'
const PW_REGEX = new RegExp('^[a-zA-Z0-9_-]{5,11}$')

const SignUpPw = () => {
  const { state } = useLocation()
  const [active, setActive, onFocusHandler] = useInputValue()

  const [type, setType] = useState('password')
  const [inputValue, setInputValue] = useState({
    id: state,
    pw: '',
    pwCheck: '',
  })
  const [alret, setAlret] = useState({
    pw: null,
    pwCheck: null,
  })
  const onBlurHandler = (name) => {
    setActive(false)
    setInputValue({
      ...inputValue,
      [name]: '',
    })
  }
  const ChangeHandler = useCallback((e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  })

  const changeTypeHandler = () => {
    type === 'password' ? setType('text') : setType('password')
  }

  const checkRegex = (inputId) => {
    if (inputId === 'pw') {
      PW_REGEX.test(inputValue.pw)
        ? setAlret({
            ...alert,
            pw: '',
          })
        : setAlret({
            ...alret,
            pw: '6~16 영문 대 소문자, 숫자를 사용하세요',
          })
    } else {
      inputValue.pw === inputValue.pwCheck
        ? setAlret({
            ...alret,
            pwCheck: null,
          })
        : setAlret({
            ...alret,
            pwCheck: '비밀번호가 일치하지 않습니다.',
          })
    }
  }
  return (
    <>
      <Title title="비밀번호" text="생성" />
      <div className="mt-36">
        <label
          htmlFor="loginJoinMembershipId"
          className="inline-block mt-4 mb-2 leading-snug"
        >
          비밀번호
          <span className="inline-block overflow-hidden w-[4px] h-[4px] mt-[4px] rounded-full bg-red-600 indent-[999px] align-text-top ml-1">
            필수 입력
          </span>
        </label>
        <div className="relative  flex box-border h-[50px] border border-neutral-200 rounded justify-between items-center">
          <input
            value={inputValue['pw']}
            onChange={ChangeHandler}
            onClick={onFocusHandler}
            onBlur={() => checkRegex('pw')}
            name="pw"
            type={type}
            placeholder="6자 이상의 영문, 숫자로 입력해 주세요."
            maxLength="11"
            minLength="6"
            className="pl-3 h-[48px] border-none flex-initial box-border w-full py-[12px] rounded text-[14px] transition shadow-white"
          />

          <div className="absolute flex gap-1 right-2">
            {active && (
              <ClearIcon width="20px" onClick={() => onBlurHandler('pw')} />
            )}
            <ViewIcon width="26px" onClick={changeTypeHandler} />
          </div>
        </div>
        <p className="mb-[8px] font-[11px] text-red-600 text-[12px]">
          {alret.pw}
        </p>
        <div className="mt-2 relative  flex box-border h-[50px] border border-neutral-200 rounded justify-between items-center">
          <input
            value={inputValue['pwCheck']}
            onChange={ChangeHandler}
            onClick={onFocusHandler}
            onBlur={() => checkRegex('pwCheck')}
            type={type}
            name="pwCheck"
            placeholder="비밀번호를 재입력해주세요."
            maxLength="11"
            minLength="6"
            className="pl-3 border-none h-[48px] flex-initial box-border w-full py-[12px] rounded text-[14px] transition shadow-white"
          />
          <div className="absolute flex gap-1 right-2">
            {active && <ClearIcon width="20px" onClick={onFocusHandler} />}
            <ViewIcon width="26px" onClick={changeTypeHandler} />
          </div>
        </div>
        <p className="mt-[8px] font-[11px] text-red-600 text-[12px]">
          {alret.pwCheck}
        </p>
      </div>
      <NextBtn
        next="infoform"
        inputValue={inputValue}
        disabled={inputValue.pwCheck && !alret.pwCheck}
      >
        다음
      </NextBtn>
    </>
  )
}

export default SignUpPw
