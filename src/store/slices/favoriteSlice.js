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
      if (state.some((item) => item.productId === action.payload.productId)) {
        state = state.filter(
          (item) => item.productId !== action.payload.productId,
        )
        localStorage.setItem('favoriteItems', JSON.stringify(state))
        return state
      } else {
        state.push(action.payload)
        localStorage.setItem('favoriteItems', JSON.stringify(state))
        return state
      }
    },
  },
})

export const { changeFavoriteItems } = favoritesSlice.actions

export default favoritesSlice.reducer
