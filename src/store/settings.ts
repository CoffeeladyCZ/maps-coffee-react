import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
}

const initialState: SettingsState = {
  language: 'en'
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    }
  }
});

export const { setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
