import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Grid } from '@mui/material';
import User from './User';
import LanguageSwitch from './LanguageSwitch';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} className='my-6 justify-between'>
      <Grid item>
        <Link to="/">
          <h1 className='text-2xl font-bold uppercase'>{ t('mapCafes') }</h1>
        </Link>
      </Grid>
      <Grid item className="flex">
        <User />
        <LanguageSwitch />
      </Grid>
    </Grid>
  );
};

export default Header;
