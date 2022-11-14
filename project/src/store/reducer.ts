import { createReducer } from '@reduxjs/toolkit';
import { changeFilter, setFilms } from './action';

import { Film } from '../types/types';
import { DEFAULT_GENRE_FILTER } from '../const';

import filmsInfo from '../mock/films-info';

const initialState = {
  genreFilter: DEFAULT_GENRE_FILTER,
  films: [] as Film[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilms, (state) => {
      state.films = filmsInfo;
    })
    .addCase(changeFilter, (state, action) => {
      state.genreFilter = action.payload;
    });
});

export { reducer };
