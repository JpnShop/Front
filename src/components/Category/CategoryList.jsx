import React from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CATEGORY } from '~/dummy/constantsfix'
import { cls } from '../../utils'
import SelectFilter from './SelectFilter'

function CategoryList({ topCG, subCG }) {
  const [selectTop, setSelectTop] = useState(topCG)
  const [selectSub, setSelectSub] = useState(subCG)
  const [selectLast, setSelectLast] = useState('전체')
  const [subCategoryList, setSubCategoryList] = useState([])
  const [lastCategoryList, setLastSubCategoryList] = useState([])
  const userGender = useSelector((state) => state.user).gender
  const setCategory = JSON.parse(JSON.stringify(CATEGORY))

  // 랜더링과 동시에 코트매틱 category에서 '브랜드' 리스트 삭제 (한번만 실행)
  useEffect(() => {
    setCategory.map((top) => {
      if (top.TopCategory === '뷰티') {
        top.subCategory.map((sub) => {
          if (sub.name === '브랜드') {
            top.subCategory.shift()
          }
        })
      }
    })
  }, [])

  // topCategory가 바뀌면 디폴트로 subCategory의 첫번째 요소 name이 active 상태가 되도록
  // sub카테고리가 바뀔때 last카테고리의 디폴트를 '전체'로
  useEffect(() => {
    console.log(CATEGORY)
    setCategory.map((top) => {
      if (selectTop === top.TopCategory) {
        setSubCategoryList(top.subCategory)
      }
    })
    setSelectLast('전체')
  }, [selectSub, userGender])

  // 패션 카테고리만 성별에 따라 바뀌므로
  useEffect(() => {
    subCategoryList.map((sub) => {
      if (selectSub === sub.name) {
        if (selectTop === '패션') {
          setLastSubCategoryList(sub.list[userGender])
        } else {
          setLastSubCategoryList(sub.list)
        }
      }
    })
  }, [selectSub, subCategoryList])

  return (
    <div className="fixed top-16 w-full max-w-[600px] overflow-hidden bg-white z-50">
      <div className="px-5 flex overflow-x-auto h-[50px] items-center border-black border-b text-xl text-black-400">
        {subCategoryList &&
          subCategoryList.map((sub) => (
            <div
              key={sub.name}
              className={cls(
                'mr-5 last:mr-0 whitespace-nowrap delay-100 duration-200 after:duration-100 after:delay-200',
                selectSub === sub.name &&
                  'relative font-bold text-black-100 after:border-b-[3px] after:border-black after:absolute after:-bottom-3 after:w-full after:left-0 hover:cursor-pointer',
              )}
              onClick={() => setSelectSub(sub.name)}
            >
              {sub.name}
            </div>
          ))}
      </div>
      <div className="px-5 flex overflow-x-auto h-12 items-center border-b border-primary">
        {lastCategoryList &&
          lastCategoryList.map((last) => (
            <div
              key={last}
              className={cls(
                'mr-7 last:mr-0 whitespace-nowrap text-xs delay-100 duration-200',
                selectLast === last && 'text-primary',
              )}
              onClick={() => setSelectLast(last)}
            >
              {last}
            </div>
          ))}
      </div>
      <SelectFilter />
    </div>
  )
}

export default CategoryList
