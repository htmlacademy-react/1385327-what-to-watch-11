import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/types';
import {AuthorizationStatus} from '../const';

// export const setFilms = createAction('main/setFilms');

export const changeFilter = createAction('main/changeFilter', (filter: string) => ({
  payload: filter,
}));

export const createFilmsList = createAction('main/createFilmsList');

export const resetFilmsList = createAction('main/resetFilmsList');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setFilmsLoadingStatus = createAction<boolean>('data/setFilmsLoadingStatus');

export const setError = createAction<string | null>('data/setError');
