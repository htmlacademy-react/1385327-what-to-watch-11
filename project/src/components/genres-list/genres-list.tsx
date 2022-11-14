import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeFilter } from '../../store/action';

import { Film } from '../../types/types';
import { DEFAULT_GENRE_FILTER } from '../../const';

type GenresListProps = {
  films: Film[];
}

const getGenreList = (films: Film[]) => [DEFAULT_GENRE_FILTER, ...new Set(films.map((film) => film.genre))];

function GenresList(props: GenresListProps): JSX.Element {
  const { films } = props;

  const selectedGenre = useAppSelector((state) => state.genreFilter);
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {getGenreList(films).map((genre) =>(
        <li className={`catalog__genres-item  ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
          <Link to='/' onClick={() => dispatch(changeFilter(genre))} className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
