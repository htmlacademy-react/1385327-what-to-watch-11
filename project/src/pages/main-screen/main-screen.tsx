import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { AuthorizationStatus } from '../../const';

import { fetchPromoFilmAction, fetchFavoritesFilmsAction, fetchFilmsAction} from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { createFilmsList } from '../../store/app-process/app-process';
import { getFilmsOpened, getFilteredFilms } from '../../store/app-process/selector';
import { getIsFilmsLoading } from '../../store/films-process/selector';
import { getPromoFilm } from '../../store/promo-film-process/selector';

import GenresList from '../../components/genres-list/genres-list';
import FilmButtons from '../../components/film-buttons/film-buttons';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import ShowMore from '../../components/show-more/show-more';
import UserBlock from '../../components/user-block/user-block';
import LoadingScreen from '../../components/loading-screen/loading-screen';


function MainScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const films = useAppSelector(getFilteredFilms);
  const isFilmsLoading = useAppSelector(getIsFilmsLoading);
  const filmsCount = useAppSelector(getFilmsOpened);
  const promoFilm = useAppSelector(getPromoFilm);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
    dispatch(fetchFilmsAction());
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesFilmsAction());
    }
  }, [authorizationStatus, dispatch]);

  if(!promoFilm){
    return (<div></div>);
  }

  const handleShowMoreButtonClick = () => {
    dispatch(createFilmsList());
  };

  return (
    <>
      <Helmet>
        <title>WTW. What to Watch</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>
              <FilmButtons filmId={promoFilm.id} promo/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          {isFilmsLoading ? <LoadingScreen/> : <FilmsList films={films.slice(0, filmsCount)}/>}
          {(films.length > filmsCount) && <ShowMore onClick={handleShowMoreButtonClick}/>}
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
