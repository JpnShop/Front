import { useState, useMemo } from 'react'
import GoogleBtn from './GoogleBtn'
import { useLoginMutation } from '../../store/api/authApiSlice'
import { setCredentials } from '../../store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ErrorCom from '../common/ErrorCom'
import Input from './input'
import Button from '../common/Button'
import Loading from '../layout/Loading'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState({
    id: '',
    pw: '',
  })
  const [errMsg, setErrMsg] = useState('')
  const [login, { isLoading, isError }] = useLoginMutation()
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const clear = (name) => {
    setInputValue({
      ...inputValue,
      [name]: '',
    })
  }

  const invalidInput = useMemo(
    () => inputValue.id.trim() !== '' && inputValue.pw.trim() !== '',
  )

  const loginHandler = async () => {
    try {
      if (invalidInput) {
        const { id, pw } = inputValue
        const userData = await login({ username: id, password: pw })
        dispatch(setCredentials(userData['data']))
        navigate('/', { replace: true })
      } else {
        throw new Error('아이디와 패스워드를 입력해주세요.')
      }
    } catch (error) {
      if (error?.originalStatus === 403) {
        setErrMsg('Forbidden')
      } else if (error.originalStatus === 400) {
        setErrMsg('Missing Username or Password')
      } else if (error.originalStatus === 401) {
        setErrMsg('Unauthorized')
      } else if (error.originalStatus === 500) {
        setErrMsg('회원가입을 해주세요.')
      } else if (!error?.originalStatus) {
        setErrMsg('No Server Response')
      } else {
        setErrMsg('Login Failed')
      }
    } finally {
      setInputValue({
        id: '',
        pw: '',
      })
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  const onTabHandler = () => {}

  return (
    <div className="px-5 pb-10">
      <form onSubmit={onSubmitHandler}>
        {isLoading && <Loading />}
        <h2 className="text-[30px] font-bold">내 손안의 매거진</h2>
        <h3 className="text-black-800 mb-[34px]">오늘의 상점에서 만나보세요</h3>
        {isError && <div className="text-red-500">{errMsg}</div>}
        <Input
          tabIndex={1}
          state="아이디"
          name="id"
          onChangeHandler={onChangeHandler}
          clear={() => clear('id')}
          value={inputValue.id}
          type="text"
        />
        <Input
          tabIndex={2}
          state="비밀번호"
          name="pw"
          onChangeHandler={onChangeHandler}
          clear={() => clear('pw')}
          value={inputValue.pw}
          type="password"
        />
        <button
          type="submit"
          className="w-full font-bold rounded text-xs cursor-pointer h-[44px] flex items-center justify-center text-center bg-primary text-white"
          onClick={loginHandler}
        >
          로그인하기
        </button>
      </form>
      <div className="flex justify-end mt-5 font-medium">
        <span
          className="text-xs text-black-400 cursor-pointer pr-3 pl-3 border-r "
          onClick={() => navigate('findIdPw', { state: '아이디 찾기' })}
        >
          아이디 찾기
        </span>
        <span
          className="text-xs text-black-400 cursor-pointer pl-3"
          onClick={() => navigate('findIDPw', { state: '비밀번호 찾기' })}
        >
          비밀번호 찾기
        </span>
      </div>

      <GoogleBtn />
      <Button classprop="justify-between text-white mt-5 gap-2 bg-black-400">
        <Link to="/order-check" className="w-full block h-full py-3">
          비회원 주문 조회
        </Link>
      </Button>
      <p className="font-bold text-xs text-center mt-9">
        회원 가입하고 <strong className="text-primary">500¥</strong> 적립금을
        받으세요!
      </p>
      <Button
        classprop="mt-3 border border-black-100"
        onClick={() => navigate('/signup')}
      >
        회원가입 하기
      </Button>
    </div>
  )
}

export default SignIn
