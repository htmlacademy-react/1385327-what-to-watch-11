import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const.js';
import { UserData, Film, Review } from './types.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  authorizedUser: UserData | null;
};

export type AppState = {
  currentGenre: string;
  filmsOpen: number;
};

export type FilmsState = {
  films: Film[];
  isLoading: boolean;
  hasError: boolean;
};

export type PromoFilmState = {
  film: Film | null;
  isLoading: boolean;
};

export type CurrentFilmState = {
  film: Film | null;
  isLoading: boolean;
};

export type SimilarFilmsState = {
  films: Film[];
  isLoading: boolean;
};

export type ReviewsState = {
  comments: Review[];
  isLoading: boolean;
};

export type FavoritesFilmsState = {
  films: Film[];
  isLoading: boolean;
};
