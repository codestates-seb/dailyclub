import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = process.env.REACT_APP_DEV_URL;

export const fetchUserInfo = createAsyncThunk(
  `GET/USERINFO`,
  async (id: number, thunkApi) => {
    try {
      const response = await axios.get(`${URL}/api/users/${id}`);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

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
  isLoggedId: boolean;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState = {
  users: {},
  isLoggedId: false,
  loading: 'idle',
  error: null,
} as UsersState;

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfos(state, action: PayloadAction<any>) {
      state.users = action.payload;
    },
    loginUser(state, action) {
      state.isLoggedId = true;
      state.users = action.payload;
    },
    logoutUser(state) {
      state.isLoggedId = false;
      state.users = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = 'loading';
        state.isLoggedId = false;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.isLoggedId = true;
        state.users = action.payload;
        state.error = '';
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = 'failed';
        state.isLoggedId = false;
        state.users = {};
        state.error = action.error.message;
      });
  },
});

export const getisLoggedId = (state: any) => state.userInfo.isLoggedId;
export const getUserData = (state: any) => state.userInfo.users;
export const getUserError = (state: any) => state.userInfo.error;

export const { getUserInfos, loginUser, logoutUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
