import React from 'react'
import { useTranslation } from 'react-i18next';

const AppRegistration: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      { t('nothing')}
    </div>
  )
}

export default AppRegistration;
