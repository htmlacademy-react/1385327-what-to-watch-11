import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { filmsProcess } from './films-process/films-process';
import { promoFilmProcess } from './promo-film-process/promo-film-process';
import { currentFilmProcess } from './current-film-process/current-film-process';
import { similarFilmsProcess } from './similar-films-process/similar-film-process';
import { reviewsProcess } from './reviews-process/reviews-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.PromoFilm]: promoFilmProcess.reducer,
  [NameSpace.CurrentFilm]: currentFilmProcess.reducer,
  [NameSpace.SimilarFilms]: similarFilmsProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
});
