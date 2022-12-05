import { createSlice } from '@reduxjs/toolkit';
import { FavoritesFilmsState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFavoritesAction } from '../api-actions';

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
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
