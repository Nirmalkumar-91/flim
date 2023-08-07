import React from 'react'
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, useTheme, Button, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import styles from './Styles';
import { useGetGenreQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const demoCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

const Sidebar = ({setMobileOpen}) => {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const theme = useTheme();
  const classes = styles();
  const {data, isFetching } = useGetGenreQuery();
  const dispatch = useDispatch();

  return (
    <>
      <Link to='/' style={classes.imageLink}>
        <img 
          style={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt='Flim logo'
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
          {categories.map(({label, value}) => (
            <Link key={value} style={classes.links} to='/'>
                <ListItemButton onClick={() => {dispatch(selectGenreOrCategory(value))} }  >
                  <ListItemIcon>
                    <img src={genreIcons[label.toLowerCase()]} height={30} style={classes.genreImages} alt='genreImage' />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
            </Link>
          ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genre</ListSubheader>
          {isFetching ? (
             <Box display='flex' justifyContent="center">
              <CircularProgress />
            </Box>
          ) : data.genres.map(({name, id}) => (
            <Link key={name} style={classes.links} to='/'>
              <ListItemButton onClick={() => {dispatch(selectGenreOrCategory(id))}} component='span' >
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} height={30} style={classes.genreImages} alt='genreImage' />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))}
      </List>
    </>
  )
}

export default Sidebar;