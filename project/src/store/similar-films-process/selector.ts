import { Film } from '../../types/types';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getSimilarFilms = (state: State): Film[] => state[NameSpace.SimilarFilms].films;

export const getIsSimilarFilmsLoading = (state: State): boolean => state[NameSpace.SimilarFilms].isLoading;
