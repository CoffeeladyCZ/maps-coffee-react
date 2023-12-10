import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Grid } from '@mui/material';
import Login from './Login';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header>
      <Grid container spacing={2} className='container px-8 py-4'>
        <Grid container className='mt-6 justify-between'>
          <Grid item>
            <Link to="/">
              <h1 className='text-2xl font-bold uppercase'>{ t('mapCafes') }</h1>
            </Link>
          </Grid>
          <Grid item>
            <Login />
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
