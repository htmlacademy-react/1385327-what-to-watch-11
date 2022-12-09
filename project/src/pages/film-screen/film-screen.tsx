import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCurrentFilmAction, fetchFavoritesAction } from '../../store/api-actions';//, fetchSimilarFilmsAction
import { getCurrentFilm, getIsCurrentFilmLoading } from '../../store/current-film-process/selector';
// import { getIsSimilarFilmsLoading, getSimilarFilms } from '../../store/similar-films-process/selector';

import NoFoundScreen from '../no-found-screen/no-found-screen';

import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';
import FilmButtons from '../../components/film-buttons/film-buttons';
import FilmTabs from '../../components/film-tabs/film-tabs';
// import FilmsList from '../../components/films-list/films-list';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import MoreLikeThis from '../../components/more-like-this/more-like-this';

function FilmScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const params = useParams();

  const film = useAppSelector(getCurrentFilm);
  const isCurrentFilmLoading = useAppSelector(getIsCurrentFilmLoading);

  // const similarFilms = useAppSelector(getSimilarFilms);
  // const isSimilarFilmsLoading = useAppSelector(getIsSimilarFilmsLoading);

  useEffect(() => {
    if (params.id && film?.id.toString() !== params.id) {
      dispatch(fetchCurrentFilmAction(params.id));
      // dispatch(fetchSimilarFilmsAction(params.id));
      // dispatch(fetchFavoritesAction());
    }
  }, [params.id, dispatch, film?.id]);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  if (isCurrentFilmLoading && film?.id.toString() !== params.id) {
    return <LoadingScreen />;
  }

  return film ? (
    <>
      <Helmet>
        <title>WTW. Film-page</title>
      </Helmet>
      <section className="film-card film-card--full" style={{background: `${film.backgroundColor}`}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <FilmButtons filmId={film.id} />
            </div>
          </div>
        </div>

        {film && (<FilmTabs film={film} />)}
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoreLikeThis currentFilmId={film.id} />
        </section>

        <Footer />
      </div>
    </>
  ) : <NoFoundScreen />;
}
export default FilmScreen;// {isSimilarFilmsLoading ? <LoadingScreen/> : <FilmsList films={similarFilms}/>}
