import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating, Box} from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './styles';

const Movie = ({movie, i}) => {
  const classes = styles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Box sx={classes.movie}>
        <Grow in key={i} timeout={(i+ 1)* 250}>
          <Link style={{textDecoration: 'none'}}  to={`/movie/${movie.id}`}>
            <Box sx ={classes.links}>
              <Box sx={classes.imageHover}>
                <img 
                  alt={movie.title}
                  style={classes.image}
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
                />
              </Box>
            <Typography style={classes.title} variant="h5">{movie.title}</Typography>
            <Tooltip disableTouchListener title={`${movie.vote_average}/ 10`}>
              <div>
                <Rating readOnly value={movie.vote_average /2} precision={0.1} />
              </div>
            </Tooltip>
            </Box>
          </Link>

        </Grow>
      </Box>
    </Grid>
  )
}

export default Movie