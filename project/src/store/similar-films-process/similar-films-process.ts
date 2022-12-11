import { createSlice } from '@reduxjs/toolkit';

import { fetchSimilarFilmsAction } from '../api-actions';
import { SimilarFilmsState } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: SimilarFilmsState = {
  films: [],
  isLoading: true
};

export const similarFilmsProcess = createSlice({
  name: NameSpace.SimilarFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
