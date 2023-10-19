import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './/locales/en.json';
import cz from './locales/cz.json';

const resources = {
  en: {
    translation: en
  },
  cz: {
    translation: cz
  }
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: ['cz'],
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
