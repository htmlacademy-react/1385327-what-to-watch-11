import { Link, useNavigate } from 'react-router-dom';//, useParams
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsAuthorized } from '../../store/user-process/selector';
import { getFavoritesFilms } from '../../store/films-process/selector';
import { postFavoriteStatusAction } from '../../store/api-actions';

import { AppRoute } from '../../const';

type FilmButtonsProps = {
  filmId: number;
  isFavorite: boolean;
  promo?: boolean;
}

export default function FilmButtons(props: FilmButtonsProps): JSX.Element {
  const {filmId, isFavorite, promo} = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(getIsAuthorized);
  const favoritesCount = useAppSelector(getFavoritesFilms);

  const handleClickFavorites = () => {
    if (isAuthorized) {
      dispatch(postFavoriteStatusAction({filmId: filmId, status: isFavorite ? 0 : 1}));// изменение картинки только при обновлении страницы! ДОРАБОТАТЬ
    } else {
      navigate(AppRoute.SignIn);
    }
  };

  const handlePlayMainFilmButtonClick = () => {
    navigate(`/player/${filmId}`);
  };

  return (
    <div className="film-card__buttons">

      <button className="btn btn--play film-card__button" type="button" onClick={handlePlayMainFilmButtonClick} >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>

      <button className="btn btn--list film-card__button" type="button" onClick={handleClickFavorites}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={`${isFavorite ? '#in-list' : '#add'}`}></use>
        </svg>
        <span>My list</span>
        { isAuthorized && <span className="film-card__count">{favoritesCount}</span> }
      </button>

      { !promo && isAuthorized && <Link to="review" className="btn film-card__button">Add review</Link> }

    </div>
  );
}
