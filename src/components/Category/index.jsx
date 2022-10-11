import React from 'react'
import CategoryList from './CategoryList'
import Container from '../CardList/Container'
import Capsule from './Capsule'
import product from '~/dummy/dummy/product.json'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function CategoryFashion() {
  const { topCG, subCG } = useParams()

  return (
    <div>
      <CategoryList topCG={topCG} subCG={subCG} />
      <Container list={product} />
      <Capsule />
    </div>
  )
}

export default CategoryFashion
