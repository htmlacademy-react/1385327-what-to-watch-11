import { createReducer } from '@reduxjs/toolkit';
import { changeFilter, resetFilmsList, createFilmsList, loadFilms, requireAuthorization, setFilmsLoadingStatus, setError } from './action'; //, setFilms

import { Film } from '../types/types';
import { DEFAULT_GENRE_FILTER, MAX_COUNT, AuthorizationStatus } from '../const';

// import filmsInfo from '../mock/films-info';

const initialState = {
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
  filmsCount: MAX_COUNT as number,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsLoading: false as boolean,
  error: null as null | string,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(setFilms, (state) => {
    //   state.films = filmsInfo;
    // })
    .addCase(changeFilter, (state, action) => {
      state.genreFilter = action.payload;
    })
    .addCase(createFilmsList, (state) => {
      state.filmsCount += MAX_COUNT;
    })
    .addCase(resetFilmsList, (state) => {
      state.filmsCount = MAX_COUNT;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setFilmsLoadingStatus, (state, action) => {
      state.isFilmsLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
