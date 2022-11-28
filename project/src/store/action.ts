import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeFilter = createAction('main/changeFilter', (filter: string) => ({
  payload: filter,
}));

export const createFilmsList = createAction('main/createFilmsList');

export const resetFilmsList = createAction('main/resetFilmsList');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setFilmsLoadingStatus = createAction<boolean>('data/setFilmsLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
