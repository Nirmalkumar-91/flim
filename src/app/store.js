import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import  genreOrCategoryReducer from "../features/currentGenreOrCategory";
import  authReduces from "../features/auth";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    userAuth: authReduces
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware)
})