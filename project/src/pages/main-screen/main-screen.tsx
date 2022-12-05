import { Helmet } from 'react-helmet-async';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { DEFAULT_GENRE_FILTER } from '../../const';

import { createFilmsList } from '../../store/films-process/films-process';
import { getFilms, getCurrentGenre, getFilmsOpened, getIsFilmsLoading } from '../../store/films-process/selector';
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

  const genreFilter = useAppSelector(getCurrentGenre);
  const films = useAppSelector(getFilms);
  const isFilmsLoading = useAppSelector(getIsFilmsLoading);
  const promoFilm = useAppSelector(getPromoFilm);
  const filmsCount = useAppSelector(getFilmsOpened);

  if(!promoFilm){
    return (<div>{false}</div>);
  }

  const filteredFilms = genreFilter === DEFAULT_GENRE_FILTER
    ? films
    : films.filter((film) => film.genre === genreFilter);

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
              <FilmButtons filmId={promoFilm.id} isFavorite={promoFilm.isFavorite} promo/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          { isFilmsLoading ? <LoadingScreen/> : <FilmsList films={filteredFilms.slice(0, filmsCount)}/>}
          {((filteredFilms.length - filmsCount) > 0 ) && <ShowMore onClick={handleShowMoreButtonClick}/>}
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
