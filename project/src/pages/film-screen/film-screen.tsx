import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchFilm, fetchReviews, fetchSimilarFilms } from '../../store/api-actions';

import NoFoundScreen from '../no-found-screen/no-found-screen';

import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import UserBlock from '../../components/user-block/user-block';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmsList from '../../components/films-list/films-list';
// import LoadingScreen from '../../components/loading-screen/loading-screen';

function FilmScreen(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const film = useAppSelector((state) => state.film);//: Film | null
  const reviews = useAppSelector((state) => state.reviews);
  const similarFilms = useAppSelector((state) => state.similarFilms);
  // const isFilmLoading = useAppSelector((state) => state.isFilmLoading);
  // const filteredFilms = films.filter((item) => item.genre === film.genre && item.id !== film.id);
  // const error = useAppSelector((state) => state.error);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchFilm(params.id));
      dispatch(fetchSimilarFilms(params.id));
      dispatch(fetchReviews(params.id));
    }
  }, [params.id, dispatch,]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  // const film = films.find((item: Film) => item.id.toString() === params.id);

  if (!film.id) {
    return <NoFoundScreen />;
  }

  return (
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

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player}/${film.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth && <Link to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        {film && (<FilmTabs film={film} reviews={reviews}/>)}
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={similarFilms.slice(0, 4)}/>
        </section>

        <footer className="page-footer">
          <Logo light />
          <Copyright />
        </footer>
      </div>
    </>
  );
}
export default FilmScreen;
