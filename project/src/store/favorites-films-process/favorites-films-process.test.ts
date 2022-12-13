import { fetchFavoritesFilmsAction } from '../api-actions';
import { favoritesFilmsProcess } from './favorites-films-process';
import { Film } from '../../types/types';
import { FavoritesFilmsState } from '../../types/state';
import { makeFakeFilm } from '../../mocks/mocks';

const films: Film[] = Array.from({length: 24}, makeFakeFilm);

describe('Reducer: favoritesFilmsProcess', () => {
  let state: FavoritesFilmsState;

  beforeEach(() => {
    state = {films: [], isLoading: true};
  });

  it('without additional parameters should return initial state', () => {
    expect(favoritesFilmsProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({films: [], isLoading: true});
  });

  describe('favoritesFilmsProcess test', () => {
    it('fetchFavoritesFilmsAction pending', () => {
      expect(favoritesFilmsProcess.reducer(state, {type: fetchFavoritesFilmsAction.pending.type}))
        .toEqual({isLoading: true, films: []});
    });

    it('fetchFavoritesFilmsAction fulfilled', () => {
      expect(favoritesFilmsProcess.reducer(state, {type: fetchFavoritesFilmsAction.fulfilled.type, payload: films}))
        .toEqual({isLoading: false, films: films});
    });

    it('fetchFavoritesFilmsAction rejected', () => {
      expect(favoritesFilmsProcess.reducer(state, {type: fetchFavoritesFilmsAction.rejected.type}))
        .toEqual({isLoading: false, films: []});
    });
  });

});
