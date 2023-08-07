import { createTheme } from '@mui/material'

const theme = createTheme();

const styles = ()=>({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  posterDiv:{
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
    width: '80%',
    display: 'flex',
    margin: '0 auto !important',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto !important',
      width: '50%',
      display:'flex',
      justifyContent: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto !important',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
  },
  poster: {
   width: '100%',
   display: 'flex',
   borderRadius: '20px',
  },
  justifyDiv: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  
});

export default styles;