import { createSlice } from '@reduxjs/toolkit';
import { fetchPromoFilmAction } from '../api-actions';
import { PromoFilmState } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: PromoFilmState = {
  film: null,
  isLoading: true
};

export const promoFilmProcess = createSlice({
  name: NameSpace.PromoFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
