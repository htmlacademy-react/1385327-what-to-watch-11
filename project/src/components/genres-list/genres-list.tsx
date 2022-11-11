import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeFilter } from '../../store/action';

import { Film } from '../../types/types';
import { DEFAULT_GENRE_FILTER } from '../../const';

type GenresListProps = {
  films: Film[];
}
function GenresList(props: GenresListProps): JSX.Element {
  const { films } = props;

  const orderedGenresList: string[] = [];
  orderedGenresList.push(DEFAULT_GENRE_FILTER);

  films.forEach((film) => {
    if (!orderedGenresList.includes(film.genre)) {
      orderedGenresList.push(film.genre);
    }
  });

  const selectedGenre = useAppSelector((state) => state.genreFilter);
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {orderedGenresList.map((genre) =>(
        <li className={`catalog__genres-item  ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
          <Link to='/' onClick={() => dispatch(changeFilter(genre))} className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
