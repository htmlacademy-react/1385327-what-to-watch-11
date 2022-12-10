import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { AppRoute, PLAYER_DELAY } from '../../const';
import { Film } from '../../types/types';

import { resetFilmsList } from '../../store/films-process/films-process';

import VideoPlayer from '../video-player/video-player';

type SmallFilmCardProps = {
  film: Film;
}

function SmallFilmCard(props: SmallFilmCardProps): JSX.Element {
  const { film } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [activeId, setActiveId] = useState(false);

  const handleMouseOver = () => {
    timerId.current = setTimeout(() => {
      setActiveId(true);
    }, PLAYER_DELAY);
  };

  const handleMouseOut = () => {
    if (timerId.current){
      clearTimeout(timerId.current);
    }
    setActiveId(false);
  };

  const handleFilmClick = () => {
    dispatch(resetFilmsList());
  };

  return (
    <article className="small-film-card catalog__films-card" id={film.id.toString()} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => navigate(`${AppRoute.Film}/${film.id}`)}>
      <div className="small-film-card__image">
        {
          activeId ?
            <VideoPlayer film={film} /> :
            <img src={film.previewImage} alt={film.name} width="280" height="175"/>
        }
      </div>
      <h3 className="small-film-card__title" id={film.id.toString()}>
        <Link className="small-film-card__link" to={`/films/${film.id}`} onClick={handleFilmClick}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
