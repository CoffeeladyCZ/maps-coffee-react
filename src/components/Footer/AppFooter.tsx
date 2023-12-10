import React from 'react';
import { useTranslation } from 'react-i18next';

import { Divider } from '@mui/material';


const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className='mb-4 mt-8'>
      <Divider />
      <p className='p-4 text-right'>{t('author')}</p>
    </footer>
  )
}

export default Footer;
