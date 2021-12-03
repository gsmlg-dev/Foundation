import { createTheme } from '@mui/material/styles';
import { getThemeProps } from '@mui/styles';

export const theme = createTheme({});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const getTheme = (name) => {
  switch(name) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    default:
      return theme;
  }
};

export default getTheme;
