import React, { useState } from 'react'
import Card from './Card'
// import { likedList } from '~/dummy/liked'
import { useGetFavoriteItemsQuery } from '../../store/api/favoriteApiSlice'
import Button from '../common/Button'
import NoList from '../CardList/NoList'

function Container() {
  const [edit, setEdit] = useState(false)
  const [deleteList, setDeleteList] = useState([])
  const { data: likedList, isLoading, isError } = useGetFavoriteItemsQuery()

  return (
    <div className="pt-28">
      {edit && likedList?.length > 0 && (
        <div className="fixed top-0 w-full max-w-[600px] z-50 overflow-hidden bg-white flex justify-between items-center px-5 h-[66px]">
          <div className="text-xl font-bold">
            {deleteList.length}개 상품 선택됨
          </div>
          <button
            onClick={() => setEdit(false)}
            className="w-14 h-7 text-white  border-none bg-primary rounded-full"
          >
            완료
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mx-5 h-11 text-xs">
        <div className="text-black-400">찜한 상품 {likedList?.length}</div>
        {edit && likedList?.length ? null : (
          <div
            className="text-black-100 hover:cursor-pointer"
            onClick={() => setEdit(true)}
          >
            편집
          </div>
        )}
      </div>
      {likedList?.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-[2px]">
          {likedList.map((item, idx) => (
            <Card
              key={idx}
              editMode={edit}
              data={item}
              deleteList={deleteList}
              setDeleteList={setDeleteList}
            />
          ))}
        </div>
      ) : (
        <div className="pt-20">
          <NoList title={'찜한 상품이 없습니다'} />
        </div>
      )}
      {edit && likedList.length > 0 && (
        <div
          onClick={() => {}}
          className="z-50 hover:cursor-pointer w-full fixed h-20 bottom-0 flex justify-center items-center text-white-200 text-xl bg-primary"
        >
          <div className="pb-5">삭제</div>
        </div>
      )}
    </div>
  )
}

export default Container
