import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      ':root': {
        '--primary-color' :'#003366',
        '--secondary-color': '#C4DDE8 ',
        '--accent-color': '#D2D7DF',
        '--background-color': '#f4f4f4',
        '--text-color': '#333',
        '--navbar-color' : '#3498db',
        '--dashboard-primary': '#008080',
        '--dashboard-secondary': '#ffffff',
        '--dashboard-accent-color': '#F5DDCB'
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
    dashboardAccentColor: 'var(--dashboard-accent-color)',
  },
});

export default theme;