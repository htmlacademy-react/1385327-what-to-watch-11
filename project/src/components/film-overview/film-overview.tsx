import { Film } from '../../types/types';

type FilmOverviewProps = {
  film: Film;
}

function FilmOverview(props: FilmOverviewProps): JSX.Element {
  const { film } = props;

  const actorList = film.starring; //.join(', ');

  const scoresRating = (rating: number) => {
    if (rating >= 0 && rating < 3) {
      return 'Bad';
    }
    if (rating >= 3 && rating < 5) {
      return 'Mediocre';
    }
    if (rating >= 5 && rating < 8) {
      return 'Good';
    }
    if (rating >= 8 && rating < 10) {
      return 'Very good';
    }
    if (rating === 10) {
      return 'Awesome';
    }
    return 'NaN';
  };

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{scoresRating(film.rating)}</span>
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
