import React from 'react'
import { Card } from './Card'
import {
  womonLankUsers,
  manLankUsers,
  lifeLankUsers,
  koreaLankUsers,
} from '../../../dummy/main'
export const TodayLank = ({ category }) => {
  let list
  switch (category) {
    case '우먼':
      list = womonLankUsers
      break
    case '맨':
      list = manLankUsers
      break
    case '라이프':
      list = lifeLankUsers
      break
    case '한국트렌드':
      list = koreaLankUsers
      break
    default:
      return
  }

  return (
    <div className="mb-24">
      <div className="text-xl font-bold ml-5 mb-5">
        <span className="text-primary">오늘</span>의 랭크
      </div>
      <div className="w-full overflow-hidden grid grid-cols-2 border-t-2 border-primary">
        {list.map((user) => (
          <Card key={user.userId} data={user} />
        ))}
      </div>
    </div>
  )
}
