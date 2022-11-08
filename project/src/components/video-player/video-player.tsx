import { useState, useEffect, useRef } from 'react';
import { Film } from '../../types/types';

type VideoPlayerProps = {
  film: Film;
}

function VideoPlayer(props: VideoPlayerProps): JSX.Element {
  const { film } = props;
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

    return () => {
      isVideoPlayerMounted = false;
    };
  }, []);

  return (
    <video src={film.previewVideoLink} poster={film.previewImage} ref={videoRef} muted autoPlay width="280" height="175" />
  );
}

export default VideoPlayer;
