import { Film } from '../../types/types';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getPromoFilm = (state: State): Film | null => state[NameSpace.PromoFilm].film;
