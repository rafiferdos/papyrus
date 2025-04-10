// import storage from 'redux-persist/lib/storage'
import {
//   persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
// import authReducer from './auth/authSlice'
// import cartReducer from './Features/productManagement/cart.api'

// const persistConfig = {
//   key: 'auth',
//   storage,
  // whitelist: ['user', 'token'],
// }

// const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // auth: persistedAuthReducer,
    // cart: cartReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)