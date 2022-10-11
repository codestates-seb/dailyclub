import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Filters {
  location: string;
  programDate: string;
  minKind: string;
}

let initialState: Filters = {
  location: '',
  programDate: '',
  minKind: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.programDate = action.payload;
    },
    setMinKind(state, action: PayloadAction<string>) {
      state.minKind = action.payload;
    },
  },
});
export const { setLocation, setDate, setMinKind } = filterSlice.actions;
export const getLocation = (state: any) => state.filter.location;
export const getDate = (state: any) => state.filter.programDate;
export const getMinKind = (state: any) => state.filter.minKind;

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
