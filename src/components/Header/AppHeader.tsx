import React from 'react';

import { Grid } from '@mui/material';
import Login from './Login';

import './AppHeader.scss';

const Header: React.FC = () => {
  return (
    <header className='app-header'>
      <Grid container spacing={2} className='container'>
        <Grid container sx={{ justifyContent: 'space-between', paddingTop: 3 }}>
          <Grid item>
            <h1>Mapa kaváren</h1>
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
