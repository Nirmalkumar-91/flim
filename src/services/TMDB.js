import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

//https://api.themoviedb.org/3/movie/popular'

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
  endpoints: (builder) => ({
    //* Get Movies by [Type]
    getMovies: builder.query({
      query: ({genreIdOrCategoryName, page, searchQuerry }) => {
        // Get movie by name
        if(searchQuerry) {
          console.log(searchQuerry);
          return `/search/movie?query=${searchQuerry}&page=${page}&api_key=${tmdbApiKey}`
        }

        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
        } 
        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}` 
        } 
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      }
    }),

    //* Get Movie by id
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),

    // Get User Specific Lists
    getRecomendation: builder.query({
      query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    }),

    //* Get Genre
    getGenre: builder.query({
      query: () => `genre/movie/list?page=${page}&api_key=${tmdbApiKey}`
    }),

    // Get Actor Details
    getActorInfo: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`
    }),

    // Get Movie by actors id
    getActorRelatedMovie: builder.query({
      query: ({id, page}) => `discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
    }),

    //get user List
    getList: builder.query({
      query: ({listName, accountId, sessionId, page}) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
    })
  })
});

export const {
  useGetMoviesQuery,
  useGetGenreQuery,
  useGetMovieQuery,
  useGetRecomendationQuery,
  useGetActorInfoQuery,
  useGetActorRelatedMovieQuery,
  useGetListQuery
} = tmdbApi;