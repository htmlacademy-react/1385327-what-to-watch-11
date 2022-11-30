import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Film, AuthData, UserData, Review, NewReview } from '../types/types';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { loadFilms, setFilmsLoadingStatus, requireAuthorization, redirectToRoute, loadPromo, loadReviews, loadFilm, setFilmLoadingStatus, loadSimilarFilms } from './action';//postReview
import { saveToken, dropToken } from '../services/token';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoadingStatus(true));
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(setFilmsLoadingStatus(false));
    dispatch(loadFilms(data));
  },
);

export const fetchFilm = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setFilmLoadingStatus(true));
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      dispatch(setFilmLoadingStatus(false));
      dispatch(loadFilm(data));
    } catch {
      dispatch(setFilmLoadingStatus(false));
    }
  },
);

export const fetchSimilarFilms = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (id, { dispatch, extra: api }) => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    dispatch(loadSimilarFilms(data));
  },
);

export const fetchPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoadingStatus(true));
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(setFilmsLoadingStatus(false));
    dispatch(loadPromo(data));
  },
);

export const fetchReviews = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (filmId, {dispatch, extra: api}) => {
    try {
      dispatch(setFilmLoadingStatus(true));
      const {data} = await api.get<Review[]>(`${APIRoute.Review}/${filmId}`);
      dispatch(setFilmLoadingStatus(false));
      dispatch(loadReviews(data));
    } catch {
      dispatch(setFilmLoadingStatus(false));
    }
  },
);

export const postNewReview = createAsyncThunk<void, [number, NewReview], {
    dispatch: AppDispatch;
    stat: State;
    extra: AxiosInstance;
}>(
  'data/postNewComment',
  async ([filmId, {comment, rating}], {dispatch, extra: api}) => {
    await api.post<Review>(`${APIRoute.Review}/${filmId}`, {comment, rating});
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
