import { Film } from '../../types/types';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getFavoritesFilms = (state: State): Film[] => state[NameSpace.FavoritesFilms].films;
export const getIsFavoritesFilmsLoading = (state: State): boolean => state[NameSpace.FavoritesFilms].isLoading;
