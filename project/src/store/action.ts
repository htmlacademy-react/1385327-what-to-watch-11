import { createAction } from '@reduxjs/toolkit';
import { NewReview } from '../types/types'; //Film,   Review,
import { AppRoute } from '../const';//AuthorizationStatus,

// export const changeFilter = createAction('main/changeFilter', (filter: string) => ({
//   payload: filter,
// }));

// export const createFilmsList = createAction('main/createFilmsList');

// export const resetFilmsList = createAction('main/resetFilmsList');

// export const loadSimilarFilms = createAction<Film[]>('data/loadSimilarFilms');

// export const loadFilm = createAction<Film>('data/loadFilm');

// export const loadFilms = createAction<Film[]>('data/loadFilms');

// export const loadPromo = createAction<Film>('data/loadPromo');

// export const loadReviews = createAction<Review[]>('data/loadReviews');

export const postReview = createAction('data/postReview', (value: NewReview) => ({ payload: value }));

// export const setFilmLoadingStatus = createAction<boolean>('data/setFilmLoadingStatus');

// export const setFilmsLoadingStatus = createAction<boolean>('data/setFilmsLoadingStatus');

// export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
