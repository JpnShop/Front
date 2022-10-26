import React, { useState } from 'react'
import Modal from '../common/Modal'
import NextBtn from '../common/NextBtn'
import Email from './Email'
import { useFindIDMutation } from '../../store/api/authApiSlice'

const EMAIL_REGEX =
  /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

const FindId = () => {
  const [alret, setAlret] = useState('')
  const [email, setEmail] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [findID, { isLoading, isError }] = useFindIDMutation()

  const onClick = async () => {
    try {
      const findIdres = await findID({ email })
      //아이디 찾기 api
      if (!findIdres?.error) {
        console.log('이메일전송', findIdres)
        setTitle('입력하신 이메일 주소로 아이디를 발송했습니다.')
        setIsOpen(true)
      } else {
        throw findIdres.error
      }
    } catch (error) {
      setTitle(
        error.data ||
          (isError && '서버에서 응답이 없습니다.') ||
          '알 수 없는 에러가 발생했습니다',
      )
      setIsOpen(true)
    }
  }
  const onChangeHandler = (e) => {
    const value = e.target.value
    setEmail(value)

    setTimeout(() => {
      EMAIL_REGEX.test(email)
        ? setAlret(null)
        : setAlret('올바르지 않은 형식입니다.')
    }, 500)
  }

  return (
    <div className="px-5 mt-[36px]">
      <Email
        onChange={onChangeHandler}
        alret={alret}
        htmlFor={'email'}
        title={'이메일'}
      />
      <NextBtn onClick={onClick} disabled={EMAIL_REGEX.test(email)}>
        아이디 찾기
      </NextBtn>
      {isOpen && <Modal title={title} onClick={() => setIsOpen(false)} />}
    </div>
  )
}

export default FindId
