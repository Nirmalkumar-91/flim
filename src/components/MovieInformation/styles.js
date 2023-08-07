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
  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  castImage: {
    width: '100%',
    maxWidth: '7em',
    height: '8em',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '75%',
    height: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%',
    },
  }
});

export default styles;