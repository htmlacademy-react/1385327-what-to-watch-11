import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { getCurrentFilm, getIsCurrentFilmLoading } from '../../store/current-film-process/selector';
import { fetchCurrentFilmAction } from '../../store/api-actions';

import NoFoundScreen from '../no-found-screen/no-found-screen';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import ReviewForm from '../../components/review-form/review-form';
import LoadingScreen from '../../components/loading-screen/loading-screen';

function AddReviewScreen(): JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();

  const film = useAppSelector(getCurrentFilm);
  const isCurrentFilmLoading = useAppSelector(getIsCurrentFilmLoading);

  useEffect(() => {
    if (params.id && film?.id.toString() !== params.id) {
      dispatch(fetchCurrentFilmAction(params.id));
    }
  }, [dispatch, film?.id, params.id]);

  if(isCurrentFilmLoading && film?.id.toString() !== params.id){
    return <LoadingScreen />;
  }

  return film ? (
    <section className="film-card film-card--full" style={{background: `${film.backgroundColor}`}}>
      <Helmet>
        <title>WTW. Review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{film.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="/">Add review</a>
              </li>
            </ul>
          </nav>
          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm filmId={film.id}/>
      </div>

    </section>
  ) : <NoFoundScreen />;
}

export default AddReviewScreen;
