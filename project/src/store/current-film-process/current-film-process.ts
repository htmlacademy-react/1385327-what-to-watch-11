import { fetchCurrentFilmAction } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { CurrentFilmState } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: CurrentFilmState = {
  film: null,
  isLoading: true
};

export const currentFilmProcess = createSlice({
  name: NameSpace.CurrentFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentFilmAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
