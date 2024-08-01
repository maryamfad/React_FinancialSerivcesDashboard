import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      ':root': {
        '--primary-color': '#3498db',
        '--secondary-color': '#B8D8D6',
        '--accent-color': '#FBD7D2',
        '--background-color': '#f4f4f4',
        '--text-color': '#333',
        '--navbar-color' : '#3498db'
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
  },
});

export default theme;