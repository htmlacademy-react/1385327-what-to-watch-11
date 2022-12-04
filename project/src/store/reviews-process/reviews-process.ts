import { createSlice } from '@reduxjs/toolkit';
import { ReviewsState } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviewsAction } from '../api-actions';


const initialState: ReviewsState = {
  comments: [],
  isLoading: true
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
