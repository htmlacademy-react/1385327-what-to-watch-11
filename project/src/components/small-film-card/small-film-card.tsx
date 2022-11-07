import { BaseSyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Film } from '../../types/types';
import VideoPlayer from '../video-player/video-player';

type SmallFilmCardProps = {
  film: Film;
}

function SmallFilmCard(props: SmallFilmCardProps): JSX.Element {
  const { film } = props;

  let timerId: NodeJS.Timeout | undefined = undefined;

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleMouseOver = (evt: BaseSyntheticEvent) => {

    const target = evt.target as Element;
    const parent = target.parentElement as Element;

    if (parent.classList.contains('small-film-card') || target.tagName === 'A') {
      timerId = setTimeout(() => {
        setActiveId(parent.id);
      }, 1000);
    } else {
      setActiveId(null);
    }
  };

  const handlerMouseOut = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setActiveId(null);

  };

  return (
    <article className="small-film-card catalog__films-card" id={film.id.toString()} onMouseOver={handleMouseOver} onMouseOut={handlerMouseOut}>
      <div className="small-film-card__image">
        {
          activeId ?
            <VideoPlayer film={film} autoPlay /> :
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
