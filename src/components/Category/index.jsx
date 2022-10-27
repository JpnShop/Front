import React from 'react'
import CategoryList from './CategoryList'
import Container from '../CardList/Container'
import Capsule from './Capsule'
import { useParams } from 'react-router-dom'
import { useGetTagItemsQuery } from '../../store/api/productApiSlice'
import { useGetFavoriteItemsQuery } from '../../store/api/favoriteApiSlice'

function CategoryFashion() {
  const { topCG, subCG } = useParams()
  const { data } = useGetTagItemsQuery(subCG)
  const { data: favorites } = useGetFavoriteItemsQuery()
  return (
    <div>
      <CategoryList topCG={topCG} subCG={subCG} />
      <Container list={data} favorites={favorites} />
      <Capsule />
    </div>
  )
}

export default CategoryFashion
