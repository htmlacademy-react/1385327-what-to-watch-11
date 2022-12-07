import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsAuthorized } from '../../store/user-process/selector';

import { getCountFavoritesFilms } from '../../store/films-process/selector';

import { postFavoriteStatusAction } from '../../store/api-actions';

import { AppRoute } from '../../const';

type FilmButtonsProps = {
  filmId: number;
  isFavorite: boolean;
  promo?: boolean;
}

export default function FilmButtons(props: FilmButtonsProps): JSX.Element {
  const {filmId, isFavorite, promo} = props;//

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(getIsAuthorized);
  const favoritesFilmsCount = useAppSelector(getCountFavoritesFilms);


  const handleClickFavorites = () => {
    if (isAuthorized) {
      dispatch(postFavoriteStatusAction({filmId: filmId, status: isFavorite ? 0 : 1}));
    } else {
      navigate(AppRoute.SignIn);
    }
  };

  function getInListButton(): JSX.Element {
    return (
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>
    );
  }

  function getAddButton(): JSX.Element {
    return (
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
    );
  }

  const handlePlayFilmButtonClick = () => {
    navigate(`/player/${filmId}`);
  };

  return (
    <div className="film-card__buttons">

      <button className="btn btn--play film-card__button" type="button" onClick={handlePlayFilmButtonClick} >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>

      <button className="btn btn--list film-card__button" type="button" onClick={handleClickFavorites}>
        {isFavorite ? getInListButton() : getAddButton()}
        <span>My list</span>
        {isAuthorized && <span className="film-card__count">{favoritesFilmsCount}</span>}
      </button>

      {!promo && isAuthorized && <Link to="review" className="btn film-card__button">Add review</Link>}

    </div>
  );
}
