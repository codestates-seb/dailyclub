import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Keyword {
  keyword: string;
}

let initialState: Keyword = {
  keyword: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
