import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
  isLogin: boolean;
}

const initialState: SettingsState = {
  language: 'en',
  isLogin: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    checkLoginUser: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    }
  }
});

export const { setLanguage, setLogin, checkLoginUser } = settingsSlice.actions;
export default settingsSlice.reducer;
