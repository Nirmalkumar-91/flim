import React from 'react'
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { Actors, MovieInformation, Movies, NavBar, Profile } from './';
import styles from './styles';
const App = () => {
  // const theme = createTheme();
  const customStyles = styles();
  return (
      <div style={customStyles.root}>
        <CssBaseline />
        <NavBar />
          <main style={customStyles.content}>
            <div style={customStyles.toolbar} />
            <Routes>
              <Route path='/' element={
                <Movies />
              }>
              <Route path='/approved' element={
                <Movies />
              }></Route>
              </Route>
              <Route path='/movie/:id' element={
                <MovieInformation />
              }>
              </Route>
              <Route path='/actors/:id' element={
                <Actors />
              }>
              </Route>
              <Route path='/profile/:id' element={
                <Profile />
              }>
              </Route>
            </Routes>
          </main>
      </div>
  )
}

export default App