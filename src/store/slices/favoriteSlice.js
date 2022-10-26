import { createSlice } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

let favoriteItems = localStorage.getItem('favoriteItems')
if (!favoriteItems) {
  favoriteItems = '[]'
  localStorage.setItem('favoriteItems', JSON.stringify([]))
}

const initialState = JSON.parse(favoriteItems)

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    changeFavoriteItems(state, action) {
      let id = state.findIndex((item) => {
        return item.productId === action.payload.productId
      })
      if (id === -1) {
        state.push(action.payload)
      } else {
        state = state.slice(id, 1)
      }
      localStorage.setItem('favoriteItems', JSON.stringify(state))
    },
  },
})

export const { changeFavoriteItems } = favoritesSlice.actions

export default favoritesSlice.reducer
