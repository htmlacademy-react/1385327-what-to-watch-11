import { Link } from 'react-router-dom';

import { Film } from '../../types/types';
import { ScreenTab } from '../../const';

import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';

type FilmCardProps = {
  film: Film;
  active: number;
}

const renderTab = (active: number, film: Film) => {
  switch (active) {
    case ScreenTab.Overview:
      return <FilmOverview film={film} />;
    case ScreenTab.Details:
      return <FilmDetails film={film} />;
    case ScreenTab.Reviews:
      return <FilmReviews film={film} />;
  }
};
function FilmTabs(props: FilmCardProps): JSX.Element {
  const { film, active } = props;

  const handleTabClick = () => {
    const a = 8;
    return a;
  };

  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">

        <div className="film-card__poster film-card__poster--big">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list" onClick={handleTabClick}>

              <li className={`film-nav__item ${active === 0 ? 'film-nav__item--active' : ''}`}>
                <Link to='#' className="film-nav__link">Overview</Link>
              </li>
              <li className={`film-nav__item ${active === 1 ? 'film-nav__item--active' : ''}`}>
                <Link to='#' className="film-nav__link">Details</Link>
              </li>
              <li className={`film-nav__item ${active === 2 ? 'film-nav__item--active' : ''}`}>
                <Link to='#' className="film-nav__link">Reviews</Link>
              </li>

            </ul>
          </nav>
          {renderTab(active, film)}
        </div>

      </div>
    </div>
  );
}

export default FilmTabs;
