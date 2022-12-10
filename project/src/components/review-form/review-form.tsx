import { useState, SyntheticEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { postNewReviewAction } from '../../store/api-actions';
import { APIRoute, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../../const';

type AddReviewFormPropsType = {
  filmId: number;
}

function ReviewForm({filmId}: AddReviewFormPropsType): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    isFormDisabled: false,
  });

  const handleFormChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLTextAreaElement | HTMLInputElement;

    if (target.name === 'review-text') {
      setFormData({...formData, comment: target.value});
    }
    if (target.name === 'rating') {
      setFormData({...formData, rating: parseInt(target.value, 10)});
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.rating && formData.comment) {
      const [comment, rating] = [formData.comment, formData.rating];
      dispatch(postNewReviewAction([filmId, {comment, rating}]));
      navigate(`${APIRoute.Films}/${filmId.toString()}`);
    }
  };

  return (
    <form action="#" className="add-review__form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9" />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8" />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7" />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6" />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3" />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" value="1" />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text" style={{background: '#FFFFFF', opacity: '50%'}}>
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={formData.isFormDisabled || !(formData.comment.length > MIN_COMMENT_LENGTH && formData.comment.length < MAX_COMMENT_LENGTH && formData.rating !== 0)}>Post</button>
        </div>

      </div>
    </form>
  );
}

export default ReviewForm;
