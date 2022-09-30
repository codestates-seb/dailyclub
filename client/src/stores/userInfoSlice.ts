import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, removeLocalStorage } from 'apis/localStorage';
import axios from 'axios';

const URL = process.env.REACT_APP_DEV_URL;

export const fetchUserInfo = createAsyncThunk(`GET/USERINFO`, async () => {
  try {
    const response = await axios.get(`${URL}/api/users/mypage`);
    console.log('회원정보조회다!!', response.data);

    /** access token 만료시 헤더에 refresh토큰 담아서 get 요청 -백엔드작업중 */
    if (response.data === 'Access Token Expired') {
      removeLocalStorage('access_token'); // 만료된 access토큰 삭제
      const refreshToken = getLocalStorage('refresh_token');
      axios.defaults.headers.common['Refresh'] = `${refreshToken}`;
      // 새로 발급받은 access토큰으로 교체
    }
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
  userId: number | undefined;
  loginId: string;
  isLoggedIn: boolean;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState = {
  users: {},
  userId: undefined,
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
      state.userId = undefined;
      state.loading = 'idle';
      state.loginId = '';
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
