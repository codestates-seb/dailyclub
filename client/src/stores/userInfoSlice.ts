import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = process.env.REACT_APP_DEV_TWO_URL; // 민정님 주소

export const fetchUserInfo = createAsyncThunk(
  `GET/USERINFO`,
  async (id: number) => {
    try {
      const res = await axios.get(`${URL}api/users/${id}`);
      console.log('회원정보 조회 :', res.data); // 나중에 주석 해제
      return await res.data;
    } catch (err) {
      return err;
    }
  }
);

// interface UserInfo {
//   userId: number;
//   loginId: string;
//   nickname: string;
//   picture: string;
//   introduction: string;
//   kind: number;
// }

interface UsersState {
  user: [];
  isLoggedId: boolean;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState = {
  user: [],
  isLoggedId: false,
  loading: 'idle',
  error: null,
} as UsersState;

export const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfos(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    loginUser(state, action) {
      state.isLoggedId = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isLoggedId = false;
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user = action.payload;
        state.error = '';
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = 'failed';
        state.user = [];
        state.error = action.error.message;
      });
  },
});

export const { getUserInfos, loginUser, logoutUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
