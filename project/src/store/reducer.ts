import { createReducer } from '@reduxjs/toolkit';
import { changeFilter, resetFilmsList, createFilmsList, loadFilms, requireAuthorization, setFilmsLoadingStatus } from './action';

import { Film } from '../types/types';
import { DEFAULT_GENRE_FILTER, MAX_COUNT, AuthorizationStatus } from '../const';
// import { fetchPromoFilm } from './api-actions';

const initialState = {
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
  filmsCount: MAX_COUNT as number,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsLoading: false as boolean,
  // promo: {} as Film,
};

const reducer = createReducer(initialState, (builder) => {
  builder
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
    });
});

export { reducer };
