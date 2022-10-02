import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = process.env.REACT_APP_DEV_URL;

export const fetchUserInfo = createAsyncThunk(
  `GET/USERINFO`,
  async (id: number, thunkApi) => {
    try {
      const response = await axios.get(`${URL}/api/users/${id}`);
      console.log('회원정보조회다!!', response.data);
      return response.data;
    } catch (err) {
      // return console.log(err);
      return thunkApi.rejectWithValue(err);
    }
  }
);

interface UsersState {
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
