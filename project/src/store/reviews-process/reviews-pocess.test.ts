import { fetchReviewsAction } from '../api-actions';
import { reviewsProcess } from './reviews-process';

import { Review } from '../../types/types';
import { ReviewsState } from '../../types/state';
import { makeFakeFilmComment } from '../../mocks/mocks';

const comments: Review[] = Array.from({length: 24}, makeFakeFilmComment);

describe('Reducer: reviewsProcess', () => {
  let state: ReviewsState;

  beforeEach(() => {
    state = {comments: [], isLoading: true};
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({comments: [], isLoading: true});
  });

  describe('reviewsProcess test', () => {
    it('fetchReviewsAction pending', () => {
      expect(reviewsProcess.reducer(state, {type: fetchReviewsAction.pending.type, payload: comments}))
        .toEqual({isLoading: true, comments: []});
    });

    it('fetchReviewsAction fulfilled', () => {
      expect(reviewsProcess.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: comments}))
        .toEqual({isLoading: false, comments: comments});
    });

    it('fetchReviewsAction rejected', () => {
      expect(reviewsProcess.reducer(state, {type: fetchReviewsAction.rejected.type, payload: comments}))
        .toEqual({isLoading: false, comments: []});
    });
  });

});
