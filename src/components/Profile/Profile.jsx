import React, {useEffect} from 'react'
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux'
import { ExitToApp } from '@mui/icons-material';


const Profile = () => {
  const userData = useSelector((state) => state.userAuth);
  
  const favoritMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <Box>
      <Box display={'flex'} justifyContent='space-between'>
        <Typography variant='h4' gutterBottom>My Profile</Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoritMovies.length ? <Typography variant='h5'>Add favorites or watchlist some movies to see them here!!!</Typography> : (
        <Box>
          FavoritMovies
        </Box>
      )} 
    </Box>
  )
}

export default Profile