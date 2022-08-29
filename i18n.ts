import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import cz from './public/locales/translation/cz.json';
import en from './public/locales/translation/en.json';

const resources = {
  cz: cz,
  en: en
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "cz",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;
