import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationsState {
  locations: string[] | null;
}

const initialLocationsState: LocationsState = {
  locations: null,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: initialLocationsState,
  reducers: {
    setLocations: (state, action: PayloadAction<{ _id: string; locations: string[] }[]>) => {
      state.locations = action.payload[0].locations;
    }
  }
});

export const { setLocations } = locationsSlice.actions;
export default locationsSlice.reducer;
