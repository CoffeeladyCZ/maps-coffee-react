import { configureStore } from '@reduxjs/toolkit';

import { settingsSlice } from './settings';
import { getLanguageFromLocalStorage } from '../Utils';

const persistedLanguage = getLanguageFromLocalStorage();

const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer
  },
  preloadedState: {
    settings: {
      language: persistedLanguage || 'en'
    }
  }
});

export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
