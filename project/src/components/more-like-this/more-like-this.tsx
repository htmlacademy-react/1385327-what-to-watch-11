import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { fetchSimilarFilmsAction } from '../../store/api-actions';
import { getIsSimilarFilmsLoading, getSimilarFilms } from '../../store/similar-films-process/selector';

import FilmList from '../films-list/films-list';
import LoadingScreen from '../loading-screen/loading-screen';

export default function MoreLikeThis({currentFilmId}:{currentFilmId:number}): JSX.Element {

  const dispatch = useAppDispatch();
  const similarFilms = useAppSelector(getSimilarFilms);
  const isSimilarFilmsLoading = useAppSelector(getIsSimilarFilmsLoading);

  useEffect(() => {
    dispatch(fetchSimilarFilmsAction(currentFilmId.toString()));
  }, [dispatch, currentFilmId]);

  return isSimilarFilmsLoading ? <LoadingScreen /> : <FilmList films={similarFilms}/>;
}

