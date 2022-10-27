import React, { useState } from 'react'
import NextBtn from '../common/NextBtn'
import Email from './Email'
import Modal from '../common/Modal'
import { useFindPWMutation } from '../../store/api/authApiSlice'
import { useNavigate } from 'react-router-dom'

const EMAIL_REGEX =
  /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

const FindPw = () => {
  const [id, setID] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [alret, setAlret] = useState('')
  const [email, setEmail] = useState(null)
  const [title, setTitle] = useState('')
  const [findPW, { isLoading, isError }] = useFindPWMutation()
  const navigate = useNavigate()

  const onClick = async () => {
    //비밀번호 찾기 api
    try {
      const findPWres = await findPW({ id, email })
      if (!findPWres?.error) {
        console.log('이메일전송', findPWres)
        setTitle('입력하신 이메일 주소로 임시 비밀번호를 발송했습니다.')
        setIsOpen(true)
      } else {
        throw findPWres.error
      }
    } catch (error) {
      setTitle(
        error.data || isError
          ? '서버에서 응답이 없습니다.'
          : '알 수 없는 에러가 발생했습니다',
      )
      setIsOpen(true)
    }
  }

  const onChangeIDHandler = (e) => {
    const value = e.target.value
    setID(value)
  }
  const onChangeEmailHandler = (e) => {
    const value = e.target.value
    setEmail(value)

    setTimeout(() => {
      EMAIL_REGEX.test(email)
        ? setAlret(null)
        : setAlret('올바르지 않은 형식입니다.')
    }, 500)
  }

  const onChangeModalHandler = async () => {
    setIsOpen(false)
    if (
      !isOpen &&
      title === '입력하신 이메일 주소로 임시 비밀번호를 발송했습니다.'
    ) {
      navigate('/login')
    }
  }

  return (
    <div className="mt-[36px] px-5">
      <Email
        onChange={onChangeIDHandler}
        alret={null}
        htmlFor={'id'}
        title={'아이디'}
      />
      <Email
        onChange={onChangeEmailHandler}
        alret={alret}
        htmlFor={'email'}
        title={'이메일'}
      />
      <NextBtn onClick={onClick} disabled={id && EMAIL_REGEX.test(email)}>
        비밀번호 찾기
      </NextBtn>
      {isOpen && <Modal title={title} onClick={() => setIsOpen(false)} />}
    </div>
  )
}

export default FindPw
