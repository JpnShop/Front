import React from 'react'
import CategoryList from './CategoryList'
import Container from '../CardList/Container'
import Capsule from './Capsule'
import { useParams } from 'react-router-dom'
import { useGetTagItemsQuery } from '../../store/api/productApiSlice'

function CategoryFashion() {
  const { topCG, subCG } = useParams()
  const { data } = useGetTagItemsQuery(subCG)
  return (
    <div>
      <CategoryList topCG={topCG} subCG={subCG} />
      <Container list={data} />
      <Capsule />
    </div>
  )
}

export default CategoryFashion
