import { useState, SyntheticEvent, FormEvent, Fragment } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { postNewReviewAction } from '../../store/api-actions';
import { ReviewLength, Rating } from '../../const';

type AddReviewFormPropsType = {
  filmId: number;
}

function ReviewForm({filmId}: AddReviewFormPropsType): JSX.Element {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const [formSubmitState, setFormSubmitState] = useState(true);

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

    setFormSubmitState(false);
    dispatch(postNewReviewAction({userReview: formData, setFormSubmitStateCb: setFormSubmitState, activeId: filmId}));
  };

  const starsList = Array.from({length: Rating.Awesome}, (_, i) => {
    const key = String(Rating.Awesome - i);
    return (
      <Fragment key={key}>
        <input className="rating__input" id={`star-${key}`} type="radio" name="rating" value={`${key}`} disabled={!formSubmitState}/>
        <label className="rating__label" htmlFor={`star-${key}`}>{`Rating ${key}`}</label>
      </Fragment>
    );
  });

  return (
    <form action="#" className="add-review__form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {starsList}
        </div>
      </div>
      <div className="add-review__text" style={{background: '#FFFFFF', opacity: '50%'}}>
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" disabled={!formSubmitState}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!formSubmitState || !(formData.comment.length > ReviewLength.Min && formData.comment.length < ReviewLength.Max && formData.rating !== 0)}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
