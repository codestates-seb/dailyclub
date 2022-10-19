import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import filterSlice from './filterSlice';
import searchReducer from './searchSlice';
import userInfoSlice from './userInfoSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  userInfo: userInfoSlice,
  filter: filterSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo', 'filter'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.REACT_APP_ENV !== 'production',
  //   preloadedState, // SSR 서버에서 init state있을 때
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
