import { createTheme } from '@mui/material'

const theme = createTheme();
const styles = ()=>({
  searchContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center !important',
      width: '100%',
    },
  },
  input: {
    color: theme.palette.mode === 'light' && 'dark',
    filter: theme.palette.mode === 'light' && 'invert(1)',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-10px',
      marginBottom: '10px',
    },
  },
});

export default styles;