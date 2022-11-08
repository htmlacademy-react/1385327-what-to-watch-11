import { Helmet } from 'react-helmet-async';

import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import UserBlock from '../../components/user-block/user-block';

import { Film } from '../../types/types';

import SmallFilmCard from '../../components/small-film-card/small-film-card';

type MyListProps = {
  films: Film[];
}

function MyListScreen(props: MyListProps): JSX.Element {
  const { films } = props;
  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. My list</title>
      </Helmet>

      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {films.map((film) => <SmallFilmCard key={`${film.id}`} film={film} />)}
        </div>
      </section>

      <footer className="page-footer">
        <Logo light />
        <Copyright />
      </footer>
    </div>
  );
}

export default MyListScreen;
