import { useState } from 'react';
import { usePopUpContextSubmit } from '../../contexts/PopupContext';

// import PopUp from '../PopUp/PopUp';

import { IconButton, Tooltip, Grid, Menu, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import { Logout } from '@mui/icons-material';

import './AppHeader.scss';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className='app-header'>
      <Grid container className='container'>
        <Grid item className='header-m'>
          <Tooltip title='Log In'>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar color='primary' />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          {/* {popUpSubmited && <PopUp />} */}
        </Grid>
      </Grid>
      <Grid container className='header__wrapper'>
        <h1>Mapa kaváren</h1>
        <p className='claim'>... tady se jede jenom výběrovka</p>
      </Grid>
    </header>
  );
};

export default Header;
