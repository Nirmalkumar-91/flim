import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material';


import { useGetActorInfoQuery, useGetActorRelatedMovieQuery } from '../../services/TMDB';
import styles from './styles';
import { ArrowBack } from '@mui/icons-material';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const {id} = useParams();
  const [page, setPage] = useState(1);
  const classes = styles();
  const {data, isFetching, error} = useGetActorInfoQuery(id);
  const navigate = useNavigate();

  const {data: actorRelatedMovie} = useGetActorRelatedMovieQuery({id, page});

  console.log(actorRelatedMovie);

  if(isFetching) {
    return (
    <Box display={'flex'} justifyContent='center' alignItems={'center'}>
      <CircularProgress size='8rem' />
    </Box>
    );
  }

  if(error) {
    return (
    <Box display={'flex'} justifyContent='center' alignItems={'center'}>
      <Link to="/">Something gone wrong go back</Link>
    </Box>
    );
  }

  return (
   <Grid container sx={classes.containerSpaceAround}>
      <Grid style={{marginBottom: '2em'}} item sm={12} lg={4}>
        <Box sx={classes.posterDiv}>
          <img
            style={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt= {data?.name}
          />
        </Box>
      </Grid>
      <Grid item container style={{marginTop: '2rem'}} direction='column' lg={7}>
        <Typography variant='h2' align='left' gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant='h5' align='left' gutterBottom>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
         <Typography variant='body2' align='left' gutterBottom>
          {data?.biography || 'Sorry no biography yet...'}
        </Typography>
        <Grid item container sx={classes.containerSpaceAround} style={{marginTop: '2rem'}} >
          <Grid  item xs={12} sm={6} sx={classes.containerSpaceAround} >
            <Button variant='contained' color='primary' target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/name/${data?.imdb_id}`} >Imdb</Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={classes.containerSpaceAround} >
            <Button startIcon={<ArrowBack />} sx={{borderColor: 'primary.main'}}>
              <Typography component={Link}  onClick={() => navigate(-1)} color='inherit' variant='subtitle2' style={{textDecoration:'none'}}>
                Back
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          Movies
        </Typography>
        { actorRelatedMovie ? <MovieList movies={actorRelatedMovie} numberOfMovies={12} />  : 
          <Box display={'flex'} justifyContent='center' alignItems={'center'}>
              <Typography variant='h5' >Sorry No Related Movies</Typography>
          </Box>}
        <Pagination currentPage={page} setPage={setPage} totalNoOfPages={actorRelatedMovie?.total_pages} />
      </Box>
    </Grid>
  )
}

export default Actors