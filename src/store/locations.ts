import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationsState {
  locations: string[] | null;
  currentLocation: string;
}

const initialLocationsState: LocationsState = {
  locations: null,
  currentLocation: 'All',
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: initialLocationsState,
  reducers: {
    setLocations: (state, action: PayloadAction<{ _id: string; locations: string[] }[]>) => {
      state.locations = action.payload[0].locations;
    },
    setCurrentLocation: (state, action: PayloadAction<string>) => {
      state.currentLocation = action.payload;
    }
  }
});

export const { setLocations, setCurrentLocation } = locationsSlice.actions;
export default locationsSlice.reducer;
