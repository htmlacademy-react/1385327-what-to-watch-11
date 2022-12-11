import { appProcess, genreSet, genreReset, createFilmsList, resetFilmsList } from './app-process';

import { Film } from '../../types/types';
import { AppState } from '../../types/state';
import { makeFakeFilm } from '../../mocks/mocks';
import { DEFAULT_GENRE_FILTER, MAX_COUNT } from '../../const';

const diffFilm: Film =  makeFakeFilm();

describe('Reducer: filmsProcess', () => {
  let state: AppState;

  beforeEach(() => {
    state = {currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT};
  });

  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({  currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT});
  });

  describe('appProcess test', () => {
    it('genreSet', () => {
      expect(appProcess.reducer({currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT}, genreSet(diffFilm.genre)))
        .toEqual({currentGenre: diffFilm.genre, filmsOpen: MAX_COUNT});
    });

    it('genreReset', () => {
      expect(appProcess.reducer({currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT}, genreReset()))
        .toEqual({currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT});
    });

    it('createFilmsList', () => {
      expect(appProcess.reducer({currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT }, createFilmsList()))
        .toEqual({ currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT + MAX_COUNT});
    });

    it('resetFilmsList', () => {
      expect(appProcess.reducer({currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT}, resetFilmsList()))
        .toEqual({currentGenre: DEFAULT_GENRE_FILTER, filmsOpen: MAX_COUNT});
    });
  });

});
