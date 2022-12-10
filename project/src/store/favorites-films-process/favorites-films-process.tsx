import { createSlice } from '@reduxjs/toolkit';
import { FavoritesFilmsState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFavoritesFilmsAction } from '../api-actions';

const initialState: FavoritesFilmsState = {
  films: [],
  isLoading: true
};

export const favoritesFilmsProcess = createSlice({
  name: NameSpace.FavoritesFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesFilmsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
