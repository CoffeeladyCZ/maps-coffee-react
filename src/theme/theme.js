import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#9F2B1F',
      main: '#9F2B1F',
      dark: '#8B0000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#1c2025',
      dark: '#ba000d',
      contrastText: '#000',
    },
    black: {
      main: '#1C2025'
    }
  },
  values: {
    xs: 0,
    sm: 640,
    md: 940,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  },
});
