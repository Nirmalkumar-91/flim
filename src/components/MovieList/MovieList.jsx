import React from 'react'
import { Box, Grid } from '@mui/material';

import styles from './styles';
import { Movie } from '..'

const MovieList = ({movies, numberOfMovies}) => {
  const classes = styles();

  return (
    <Grid container >
      <Box sx={classes.movieContainer}>
          {movies.results.slice(0, numberOfMovies).map((movie, i) => (
            <Movie key={i} movie={movie} i={i}/>
          ))}
      </Box>
   </Grid>
  )
}

export default MovieList;