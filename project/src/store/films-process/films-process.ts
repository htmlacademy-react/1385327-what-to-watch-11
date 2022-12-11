import { fetchFilmsAction } from '../api-actions';
import { FilmsState } from '../../types/state';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

const initialState: FilmsState = {
  films: [],
  isLoading: true,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
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
  }
});
