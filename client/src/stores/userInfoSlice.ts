import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = process.env.REACT_APP_DEV_URL;

export const fetchUserInfo = createAsyncThunk(`GET/USERINFO`, async () => {
  try {
    const response = await axios.get(`${URL}/api/users/mypage`);
    console.log('회원정보조회다!!', response.data);
    return response.data;
  } catch (err) {
    return console.log(err);
    //   return thunkApi.rejectWithValue(err);
  }
});

/* interface UserInfo {
  id: number;
  introduction?: string | null;
  kind: number;
  loginId: string;
  nickname: string;
  picture?: string | null;
  role?: string;
} */

interface UsersState {
  // user: UserInfo; // 타입 에러남
  users: any;
  userId: number;
  loginId: string;
  isLoggedIn: boolean;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState = {
  users: {},
  userId: 0,
  loginId: '',
  isLoggedIn: false,
  loading: 'idle',
  error: null,
} as UsersState;

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserId(state, action: PayloadAction<any>) {
      state.userId = action.payload.id;
      state.loginId = action.payload.loginId;
      state.isLoggedIn = true;
    },
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.users = action.payload;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.users = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = 'loading';
        state.isLoggedIn = false;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.isLoggedIn = true;
        state.users = action.payload;
        state.error = '';
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = 'failed';
        state.isLoggedIn = false;
        state.users = {};
        state.error = action.error.message;
      });
  },
});

export const getisLoggedIn = (state: any) => state.userInfo.isLoggedIn;
export const getUserData = (state: any) => state.userInfo.users;
export const getUserError = (state: any) => state.userInfo.error;

export const { getUserId, loginUser, logoutUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
