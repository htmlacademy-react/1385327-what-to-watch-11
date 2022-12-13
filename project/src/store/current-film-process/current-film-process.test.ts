import { fetchCurrentFilmAction } from '../api-actions';
import { currentFilmProcess } from './current-film-process';
import { Film } from '../../types/types';
import { CurrentFilmState } from '../../types/state';
import { makeFakeFilm } from '../../mocks/mocks';

const film: Film = makeFakeFilm();

describe('Reducer: currentFilmProcess', () => {
  let state: CurrentFilmState;

  beforeEach(() => {
    state = {film: null, isLoading: true};
  });

  it('without additional parameters should return initial state', () => {
    expect(currentFilmProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({film: null, isLoading: true});
  });

  describe('currentFilmProcess test', () => {
    it('fetchCurrentFilmAction pending', () => {
      expect(currentFilmProcess.reducer(state, {type: fetchCurrentFilmAction.pending.type}))
        .toEqual({isLoading: true, film: null});
    });

    it('fetchCurrentFilmAction fulfilled', () => {
      expect(currentFilmProcess.reducer(state, {type: fetchCurrentFilmAction.fulfilled.type, payload: film}))
        .toEqual({isLoading: false, film: film});
    });

    it('fetchCurrentFilmAction rejected', () => {
      expect(currentFilmProcess.reducer(state, {type: fetchCurrentFilmAction.rejected.type}))
        .toEqual({isLoading: false, film: null});
    });
  });

});
