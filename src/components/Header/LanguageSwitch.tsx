import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from '@mui/material';

import { setLanguage } from '../../store/settings';
import { saveLanguageToLocalStorage } from '../../Utils/common';
import { RootState } from '../../store';

const LanguageSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.settings.language);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    dispatch(setLanguage(language));
    saveLanguageToLocalStorage(language);
    i18n.changeLanguage(language);
  };

  return (
    <div>
      {currentLanguage === 'cz' ? (
        <Button onClick={() => handleLanguageChange('en')}>
          {t('language.english')}
        </Button>
      ) : (
        <Button onClick={() => handleLanguageChange('cz')}>
          {t('language.czech')}
        </Button>
      )}
    </div>
  );
};

export default LanguageSwitch;