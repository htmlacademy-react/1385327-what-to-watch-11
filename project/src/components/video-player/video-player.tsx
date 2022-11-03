import { useState, useEffect, useRef } from 'react';
import { Film } from '../../types/types';

type VideoPlayerProps = {
  film: Film;
  autoPlay: boolean;
  muted: boolean;
}

function VideoPlayer({film, autoPlay, muted}: VideoPlayerProps): JSX.Element {
  const [, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isVideoPlayerMounted = true;

    if (videoRef.current === null) {
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => {
      if (isVideoPlayerMounted) {
        setIsLoading(false);
      }
    });

    if (autoPlay) {
      setTimeout(() => {
        if (videoRef.current !== null) {
          videoRef.current.play();
        }

      }, 1000);
      return;
    }
    videoRef.current.pause();
    return () => {
      isVideoPlayerMounted = false;
    };
  }, [autoPlay]);

  return (
    <video src={film.previewVideoLink} poster={film.previewImage} ref={videoRef} muted={muted}/>
  );
}

export default VideoPlayer;
