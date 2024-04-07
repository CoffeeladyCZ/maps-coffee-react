import { configureStore } from '@reduxjs/toolkit';

import { settingsSlice } from './settings';
import { cafeDetailSlice } from './cafeDetail';
import { cafeListSlice } from './cafeList';
import { locationsSlice } from './locations';
import { getLanguageFromLocalStorage } from '../Utils/common';

const persistedLanguage = getLanguageFromLocalStorage();

const store = configureStore({
  reducer: {
    cafeDetail: cafeDetailSlice.reducer,
    cafeList: cafeListSlice.reducer,
    settings: settingsSlice.reducer,
    locations: locationsSlice.reducer,
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
