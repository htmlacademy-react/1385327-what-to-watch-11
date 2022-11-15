import { createReducer } from '@reduxjs/toolkit';
import { changeFilter, resetFilmsList, setFilms, createFilmsList } from './action';

import { Film } from '../types/types';
import { DEFAULT_GENRE_FILTER, MAX_COUNT } from '../const';

import filmsInfo from '../mock/films-info';

const initialState = {
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
  filmsCount: MAX_COUNT as number,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilms, (state) => {
      state.films = filmsInfo;
    })
    .addCase(changeFilter, (state, action) => {
      state.genreFilter = action.payload;
    })
    .addCase(createFilmsList, (state) => {
      state.filmsCount += MAX_COUNT;
    })
    .addCase(resetFilmsList, (state) => {
      state.filmsCount = MAX_COUNT;
    });
});

export { reducer };
