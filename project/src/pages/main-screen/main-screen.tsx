import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { createFilmsList } from '../../store/action';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, DEFAULT_GENRE_FILTER } from '../../const';
import { Film } from '../../types/types';

import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import ShowMore from '../../components/show-more/show-more';
import UserBlock from '../../components/user-block/user-block';

type MainScreenProps = {
  mainFilm: Film;
}

function MainScreen(props: MainScreenProps): JSX.Element { //props: MainScreenProps
  const { mainFilm } = props;

  const genreFilter = useAppSelector((state) => state.genreFilter);
  const films: Film[] = useAppSelector((state) => state.films);
  const filmsCount = useAppSelector((state) => state.filmsCount);
  // const mainFilm = useAppSelector((state) => state.promo);

  const filteredFilms = genreFilter === DEFAULT_GENRE_FILTER
    ? films
    : films.filter((film) => film.genre === genreFilter);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleShowMoreButtonClick = () => {
    dispatch(createFilmsList());
  };

  const handlePlayMainFilmButtonClick = () => {
    if (mainFilm === undefined) {
      return navigate('*');
    }
    return navigate(`${AppRoute.Player}/${mainFilm.id}`);
  };

  return (
    <>
      <Helmet>
        <title>WTW. What to Watch</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={mainFilm.backgroundImage} alt={mainFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">

          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={mainFilm.posterImage} alt={mainFilm.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{mainFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{mainFilm.genre}</span>
                <span className="film-card__year">{mainFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayMainFilmButtonClick}>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList films={films}/>

          <FilmsList films={filteredFilms.slice(0, filmsCount)}/>
          {((filteredFilms.length - filmsCount) > 0 ) && <ShowMore onClick={handleShowMoreButtonClick}/>}
        </section>

        <footer className="page-footer">
          <Logo light />
          <Copyright />
        </footer>
      </div>
    </>
  );
}

export default MainScreen;
