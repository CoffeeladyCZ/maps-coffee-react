import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CafeDetailResponse } from '../types/cafe';

interface CafeDetailState {
  cafeDetail: CafeDetailResponse | null;
  actualCafe: CafeDetailResponse | null;
}

const initialCafeDetailState: CafeDetailState = {
  cafeDetail: null,
  actualCafe: null,
};

export const cafeDetailSlice = createSlice({
  name: 'cafeDetail',
  initialState: initialCafeDetailState,
  reducers: {
    setCafeDetail: (state, action: PayloadAction<CafeDetailResponse | null>) => {
      state.cafeDetail = action.payload;
    },
    setActualCafe: (state, action: PayloadAction<CafeDetailResponse | null>) => {
      state.actualCafe = action.payload;
    }
  }
});

export const { setCafeDetail, setActualCafe } = cafeDetailSlice.actions;
export default cafeDetailSlice.reducer;
