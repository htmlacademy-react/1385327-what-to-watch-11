import { createAction } from '@reduxjs/toolkit';
import { Film, Review } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeFilter = createAction('main/changeFilter', (filter: string) => ({
  payload: filter,
}));

export const createFilmsList = createAction('main/createFilmsList');

export const resetFilmsList = createAction('main/resetFilmsList');

export const loadFilm = createAction<Film>('data/loadFilm');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const loadPromo = createAction<Film>('data/loadPromo');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const setFilmLoadingStatus = createAction<boolean>('data/setFilmLoadingStatus');

export const setFilmsLoadingStatus = createAction<boolean>('data/setFilmsLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
