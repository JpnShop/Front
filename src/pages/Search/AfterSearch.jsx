import React, { useMemo } from 'react'
import HaveResult from './HaveResult'
import NoResult from './NoResult'
import product from '~/dummy/dummy/product.json'
import { useGetProductsQuery } from '../../store/api/productApiSlice'
import { useParams } from 'react-router-dom'

function AfterSearch() {
  const { search } = useParams()
  const { data } = useGetProductsQuery()
  const product2 = data?.filter((item) => item.productName.includes(search))
  const product3 = data?.filter((item) => item.brandKo.includes(search))
  const products = product2?.concat(product3)

  return (
    <div className="mt-7">
      {data && products && products.length !== 0 ? (
        <HaveResult product={products} />
      ) : (
        <NoResult />
      )}
    </div>
  )
}

export default AfterSearch
