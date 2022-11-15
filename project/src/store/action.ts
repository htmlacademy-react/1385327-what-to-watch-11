import { createAction } from '@reduxjs/toolkit';

export const setFilms = createAction('main/setFilms');

export const changeFilter = createAction('main/changeFilter', (filter: string) => ({
  payload: filter,
}));

export const createFilmsList = createAction('main/createFilmsList');

export const resetFilmsList = createAction('mail/resetFilmsList');
