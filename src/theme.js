import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
  },
});

export default theme;
