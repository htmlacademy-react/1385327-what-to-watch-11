import { Link } from 'react-router-dom';
import { Film } from '../../types/types';
import VideoPlayer from '../video-player/video-player';

type SmallFilmCardProps = {
  film: Film;
  isActive: boolean;
}

function SmallFilmCard(props: SmallFilmCardProps): JSX.Element {
  const { film, isActive } = props;

  return (
    <article className="small-film-card catalog__films-card" id={film.id.toString()}>
      <div className="small-film-card__image">
        {
          isActive ?
            <VideoPlayer film={film} autoPlay muted /> :
            <img src={film.previewImage} alt={film.name} width="280" height="175"/>
        }
      </div>
      <h3 className="small-film-card__title" id={film.id.toString()}>
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
