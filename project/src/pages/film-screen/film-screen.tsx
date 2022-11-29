import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { Film, Review } from '../../types/types';
import {useAppSelector} from '../../hooks';

import NoFoundScreen from '../no-found-screen/no-found-screen';

import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import UserBlock from '../../components/user-block/user-block';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmsList from '../../components/films-list/films-list';

type FilmCardProps = {
  films: Film[];
  reviews: Review[];
}

function FilmScreen(props: FilmCardProps): JSX.Element {
  const { films, reviews } = props;

  const navigate = useNavigate();
  const params = useParams();
  const film = films.find((item: Film) => item.id.toString() === params.id);

  const filteredFilms = films.filter((item) => item.genre === film?.genre && item.id !== film?.id);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (film === undefined) {
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

        <FilmTabs film={film} reviews={reviews}/>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={filteredFilms.slice(0, 4)}/>
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
