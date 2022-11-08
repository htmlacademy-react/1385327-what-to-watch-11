import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Film } from '../../types/types';
import VideoPlayer from '../video-player/video-player';

type SmallFilmCardProps = {
  film: Film;
}

function SmallFilmCard(props: SmallFilmCardProps): JSX.Element {
  const { film } = props;

  let timerId: NodeJS.Timeout;

  const [activeId, setActiveId] = useState(false);

  const handleMouseOver = () => {

    timerId = setTimeout(() => {
      setActiveId(true);
    }, 1000);
  };

  const handleMouseOut = () => {
    clearTimeout(timerId);
    setActiveId(false);
  };

  return (
    <article className="small-film-card catalog__films-card" id={film.id.toString()} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className="small-film-card__image">
        {
          activeId ?
            <VideoPlayer film={film} /> :
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
