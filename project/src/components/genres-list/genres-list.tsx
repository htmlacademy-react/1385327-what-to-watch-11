// import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
// import { changeFilter, resetFilmsList } from '../../store/action';

import { genreSet, resetFilmsList, genreReset } from '../../store/films-process/films-process';

// import { filmsOpenReset, genreReset, genreSet } from '../../store/films/films';
import { getCurrentGenre, getGenres } from '../../store/films-process/selector';

// import { Film } from '../../types/types';
import { DEFAULT_GENRE_FILTER } from '../../const';

// const getGenreList = (films: Film[]) => [DEFAULT_GENRE_FILTER, ...new Set(films.map((film) => film.genre))];

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

// function GenresList(): JSX.Element {

//   const selectedGenre = useAppSelector(getCurrentGenre);
//   const dispatch = useAppDispatch();

//   return (
//     <ul className="catalog__genres-list">
//       {getGenres.map((genre) =>(
//         <li className={`catalog__genres-item  ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
//           <Link to='/'
//             className="catalog__genres-link"
//             onClick={
//               (evt) => {
//                 evt.preventDefault();
//                 dispatch(genreSet);
//                 dispatch(resetFilmsList());
//               }
//             }
//           >
//             {genre}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default GenresList;
