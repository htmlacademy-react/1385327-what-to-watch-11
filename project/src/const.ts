export enum AppRoute {
  Root = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/review',
  Player = '/player',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo',
  Review = '/comments',
  Favorites = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum ScreenTab {
  Overview,
  Details,
  Reviews
}

export enum NameSpace {
  User = 'USER',
  Films = 'FILMS',
  PromoFilm = 'PROMOFILM',
  CurrentFilm = 'CURRENTFILM',
  SimilarFilms = 'SIMILARFILMS',
  Reviews = 'REVIEWS',
  FavoritesFilms = 'FAVORITESFILMS',
}

export const DEFAULT_GENRE_FILTER = 'All Genres';

export const MAX_GENRE_FILTER = 9;

export const MAX_COUNT = 8;

export const SIMILAR_COUNT = 4;

export const MIN_COMMENT_LENGTH = 50;

export const MAX_COMMENT_LENGTH = 400;
