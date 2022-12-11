import { fetchSimilarFilmsAction } from '../api-actions';
import { similarFilmsProcess } from './similar-films-process';

import { Film } from '../../types/types';
import { SimilarFilmsState } from '../../types/state';
import { makeFakeFilm } from '../../mocks/mocks';

const films: Film[] = Array.from({length: 24}, makeFakeFilm);

describe('Reducer: similarFilmsProcess', () => {
  let state: SimilarFilmsState;

  beforeEach(() => {
    state = {films: [], isLoading: true};
  });

  it('without additional parameters should return initial state', () => {
    expect(similarFilmsProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({films: [], isLoading: true});
  });

  describe('similarFilmsProcess test', () => {
    it('fetchSimilarFilmsAction pending', () => {
      expect(similarFilmsProcess.reducer(state, {type: fetchSimilarFilmsAction.pending.type}))
        .toEqual({isLoading: true, films: []});
    });

    it('fetchSimilarFilmsAction fulfilled', () => {
      expect(similarFilmsProcess.reducer(state, {type: fetchSimilarFilmsAction.fulfilled.type, payload: films}))
        .toEqual({isLoading: false, films: films});
    });

    it('fetchSimilarFilmsAction rejected', () => {
      expect(similarFilmsProcess.reducer(state, {type: fetchSimilarFilmsAction.rejected.type}))
        .toEqual({isLoading: false, films: []});
    });
  });

});
