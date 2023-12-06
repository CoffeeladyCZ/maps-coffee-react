import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Grid } from '@mui/material';
import Login from './Login';

import './AppHeader.scss';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className='app-header'>
      <Grid container spacing={2} className='container'>
        <Grid container className='mt-6 justify-between'>
          <Grid item>
            <Link to="/">
              <h1 className='text-xxl font-bold uppercase'>{ t('mapCafes') }</h1>
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
