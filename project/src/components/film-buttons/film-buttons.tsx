import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';

import { postFavoriteStatusAction } from '../../store/api-actions';
import { getIsAuthorized } from '../../store/user-process/selector';
import { getFavoritesFilms } from '../../store/favorites-films-process/selector';

type FilmButtonsProps = {
  filmId: number;
  promo?: boolean;
}

export default function FilmButtons(props: FilmButtonsProps): JSX.Element {
  const {filmId, promo} = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(getIsAuthorized);
  const favoriteFilms = useAppSelector(getFavoritesFilms);

  const isFavorite = favoriteFilms.some((film) => film.id === filmId);

  const handleClickFavorites = () => {
    if (!isAuthorized) {
      navigate(AppRoute.SignIn);
      return;
    }
    dispatch(postFavoriteStatusAction([filmId, !isFavorite]));
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

  const renderButton = () => {
    if (!isAuthorized) {
      return getAddButton();
    } if (isFavorite) {
      return getInListButton();
    } else {
      return getAddButton();
    }
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
        {renderButton()}
        <span>My list</span>
        {isAuthorized && <span className="film-card__count">{favoriteFilms.length}</span>}
      </button>

      {!promo && isAuthorized && <Link to="review" className="btn film-card__button">Add review</Link>}

    </div>
  );
} // {isFavorite ? getInListButton() : getAddButton()}
