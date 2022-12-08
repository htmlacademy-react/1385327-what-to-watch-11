import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmsState } from '../../types/state';
import { DEFAULT_GENRE_FILTER, MAX_COUNT, NameSpace } from '../../const';
import { fetchFilmsAction } from '../api-actions'; //, postFavoriteStatusAction


const initialState: FilmsState = {
  films: [],
  isLoading: true,
  currentGenre: DEFAULT_GENRE_FILTER,
  filmsOpen: MAX_COUNT
};

export const filmsProcess = createSlice({
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
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isLoading = false;
      });
    // .addCase(postFavoriteStatusAction.fulfilled, (state, action) => {
    //   const filmIndex = state.films.findIndex((film) => film.id === action.payload.id);
    //   if(filmIndex !== -1){
    //     state.films[filmIndex].isFavorite = action.payload.isFavorite;
    //   }
    // });
  }
});

export const {genreSet, genreReset, createFilmsList, resetFilmsList} = filmsProcess.actions;
