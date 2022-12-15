import { fetchFilmsAction } from '../api-actions';
import { FilmsState } from '../../types/state';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

const initialState: FilmsState = {
  films: [],
  isLoading: true,
  hasError: false,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});
