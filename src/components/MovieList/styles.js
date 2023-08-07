import { createTheme } from '@mui/material'

const theme = createTheme();

const styles = ()=>({
  movieContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  }
});

export default styles;