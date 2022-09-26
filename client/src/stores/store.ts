import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchReducer';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  devTools: process.env.REACT_APP_ENV !== 'production',
  //   preloadedState, // SSR 서버에서 init state있을 때
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
