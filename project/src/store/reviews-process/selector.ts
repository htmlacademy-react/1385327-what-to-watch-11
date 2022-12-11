import { Review } from '../../types/types';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].comments;

export const getIsReviewsLoading = (state: State): boolean => state[NameSpace.Reviews].isLoading;
