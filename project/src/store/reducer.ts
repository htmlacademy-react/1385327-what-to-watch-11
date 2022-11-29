import { createReducer } from '@reduxjs/toolkit';
import { changeFilter, resetFilmsList, createFilmsList, loadFilms, requireAuthorization, setFilmsLoadingStatus, loadPromo, loadReviews, loadFilm, setFilmLoadingStatus } from './action';

import { Film, Review } from '../types/types';
import { DEFAULT_GENRE_FILTER, MAX_COUNT, AuthorizationStatus } from '../const';

const initialState = {
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
  film: {} as Film,
  filmsCount: MAX_COUNT as number,
  authorizationStatus: AuthorizationStatus.Unknown,
  isFilmsLoading: false as boolean,
  isFilmLoading: false as boolean,
  promo: {} as Film,
  reviews: [] as Review[],
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
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setFilmLoadingStatus, (state, action) => {
      state.isFilmLoading = action.payload;
    })
    .addCase(setFilmsLoadingStatus, (state, action) => {
      state.isFilmsLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
