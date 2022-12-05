import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { fetchCurrentFilmAction } from '../../store/api-actions';
import { getIsCurrentFilmLoading, getCurrentFilm } from '../../store/current-film-process/selector';

import NoFoundScreen from '../no-found-screen/no-found-screen';

function PlayerScreen(): JSX.Element {

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const videoElement = useRef<HTMLVideoElement | null>(null);

  const film = useAppSelector(getCurrentFilm);
  const isLoading = useAppSelector(getIsCurrentFilmLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchCurrentFilmAction(params.id));
    }
  }, [dispatch, params.id]);

  if (!film && !isLoading) {
    return <NoFoundScreen />;
  }

  const handleExitButtonClick = () => {
    if (film) {
      navigate(`/films/${film.id}`);
    }
  };

  return (
    <div className="player">
      <Helmet>
        <title>WTW. Player</title>
      </Helmet>
      <video src="#" className="player__video" poster="img/player-poster.jpg"></video>

      <button type="button" className="player__exit" onClick={handleExitButtonClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">100500</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film?.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PlayerScreen;
