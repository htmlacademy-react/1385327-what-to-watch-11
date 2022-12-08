import { Film } from '../../types/types';
import { getScoresRating } from '../../utils';

type FilmOverviewProps = {
  film: Film;
}

function FilmOverview(props: FilmOverviewProps): JSX.Element {
  const { film } = props;

  const actorList = film.starring.join(', ');

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getScoresRating(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {actorList} and other</strong></p>
      </div>
    </>
  );


}
export default FilmOverview;
