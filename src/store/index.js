import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cartApi } from './api/cartApiSlice'
import { magazineApi } from './api/magazineSlice'
import { questionApi } from './api/questionSlice'
import { refundApi } from './api/refundApiSlice'
import { producttApi } from './api/productSlice'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'

const rootReducer = combineReducers({
  [cartApi.reducerPath]: cartApi.reducer,
  [magazineApi.reducerPath]: magazineApi.reducer,
  [questionApi.reducerPath]: questionApi.reducer,
  [refundApi.reducerPath]: refundApi.reducer,
  [producttApi.reducerPath]: producttApi.reducer,
  user: userReducer,
  product: productReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      cartApi.middleware,
      magazineApi.middleware,
      questionApi.middleware,
      refundApi.middleware,
      producttApi.middleware,
    ]),
})

setupListeners(store.dispatch)
