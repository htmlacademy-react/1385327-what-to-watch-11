import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';

import { genreSet, resetFilmsList, genreReset } from '../../store/films-process/films-process';
import { getCurrentGenre, getGenres } from '../../store/films-process/selector';

import { DEFAULT_GENRE_FILTER } from '../../const';

export default function GenresList(): JSX.Element {

  const genres = useAppSelector(getGenres);
  const currentGenre = useAppSelector(getCurrentGenre);

  const dispatch = useAppDispatch();
  useEffect(() => { dispatch(resetFilmsList()); }, [dispatch, currentGenre]);

  const getListItem = (genreName: string, active: boolean) => (
    <li key={`genre-${genreName}`}className={active ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}>
      <a href="/#" className="catalog__genres-link"
        onClick={
          (event) => {
            event.preventDefault();
            genreName === DEFAULT_GENRE_FILTER ? dispatch(genreReset()) : dispatch(genreSet(genreName));
          }
        }
      >{genreName}
      </a>
    </li>
  );

  return (
    <ul className="catalog__genres-list">
      { genres.map((genre) => getListItem(genre, (genre === currentGenre))) }
    </ul>
  );
}
