import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Divider, IconButton, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import { Logout, Login } from '@mui/icons-material';

import { UserLogin } from '../../constants';
import { setLogin, checkLoginUser } from '../../store/settings';
import { RootState } from '../../store';

const User: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpenMenu = Boolean(anchorEl);
  const isLogin = useSelector((state: RootState) => state.settings.isLogin);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(UserLogin.LOGIN);
    dispatch(setLogin(false));
    handleClose();
  }

  useEffect(() => {
    const login = localStorage.getItem(UserLogin.LOGIN);
    dispatch(checkLoginUser(login === 'true'));
  }, []);

  return (
    <>
      { isLogin ?
        (
          <>
            <Tooltip title={t('login')}>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ mr: 3 }}
                aria-controls={isOpenMenu ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={isOpenMenu ? 'true' : undefined}
              >
                <Avatar color='primary' />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={isOpenMenu}
              onClose={handleClose}
              onClick={handleClose}
              sx={{
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
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar />{ t('profile') }
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                { t('logout') }
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Tooltip title={t('login')}>
            <IconButton
              onClick={() => history.push('/login')}
              size='small'
              sx={{ mr: 2 }}
            >
              <Login fontSize='small' />
            </IconButton>
          </Tooltip>
        )}
    </>
  )
}

export default User;