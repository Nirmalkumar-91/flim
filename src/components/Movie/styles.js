import { createTheme } from '@mui/material'

const theme = createTheme();

const styles = ()=>({
  movie: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center',
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bolder',
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    borderRadius: '20px',
    height: '300px',
    marginBottom: '10px',
   
  },
  imageHover: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }
});

export default styles;