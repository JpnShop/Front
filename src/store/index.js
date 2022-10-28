import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import authReducer from './slices/authSlice'
import { apiSlice } from './api/apiSlice'
import cartReducer from './slices/cartSlice'
import favoritesReducer from './slices/favoriteSlice'
import shippingInfoReducer from './slices/shippingInfoSlice'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  shippingInfo: shippingInfoReducer,
  favorites: favoritesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
})

setupListeners(store.dispatch)
