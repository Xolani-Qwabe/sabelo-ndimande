import { createTheme } from "@mui/material/styles";

const baseTheme = {
  typography: {
    fontFamily: `"Geist", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: { 
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.5px',
    },
    h2: { 
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.25px'
    },
    h3: { 
      fontWeight: 500,
      fontSize: '1.75rem'
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: { 
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: { 
      fontSize: '0.875rem',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.5px'
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)'
        }
      }
    }
  }
};

// Dark Theme (Primary)
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#269199',
      dark: '#0F444A',
      light: '#1D6A72',
      contrastText: '#D0C8C3',
    },
    secondary: {
      main: '#63888D',
      dark: '#4A6A6F',
      light: '#97A5A9',
      contrastText: '#201D21',
    },
    background: {
      default: '#201D21',
      paper: '#2A272B',
    },
    text: {
      primary: '#D0C8C3',
      secondary: '#97A5A9',
      disabled: '#63888D',
    },
    divider: '#63888D',
  }
});

// Light Theme
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#269199',
      dark: '#0F444A',
      light: '#1D6A72',
      contrastText: '#000000',
    },
    secondary: {
      main: '#63888D',
      dark: '#4A6A6F',
      light: '#97A5A9',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#D0C8C3',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#201D21',
      secondary: '#16565D',
      disabled: '#97A5A9',
    },
    divider: '#97A5A9',
  }
});


export default darkTheme;