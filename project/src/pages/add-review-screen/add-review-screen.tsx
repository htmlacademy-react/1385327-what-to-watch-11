import { Helmet } from 'react-helmet-async';
// import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

// import { Film } from '../../types/types';

import NoFoundScreen from '../no-found-screen/no-found-screen';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import ReviewForm from '../../components/review-form/review-form';

// type AddReviewScreenProps = {
//   films: Film[];
// }

function AddReviewScreen(): JSX.Element {//props: AddReviewScreenProps
  // const { films } = props;
  const film = useAppSelector((state) => state.film);

  // const params = useParams();
  // const film = films.find((item: Film) => item.id.toString() === params.id);

  if (film === undefined) {
    return <NoFoundScreen />;
  }

  return (
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
        <ReviewForm reviewedMovieId={film.id}/>
      </div>

    </section>
  );
}

export default AddReviewScreen;
