import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '~/animate.css'
import Logo from '../../components/common/Logo'
import { cls } from '../../utils'

const BeforeSearch = ({ goSearch }) => {
  const searchKeyword = 'searchKeyword'
  const local = JSON.parse(window.localStorage.getItem(searchKeyword))
  const [animation, setAnimation] = useState('')
  const [recentSearches, setRecentSearches] = useState(local)
  const [popularSearches, setPopularSearches] = useState([
    '키르시',
    '어라운드 앤',
    '어라운드 앤 토트백',
    '숄더백',
    '후드티',
    '에뛰드',
    '페리페라',
    '남자 바지',
    '남자 가방',
    '아이쉐도우',
  ])
  const [deleteSearch, setDeleteSearch] = useState('')
  const [removeAllSearch, setRemoveAllSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setAnimation('openSearchBar')
    setTimeout(() => {
      setAnimation('')
    }, 1000)
  }, [])

  useEffect(() => {
    setRecentSearches(JSON.parse(window.localStorage.getItem(searchKeyword)))
  }, [goSearch, deleteSearch, removeAllSearch])

  const removeSearch = (item) => {
    setDeleteSearch(item)
    setTimeout(() => {
      window.localStorage.setItem(
        searchKeyword,
        JSON.stringify(recentSearches.filter((word) => word !== item)),
      )
      setDeleteSearch('')
    }, 500)
  }

  const removeAll = () => {
    setRemoveAllSearch('deleteSearch')
    setTimeout(() => {
      window.localStorage.setItem(searchKeyword, JSON.stringify([]))
      setRemoveAllSearch('')
    }, 500)
  }

  return (
    <div className={`${animation} w-full`}>
      <div className="h-72 px-7 mt-2 py-2 text-sm text-black-600">
        <div className="flex justify-between py-4">
          <div className="font-bold text-base text-black">최근 검색어</div>
          {recentSearches && recentSearches.length > 0 && (
            <button className="text-sm" onClick={removeAll}>
              모두 지우기
            </button>
          )}
        </div>
        {recentSearches && recentSearches.length > 0 ? (
          <ul>
            {recentSearches.map((item, idx) => (
              <li
                key={idx}
                className={cls(
                  `flex justify-between ${removeAllSearch}`,
                  item === deleteSearch && 'deleteSearch',
                )}
              >
                <div
                  className="font-medium py-1.5 truncate"
                  onClick={() => navigate(`${item}`)}
                >
                  {item}
                </div>
                <div
                  className="w-4 h-4 relative bg-white-100 rounded-full flex justify-center items-center"
                  onClick={() => removeSearch(item)}
                >
                  <div className="w-3 h-px bg-white rotate-45 absolute"></div>
                  <div className="w-3 h-px bg-white -rotate-45"></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-24 flex flex-col justify-center items-center">
            <Logo fill="var(--black-200)" width="110" height="70" />
            <div>최근 검색어가 없습니다.</div>
          </div>
        )}
      </div>

      {popularSearches && popularSearches.length > 0 && (
        <div className="w-full px-7 text-sm text-black-600">
          <div className="font-bold text-base text-black py-6">인기 검색어</div>
          <ul className="grid grid-rows-5 grid-cols-2 grid-flow-col gap-2">
            {popularSearches.map((item, idx) => (
              <li key={idx} className="font-medium truncate">
                {idx + 1}
                .&nbsp;&nbsp; {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BeforeSearch
