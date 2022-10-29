import React, { useState } from 'react'
import { ReactComponent as SearchIcon } from '/public/assets/search_icon.svg'
import { useGetProductsQuery } from '../../../store/api/productApiSlice'
import SearchData from './SearchData'
import { cls } from '../../../utils'
import CloseIcon from '../../common/CloseIcon'
//임시설정
const items = [
  {
    id: 11,
    thumbnail:
      'https://img.29cm.co.kr/next-product/2021/03/05/d22e8b4eb5fd4d52aa32a65b29b3c25f_20210305180022.jpg?width=300',
    brand: 'TGT',
    productName: 'TGT PAISLEY HAIR BAND',
    price: 1100,
    sale: 10,
  },
  {
    id: 12,
    thumbnail:
      'https://aroundann.co.kr/web/product/big/202204/3f23c91dd6c296170e071a503abfe4f3.jpg',
    brand: 'aroundann',
    productName: 'Bowling bag_lemon',
    price: 570,
    sale: 12,
  },
]
const InquireProducts = ({ setIsOpen, onClick, setDataId }) => {
  const [searchData, setSearchData] = useState('')
  const [result, setResult] = useState([])
  const { data } = useGetProductsQuery()

  const onChangeHandler = (e) => {
    setSearchData(e.target.value.trim())
  }
  const goSearch = () => {
    if (value.trim === '') return
  }

  const onSubmitHandler = (e) => {
    if (e.keyCode !== 13) return
    const product2 = data?.filter((item) =>
      item.productName.includes(searchData),
    )
    const product3 = data?.filter((item) => item.brandKo.includes(searchData))
    setResult(product2?.concat(product3))
  }

  return (
    <div>
      <div className="text-lg font-bold w-full h-16 relative top-0 bg-white z-40 box-border flex items-center justify-center">
        상품검색하기
        <CloseIcon className="absolute right-0" fill="#000" onClick={onClick} />
      </div>
      <div className="w-full h-fit overflow-hidden flex items-center">
        <input
          type="text"
          className="text-sm w-full px-2 py-2 placeholder:text-primary focus-visible:outline-none border-b-2 border-primary"
          placeholder="문의할 상품을 검색해주세요."
          onChange={onChangeHandler}
          onKeyDown={onSubmitHandler}
        />
        <SearchIcon className="absolute right-6 w-[24px] h-[24px]" />
      </div>
      <h3 className="mt-[31px] font-bold mb-[13px]">검색된 상품</h3>
      <SearchData items={result} setDataId={setDataId} setIsOpen={setIsOpen} />
    </div>
  )
}

export default InquireProducts
