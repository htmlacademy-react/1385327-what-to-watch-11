import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import LoadingScreen from '../loading-screen/loading-screen';

import { getIsFilmsLoading } from '../../store/films-process/selector';
import { getAuthorizationStatus } from '../../store/user-process/selector';

import browserHistory from '../../browser-history';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/no-found-screen/no-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sing-in-screen/sing-in-screen';

function App(): JSX.Element {

  const isLoading = useAppSelector(getIsFilmsLoading); //(state) => state.isFilmsLoading
  const authorizationStatus = useAppSelector(getAuthorizationStatus);//(state) => state.authorizationStatus

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return(
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Film}/:id${AppRoute.AddReview}`}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <AddReviewScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Player}/:id`}
            element={<PlayerScreen />}
          />
          <Route
            path={`${AppRoute.Film}/:id`}
            element={<FilmScreen />}
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
