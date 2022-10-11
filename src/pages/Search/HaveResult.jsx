import React from 'react'
import Container from '../../components/CardList/Container'

function HaveResult({ product }) {
  return (
    <div>
      <div className="pb-5 mx-5 border-b border-black-200 text-sm font-bold text-black-600">
        총 <span className="text-primary">{4}개</span>의 검색결과
      </div>
      <div>
        <div className="p-5 font-bold text-sm">상품</div>
        <Container list={product} search={true} />
      </div>
    </div>
  )
}

export default HaveResult
