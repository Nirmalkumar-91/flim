import { Box, Button, Typography } from '@mui/material';
import React from 'react'

import styles from './styles'

const Pagination = ({currentPage, setPage, totalNoOfPages }) => {
  const classes = styles();

  const handlePrev = () => {
    if(currentPage !== 1){
      setPage((prevPage) => prevPage - 1);
    }
  }
  const handleNext = () => {
    if(currentPage !== totalNoOfPages){
      setPage((prevPage) => prevPage + 1);
    }
  }

  if(totalNoOfPages === 0) return null;

  return (
    <Box sx={classes.container} >
      <Button onClick={handlePrev} sx={classes.button} variant='contained' color='primary' type='button'>Prev</Button>
      <Typography variant='h4' sx={classes.pageNumber}>{currentPage}</Typography>
      <Button onClick={handleNext} sx={classes.button} variant='contained' color='primary' type='button'>Next</Button>
    </Box>
  )
}

export default Pagination