import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentCafeType } from '../contexts/MapsContext';

interface CafeDetailState {
  cafeDetail: CurrentCafeType | null;
}

const initialCafeDetailState: CafeDetailState = {
  cafeDetail: null,
};

export const cafeDetailSlice = createSlice({
  name: 'cafeDetail',
  initialState: initialCafeDetailState,
  reducers: {
    setCafeDetail: (state, action: PayloadAction<CurrentCafeType | null>) => {
      state.cafeDetail = action.payload;
    }
  }
});

export const { setCafeDetail } = cafeDetailSlice.actions;
export default cafeDetailSlice.reducer;
