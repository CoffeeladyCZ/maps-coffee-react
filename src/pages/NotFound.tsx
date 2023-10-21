import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>404</h1>
      <div>{ t('errors.404')}</div>
    </>
  )
};

export default NotFound;
