import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Film } from '../../types/types'; //, Review
import { ScreenTab } from '../../const';

import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';

type FilmCardProps = {
  film: Film;
}

function FilmTabs(props: FilmCardProps): JSX.Element {
  const { film} = props;

  const [activeTab, setActiveTab] = useState<number>(ScreenTab.Overview);

  const renderTab = () => {
    switch (activeTab) {
      case ScreenTab.Overview:
        return <FilmOverview film={film} />;
      case ScreenTab.Details:
        return <FilmDetails film={film} />;
      case ScreenTab.Reviews:
        return <FilmReviews />;
    }
  };

  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">

        <div className="film-card__poster film-card__poster--big">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list">

              <li className={`film-nav__item ${activeTab === 0 ? 'film-nav__item--active' : ''}`} onClick={() => setActiveTab(0)}>
                <Link to='#' className="film-nav__link">Overview</Link>
              </li>
              <li className={`film-nav__item ${activeTab === 1 ? 'film-nav__item--active' : ''}`} onClick={() => setActiveTab(1)}>
                <Link to='#' className="film-nav__link">Details</Link>
              </li>
              <li className={`film-nav__item ${activeTab === 2 ? 'film-nav__item--active' : ''}`} onClick={() => setActiveTab(2)}>
                <Link to='#' className="film-nav__link">Reviews</Link>
              </li>

            </ul>
          </nav>
          {renderTab()}
        </div>

      </div>
    </div>
  );
}

export default FilmTabs;
