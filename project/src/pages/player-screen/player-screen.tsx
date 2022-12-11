import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { TimeValue } from '../../const';

import { fetchCurrentFilmAction } from '../../store/api-actions';
import { getIsCurrentFilmLoading, getCurrentFilm } from '../../store/current-film-process/selector';

import NoFoundScreen from '../no-found-screen/no-found-screen';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

function PlayerScreen(): JSX.Element {

  const params = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const film = useAppSelector(getCurrentFilm);
  const isCurrentFilmLoading = useAppSelector(getIsCurrentFilmLoading);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationTime, setDurationTime] = useState(0);

  const timeToggler = `${((currentTime / durationTime) * TimeValue.Hundred)}%`;

  function countTimeLeft(): string {
    const timeDifference = durationTime - currentTime;

    const minutes = Math.trunc(timeDifference / TimeValue.DefaultSecondsCount);
    const seconds = Math.trunc(timeDifference % TimeValue.DefaultSecondsCount);
    const hours = Math.trunc(minutes / TimeValue.DefaultSecondsCount);

    const result = [];

    hours && result.push((`0${hours}`).slice(-2));
    result.push((`0${minutes}`).slice(-2));
    result.push((`0${seconds}`).slice(-2));

    return result.join(':');
  }

  function openCrossFullScreen(element: HTMLVideoElement): void {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullscreen) {
      element.mozRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  useEffect(() => {

    let isVideoPlayerMounted = true;

    if (params.id && isVideoPlayerMounted) {
      dispatch(fetchCurrentFilmAction(params.id));
    }

    return () => {
      isVideoPlayerMounted = false;
    };
  }, [dispatch, params.id]);

  useEffect(() => {
    let isVideoPlayerMounted = true;

    if (videoRef.current === null) {
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => {
      if (videoRef.current && isVideoPlayerMounted) {
        setDurationTime(Math.trunc(videoRef.current.duration));
        videoRef.current.play();
      }
    });

    videoRef.current.addEventListener('timeupdate', () => {
      if (videoRef.current && isVideoPlayerMounted) {
        setCurrentTime(Math.trunc(videoRef.current.currentTime));
      }
    });

    return () => {
      isVideoPlayerMounted = false;
    };

  });

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();

  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (fullScreen) {
      openCrossFullScreen(videoRef.current);
    }

    return () => setFullScreen(false);
  }, [fullScreen]);

  if (isCurrentFilmLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (!film) {
    return <NoFoundScreen />;
  }

  function getPlayButton(): JSX.Element {
    return (
      <>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </>
    );
  }

  function getPauseButton(): JSX.Element {
    return (
      <>
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause"></use>
        </svg>
        <span>Pause</span>
      </>
    );
  }

  const handleExitButtonClick = () => {
    if (film) {
      navigate(-1);
    }
  };

  return (
    <div className="player">
      <Helmet>
        <title>WTW. {film.name} - Player</title>
      </Helmet>
      <video src={film?.videoLink} className="player__video" poster={film?.backgroundImage} ref={videoRef} muted ></video>

      <button type="button" className="player__exit" onClick={handleExitButtonClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={currentTime} max={durationTime}></progress>
            <div className="player__toggler" style={{left: timeToggler}}>Toggler</div>
          </div>
          <div className="player__time-value">- {countTimeLeft()}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? getPauseButton() : getPlayButton()}
          </button>
          <div className="player__name">{film?.name}</div>

          <button type="button" className="player__full-screen" onClick={() => setFullScreen(true)}>
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
