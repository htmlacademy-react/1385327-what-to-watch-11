export enum AppRoute {
  Root = '/',
  SingIn = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/review',
  Player = '/player',
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
export const DEFAULT_GENRE_FILTER = 'All Genres';
