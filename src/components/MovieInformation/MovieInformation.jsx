import React, { useEffect, useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack} from '@mui/icons-material'
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetListQuery, useGetMovieQuery, useGetRecomendationQuery } from '../../services/TMDB';
import styles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import {MovieList} from '..';

const MovieInformation = () => {
  const {id} = useParams();
  const classes = styles();
  const dispatch = useDispatch();
  const [isMovieFavorite , setIsMovieFavorite] = useState(false); 
  const [isMovieWatchlisted , setIsMovieWatchlisted] = useState(false); 
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.userAuth);
  const {data, isFetching, error} = useGetMovieQuery(id);
  const {data: favoriteMovie} = useGetListQuery({listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page:1 });
  const {data: watchListMovie} = useGetListQuery({listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page:1 })

  const {data: recommendations, isFetching: isRecomendationFetching} = useGetRecomendationQuery({list: '/recommendations', movie_id: id});

  useEffect(() => {
    setIsMovieFavorite(!!favoriteMovie?.results.find((movie) => movie?.id === data?.id))
  }, [favoriteMovie, data])

  useEffect(() => {
    setIsMovieWatchlisted(!!watchListMovie?.results.find((movie) => movie?.id === data?.id))
  }, [watchListMovie, data])

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

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorite,
    });
    setIsMovieFavorite((prev) => !prev);
  }
  
  const addToWatchList = async () => {
     await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });
    setIsMovieWatchlisted((prev) => !prev);
  }

  console.log(data);
  return (
    <Grid container sx={classes.containerSpaceAround}>
      <Grid style={{marginBottom: '2em'}} item sm={12} lg={4}>
        <Box sx={classes.posterDiv}>
          <img
            style={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt= {data?.title}
          />
        </Box>
      </Grid>
      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({(data.release_date.split('-')[0])})
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item sx={classes.containerSpaceAround}>
          <Box display='flex' align='center' sx={classes.justifyDiv}>
            <Rating readOnly value={(data.vote_average) / 2} />
            <Typography variant='subtitle1' gutterBottom style={{marginLeft: '10px'}}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min / {data?.spoken_languages.length > 0 ?  `/${data?.spoken_languages[0].name}` : ''}
          </Typography>
        </Grid>
        <Grid item sx={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link key={i} style={classes.links} to='/' onClick={() => {dispatch(selectGenreOrCategory(genre.id))}}>
              <img src={genreIcons[genre.name.toLowerCase()]} height={30} style={classes.genreImage} alt='genreImage' />
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom style={{marginTop:'10px'}}>
          Overview
        </Typography>
        <Typography style={{marginBottom: '2rem'}}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, i) => (
            character.profile_path && (
              <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}} >
                <img style={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                <Typography color='textPrimary'>{character?.name}</Typography>
                <Typography color='textSecondary'>
                  {character.character.split('/')[0]}
                </Typography>

              </Grid>  
            ))).slice(0, 6)}
        </Grid>
        <Grid item container style={{marginTop: '2rem'}}>
          <Box sx={classes.buttonContainer}>
            <Grid item xs={12} sm={6} sx={classes.buttonContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button target='_blank' rel='noopener noreferrer' href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>Imdb</Button>
                <Button onClick={() => {setOpen(true)}} href='#' endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} sx={classes.buttonContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button onClick={addToFavorites} endIcon={isMovieFavorite ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorite ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{borderColor: 'primary.main'}}>
                  <Typography component={Link} color='inherit' variant='subtitle2' style={{textDecoration:'none'}}>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like
        </Typography>
        {recommendations ? <MovieList movies={recommendations} numberOfMovies={12} /> : <Box>Sorry nothing is found</Box>}
      </Box>
      <Modal
        closeAfterTransition
        sx={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <Box sx={classes.videoContainer}>
            <iframe 
              autoPlay 
              style={{width: '100%', height: '100%' }} 
              title='Trailer' 
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
          </Box>
        )}
      </Modal>
    </Grid>
  )
}

export default MovieInformation