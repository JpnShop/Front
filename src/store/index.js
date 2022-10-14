import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import { apiSlice } from './api/baseQuery'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
})

setupListeners(store.dispatch)
