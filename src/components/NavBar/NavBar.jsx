import React, { useEffect, useState } from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, useTheme, Box  } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import styles from './styles';
import {Sidebar, Search} from '..';
import { fetchToken, getSessionId, moviesApi } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/auth';

const NavBar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userAuth);
  const theme = useTheme();
  const classes = styles();
  // const isAuthenticated = false;
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMoblie = useMediaQuery('(max-width:600px)');
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserAuthenticated = async () => {
      if(token){
        if(sessionIdFromLocalStorage){
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await getSessionId();
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));

        }
      }
    }

    isUserAuthenticated();
  }, [token])

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar sx={classes.toolbar}>
          {isMoblie && (
            <IconButton
              edge='start'
              color='inherit'
              style={{outline: 'none'}}
              onClick={()=> setMobileOpen((prev) => !prev)}
              sx={classes.menuButton}
            >
            <Menu />
            </IconButton>
          )}
          <IconButton 
            color='inherit'
            sx={{ml: 1}}
            onClick= {() => {}}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMoblie && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to = {`/profile/${user.id}`}
                sx={classes.linkButton}
                onClick={() => {}}
              >
                {!isMoblie && <>My Movies &nbsp;</>}
                <Avatar 
                  style={{width: 30, height: 30}}
                  alt= "Profile"

                />
              </Button>
            )}
          </div>
          {isMoblie && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <Box sx={classes.drawer}>
          {isMoblie ? (
            <Drawer
              variant='temporary'
              anchor='right'
              open={mobileOpen}
              onClose={()=> setMobileOpen((prev) => !prev)}
              sx={{paper:classes.drawerPaper}}
              ModalProps={{keepMounted: true}}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              sx={{paper: classes.drawerPaper}}
              variant= 'permanent'
              open
            >
               <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </div>
    </>
  )
}

export default NavBar