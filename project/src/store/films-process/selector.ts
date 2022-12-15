import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getIsFilmsLoading = (state: State): boolean => state[NameSpace.Films].isLoading;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Films].hasError;
