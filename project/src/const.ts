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
  App = 'APP',
  User = 'USER',
  Films = 'FILMS',
  PromoFilm = 'PROMOFILM',
  CurrentFilm = 'CURRENTFILM',
  SimilarFilms = 'SIMILARFILMS',
  Reviews = 'REVIEWS',
  FavoritesFilms = 'FAVORITESFILMS',
}

export const PLAYER_DELAY = 1000;

export const DEFAULT_GENRE_FILTER = 'All Genres';

export const MAX_GENRE_FILTER = 9;

export const MAX_COUNT = 8;

export const SIMILAR_COUNT = 4;

export enum ReviewLength {
  Min = 1,
  Max = 400
}

export enum Rating {
  Bad = 0,
  Normal = 3,
  Good = 5,
  VeryGood = 8,
  Awesome = 10
}

export enum TimeValue {
  PreviewStartTimeout = 1000,
  DefaultSecondsCount = 60,
  Hundred = 100
}

export enum ErrorMessage {
  InvalidPassword = 'Please enter a valid password',
  InvalidEmail = 'Please enter a valid email',
}

export const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;

export const PASSWORD_PATTERN = /([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*/;

export enum SingInField {
  UserEmail = 'user-email',
  UserPassword = 'user-password',
}
