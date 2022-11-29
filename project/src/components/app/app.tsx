import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Review } from '../../types/types';

import PrivateRoute from '../private-route/private-route';

import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/no-found-screen/no-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import SignInScreen from '../../pages/sing-in-screen/sing-in-screen';

type AppScreenProps = {
  reviews: Review[];
}

function App(props: AppScreenProps): JSX.Element {

  const { reviews } = props;

  const films = useAppSelector((state) => state.films);
  const mainFilm = useAppSelector((state) => state.promo);

  const isLoading = useAppSelector((state) => state.isFilmsLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return(
      <LoadingScreen/>
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <MainScreen mainFilm={mainFilm} />
            }
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListScreen films={films} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Film}/:id${AppRoute.AddReview}`}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <AddReviewScreen films={films} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Player}/:id`}
            element={<PlayerScreen films={films} />}
          />
          <Route
            path={`${AppRoute.Film}/:id`}
            element={
              <FilmScreen films={films} reviews={reviews} />
            }
          />
          <Route
            path={AppRoute.SignIn}
            element={<SignInScreen />}
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
