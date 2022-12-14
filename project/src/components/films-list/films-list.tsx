import { Film } from '../../types/types';

import SmallFilmCard from '../small-film-card/small-film-card';

type FilmsListProps = {
  films: Film[];
}

function FilmsList(props: FilmsListProps): JSX.Element {
  const { films } = props;

  return (
    <div className="catalog__films-list">
      {films.map((film) => <SmallFilmCard key={film.id} film={film} />)}
    </div>
  );
}

export default FilmsList;
