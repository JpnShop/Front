import React from 'react'
import Card from './Card'
import NoList from './NoList'
import { useSelector } from 'react-redux'
import { useGetFavoriteItemsQuery } from '../../store/api/favoriteApiSlice'
import { useCookies } from 'react-cookie'

function Container({ list, pt = 'pt-52' }) {
  const [cookies, setCookie, removeCookie] = useCookies()
  const token = cookies.accessToken
  const { data: favorites } = useGetFavoriteItemsQuery(undefined, {
    skip: !token,
  })
  const favriteItems = useSelector((state) => state.favorites)

  return (
    <div className={`${pt}`}>
      {list && list.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-[2px]">
          {list.map((item, idx) => (
            <Card
              key={idx}
              data={item}
              favorites={token ? favorites : favriteItems}
              token={token}
            />
          ))}
        </div>
      ) : (
        <div className="pt-28">
          <NoList title={'최근 본 상품이 없습니다'} />
        </div>
      )}
    </div>
  )
}

export default Container
