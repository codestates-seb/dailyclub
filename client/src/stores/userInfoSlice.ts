import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  keyword: string;
}

let initialState: UserInfo = {
  keyword: '',
};

export const userInfoSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;
