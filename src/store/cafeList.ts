import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CafeDetailResponse } from '../types/cafe';

interface CafeListState {
  cafeList: CafeDetailResponse[] | null;
}

const initialCafeListState: CafeListState = {
  cafeList: null,
};

export const cafeListSlice = createSlice({
  name: 'cafeList',
  initialState: initialCafeListState,
  reducers: {
    setCafes: (state, action: PayloadAction<CafeDetailResponse[] | null>) => {
      state.cafeList = action.payload;
    }
  }
});

export const { setCafes } = cafeListSlice.actions;
export default cafeListSlice.reducer;
