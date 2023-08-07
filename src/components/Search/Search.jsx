import React, { useState } from 'react'
import { TextField, InputAdornment, Box} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';

import styles from './styles'
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const classes = styles();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      dispatch(searchMovie(query));
    }
  };

  const location = useLocation();

  if(location.pathname !== '/') return null;

  return (
    <Box sx={classes.searchContainer}>
      <TextField  
      onKeyPress={handleKeyPress}
      onChange={(e) => setQuery(e.target.value)}
      value= {query}
      variant= "standard"
      InputProps={{
        sx: classes.input,
        startAdornment:(
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        )
      }}
      />
    </Box>
  )
}

export default Search