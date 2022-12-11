import { fetchPromoFilmAction } from '../api-actions';
import { promoFilmProcess } from './promo-film-process';

import { Film } from '../../types/types';
import { PromoFilmState } from '../../types/state';
import { makeFakeFilm } from '../../mocks/mocks';

const film: Film = makeFakeFilm();

describe('Reducer: promoFilmProcess', () => {
  let state: PromoFilmState;

  beforeEach(() => {
    state = {film: null, isLoading: true};
  });

  it('without additional parameters should return initial state', () => {
    expect(promoFilmProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({film: null, isLoading: true});
  });

  describe('promoFilmProcess test', () => {
    it('fetchPromoFilmAction pending', () => {
      expect(promoFilmProcess.reducer(state, {type: fetchPromoFilmAction.pending.type}))
        .toEqual({isLoading: true, film: null});
    });

    it('fetchPromoFilmAction fulfilled', () => {
      expect(promoFilmProcess.reducer(state, {type: fetchPromoFilmAction.fulfilled.type, payload: film}))
        .toEqual({isLoading: false, film: film});
    });

    it('fetchPromoFilmAction rejected', () => {
      expect(promoFilmProcess.reducer(state, {type: fetchPromoFilmAction.rejected.type}))
        .toEqual({isLoading: false, film: null});
    });
  });
});
