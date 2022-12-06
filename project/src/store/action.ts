import { createAction } from '@reduxjs/toolkit';
// import { NewReview } from '../types/types';
import { AppRoute } from '../const';

// export const postReview = createAction('data/postReview', (value: NewReview) => ({ payload: value }));

export const redirectToRoute = createAction<AppRoute>('data/redirectToRoute');
