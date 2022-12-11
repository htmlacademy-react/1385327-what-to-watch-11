import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../types/state';
import { DEFAULT_GENRE_FILTER, MAX_COUNT, NameSpace } from '../../const';

const initialState: AppState = {
  currentGenre: DEFAULT_GENRE_FILTER,
  filmsOpen: MAX_COUNT
};

export const appProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    genreSet: (state, action: PayloadAction<string>) => {
      state.currentGenre = action.payload;
    },
    genreReset: (state) => {
      state.currentGenre = DEFAULT_GENRE_FILTER;
    },
    createFilmsList: (state) => {
      state.filmsOpen += MAX_COUNT;
    },
    resetFilmsList: (state) => {
      state.filmsOpen = MAX_COUNT;
    },
  },
});

export const {genreSet, genreReset, createFilmsList, resetFilmsList} = appProcess.actions;
