import { Film } from '../../types/types';

import SmallFilmCard from '../small-film-card/small-film-card';

type ListFilmProps = {
  films: Film[];
}

function ListFilm(props: ListFilmProps): JSX.Element {
  const { films } = props;

  return (
    <div className="catalog__films-list">
      {films.map((film) => <SmallFilmCard key={`${film.id}`} film={film}/>)}
    </div>
  );
}

export default ListFilm;
