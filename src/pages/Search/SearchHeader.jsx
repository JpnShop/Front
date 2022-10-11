import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as SearchIcon } from '/public/assets/search_icon.svg'
import CartIcon from '~/components/common/CartIcon'
import { ReactComponent as BackOn } from '/public/assets/back-small.svg'
import '~/animate.css'
import { useEffect } from 'react'

const SearchHeader = ({ setGoSearch }) => {
  const [focus, setFocus] = useState(false)
  const [inputAnimation, setInputAnimation] = useState('')
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setFocus(true)
    setInputAnimation('openSearchBar')
    setTimeout(() => {
      setInputAnimation('')
    }, 1000)
  }, [])

  const onFocusHandler = (e) => {
    if (!focus) {
      // input 창이 닫혀있다면 input 창 열어주기 + 애니메이션
      setFocus(true)
      setInputAnimation('openSearchBar')
      setTimeout(() => {
        setInputAnimation('')
      }, 1000)
    } else {
      if (value) {
        // input에 사용자가 입력한 내용이 있다면 검색하기
        goSearch(e)
      } else {
        // input이 비어있다면 input창 닫아주기
        setInputAnimation('closeSearchBar')
        setTimeout(() => {
          setFocus(false)
          setInputAnimation('')
        }, 1000)
      }
    }
  }

  const goSearch = () => {
    // 검색어가 빈칸을 제외하고 빈 배열일 경우, 함수를 실행시키지 않고 리턴
    if (value.trim === '') return
    const local = JSON.parse(localStorage.getItem('searchKeyword'))

    // local에 저장된 키워드들이 없다면 키값을 설정하고 그 키워드만 로컬에 저장 후 리턴
    if (!local) {
      window.localStorage.setItem('searchKeyword', JSON.stringify([value]))
      return
    }

    // 이전에 검색한 기록이 있는 키워드는 지운 후, 맨 앞에서 추가
    local.map((item, idx) => {
      if (item === value) local.splice(idx, 1)
    })

    // 검색어 최대 6개만 저장
    if (local.length >= 6) local.pop()

    // 새로운 검색어를 맨 앞으로 저장
    window.localStorage.setItem(
      'searchKeyword',
      JSON.stringify([value, ...local]),
    )
    setGoSearch(true)
    setTimeout(() => {
      setGoSearch(false)
      navigate(`${value}`)
    }, 300)
  }

  return (
    <div>
      <div className="w-full flex items-center overflow-hidden bg-white z-40">
        <div className="w-full h-16 max-w-[600px] px-5 flex items-center">
          <BackOn className="w-7" onClick={() => navigate(-1)} />
          <div className="w-full h-fit overflow-hidden flex ml-3 items-center">
            {focus && (
              <input
                type="text"
                value={value}
                className={`${inputAnimation} w-full px-2 py-2 placeholder:text-black-200 focus-visible:outline-none border-b-2 border-primary`}
                placeholder="#어라운드 앤"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.keyCode === 13) {
                    goSearch()
                  }
                }}
              />
            )}
          </div>
          <div className="flex justify-center items-center gap-2">
            <SearchIcon onClick={onFocusHandler} className="w-7" />
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchHeader
