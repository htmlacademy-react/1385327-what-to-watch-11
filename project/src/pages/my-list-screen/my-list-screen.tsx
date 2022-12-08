import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavoritesFilms, getIsFavoriteFilmsLoading } from '../../store/favorites-films-process/selector';

import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import UserBlock from '../../components/user-block/user-block';

function MyListScreen(): JSX.Element {

  const myFilms = useAppSelector(getFavoritesFilms);
  const isFavoriteFilmsLoading = useAppSelector(getIsFavoriteFilmsLoading);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(fetchFavoritesAction());
    }, [dispatch]
  );

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. My list</title>
      </Helmet>

      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{myFilms.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {isFavoriteFilmsLoading ? <LoadingScreen/> : <FilmsList films={myFilms} />}
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
