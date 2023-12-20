import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface filterSliceState {
  productNum: number;
  openModalId: number | null;
  searchValue: string;
  clickedMain: number;
  isChecked: boolean;
}

const initialState: filterSliceState = {
  productNum: 3,
  openModalId: null,
  searchValue: '',
  clickedMain: 0,
  isChecked: false,
};

export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setProductNum(state, action: PayloadAction<number>) {
      state.productNum = action.payload;
    },
    setOpenModalId(state, action: PayloadAction<number>) {
      state.openModalId = action.payload;
    },
    closeAllModals(state) {
      state.openModalId = null;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setClickedMain(state, action: PayloadAction<number>) {
      state.clickedMain = action.payload;
    },
    setIsChecked(state, action: PayloadAction<boolean>) {
      state.isChecked = action.payload;
    },
  },
});

export const {
  setProductNum,
  setOpenModalId,
  closeAllModals,
  setSearchValue,
  setClickedMain,
  setIsChecked,
} = filter.actions;
export default filter.reducer;
