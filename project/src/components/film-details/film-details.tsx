import { Film } from '../../types/types';

type FilmDetailsProps = {
  film: Film;
}

function FilmDetails(props: FilmDetailsProps): JSX.Element {
  const { film } = props;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">240 ratings</span>
        </p>
      </div>
      <div></div>
    </>
  );


}
export default FilmDetails;
