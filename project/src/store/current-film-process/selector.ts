import { Film } from '../../types/types';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCurrentFilm = (state: State): Film | null => state[NameSpace.CurrentFilm].film;

export const getIsCurrentFilmLoading = (state: State): boolean => state[NameSpace.CurrentFilm].isLoading;
