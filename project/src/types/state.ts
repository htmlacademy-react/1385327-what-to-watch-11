import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const.js';
import { UserData, Film, Review } from './types.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  authorizedUser: UserData | null;
};

export type FilmsState = {
  films: Film[];
  isLoading: boolean;
  currentGenre: string;
  filmsOpen: number;
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


