import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { fetchReviewsAction } from '../../store/api-actions';
import { getReviews, getIsReviewsLoading } from '../../store/reviews-process/selector';

import LoadingScreen from '../loading-screen/loading-screen';
import { Review } from '../../types/types';


const getReview = (review: Review): JSX.Element => (
  <div className="review" key={review.id}>
    <blockquote className="review__quote">
      <p className="review__text">{review.comment}</p>
      <footer className="review__details">
        <cite className="review__author">{review.user.name}</cite>
        <time className="review__date" dateTime={review.date}>{(new Date(review.date)).toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})}</time>
      </footer>
    </blockquote>
    <div className="review__rating">{review.rating}</div>
  </div>
);


function FilmReviews(): JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const isReviewsLoading = useAppSelector(getIsReviewsLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchReviewsAction(params.id));
    }
  }, [dispatch, params.id]);

  if(isReviewsLoading) {
    return (
      <div className="film-card__reviews film-card__row">
        <LoadingScreen />
      </div>
    );
  }

  const reviewsArray = Object.values(reviews);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsArray.slice(reviewsArray.length / 2, reviewsArray.length).map((review) => getReview(review))}
      </div>
      <div className="film-card__reviews-col">
        {reviewsArray.slice(0, reviewsArray.length / 2).map((review) => getReview(review))}
      </div>
    </div>
  );
}

export default FilmReviews;
