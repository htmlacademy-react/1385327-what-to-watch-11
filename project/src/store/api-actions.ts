import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Film, AuthData, UserData, Review, NewReview } from '../types/types';
import { APIRoute, AppRoute, SIMILAR_COUNT } from '../const';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';

export const fetchFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => (await api.get<Film[]>(APIRoute.Films)).data,
);

export const fetchCurrentFilmAction = createAsyncThunk<Film, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrentFilm',
  async (filmId, {dispatch, extra: api}) => (await api.get<Film>(`${APIRoute.Films}/${filmId}`)).data,
);

export const fetchSimilarFilmsAction = createAsyncThunk<Film[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (filmId, {dispatch, extra: api}) =>
    (await api.get<Film[]>(`${APIRoute.Films}/${filmId}/similar`)).data.filter((film) => film.id.toString() !== filmId).slice(0, SIMILAR_COUNT),
);

export const fetchPromoFilmAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => (await api.get<Film>(APIRoute.Promo)).data,
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (filmId, {dispatch, extra: api}) => (await api.get<Review[]>(`${APIRoute.Review}/${filmId}`)).data,
);

export const postNewReviewAction = createAsyncThunk<void, [number, NewReview], {
    dispatch: AppDispatch;
    stat: State;
    extra: AxiosInstance;
}>(
  'data/postNewReview',
  async ([filmId, {comment, rating}], {dispatch, extra: api}) => {
    await api.post<Review>(`${APIRoute.Review}/${filmId}`, {comment, rating});
  }
);

export const fetchFavoritesFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoritesFilm',
  async (_arg, {dispatch, extra: api}) => (await api.get<Film[]>(APIRoute.Favorites)).data,
);

export const postFavoriteStatusAction = createAsyncThunk<void, [number, boolean], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postFavoriteStatus',
  async ([id, status], { dispatch, extra: api}) => {
    await api.post<Film>(`${APIRoute.Favorites}/${id}/${Number(status)}`);
    dispatch(fetchFavoritesFilmsAction());
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => (await api.get<UserData>(APIRoute.Login)).data,
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
