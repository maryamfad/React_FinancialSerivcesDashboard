import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      ':root': {
        '--primary-color' :'#003366',
        '--secondary-color': '#C4DDE8 ',
        '--accent-color': '#D4D7E2',
        '--background-color': '#f4f4f4',
        '--text-color': '#333',
        '--navbar-color' : '#3498db',
        '--dashboard-primary': '#008080',
        '--dashboard-secondary': '#DEF2C8'
      },
      body: {
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
      },
    },
  },
  colors: {
    primary: 'var(--primary-color)',
    secondary: 'var(--secondary-color)',
    navbar: 'var(--navbar-color)',
    accentColor: 'var(--accent-color)',
    dashboardSecondary: 'var(--dashboard-secondary)',
    dashboardPrimary: 'var(--dashboard-primary)',
  },
});

export default theme;