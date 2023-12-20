import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

// Создать для этой части types.ts

export type Phone = {
  id: number;
  title: string;
  mainImage: string;
  manufacturer: string;
  releaseYear: number;
  diagonal: number;
  country: string;
  memory: string;
  screenRefresh: string;
  NFC: string;
  ESIM: string;
  Charger: string;
  Price: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'successs',
  ERROR = 'error',
}

export interface PhoneSliceState {
  phoneInfo: Phone[];
  status: Status;
}

// Для этой части создать asyncActions.ts

export const fetchPhones = createAsyncThunk<Phone[]>('phones/fetchPhones', async () => {
  const { data } = await axios.get<Phone[]>(`https://81a99b1e3f23d819.mokky.dev/phones`);
  return data;
});

// Для этой части создать slice.ts

const initialState: PhoneSliceState = {
  phoneInfo: [],
  status: Status.LOADING,
};

export const phones = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhones.pending, (state) => {
        state.status = Status.LOADING;
        state.phoneInfo = [];
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.phoneInfo = action.payload;
      })
      .addCase(fetchPhones.rejected, (state) => {
        state.status = Status.ERROR;
        state.phoneInfo = [];
      });
  },
});

export default phones.reducer;

// Для этой части создать selectors.ts

export const selectPhoneInfo = (state: RootState) => state.phones.phoneInfo;
export const selectProductNum = (state: RootState) => state.filter.productNum;

export const selectExtractedItems = createSelector(
  [selectPhoneInfo, selectProductNum],
  (phoneInfo, productNum) => phoneInfo.slice(0, productNum),
);

export const selectModalItems = createSelector(
  [selectPhoneInfo, selectProductNum],
  (phoneInfo, productNum) => phoneInfo.slice(productNum, phoneInfo.length),
);
