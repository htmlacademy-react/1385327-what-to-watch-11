import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute, AuthorizationStatus } from '../../const';
import { Film, Review } from '../../types/types';

import PrivateRoute from '../private-route/private-route';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/no-found-screen/no-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SingInScreen from '../../pages/sing-in-screen/sing-in-screen';

type AppScreenProps = {
  films: Film[];
  reviews: Review[];
  mainFilm: Film;
}

function App(props: AppScreenProps): JSX.Element {

  const { films, reviews, mainFilm } = props;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <MainScreen films={films} mainFilm={mainFilm} />
            }
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <MyListScreen films={films} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Film}/:id${AppRoute.AddReview}`}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
              <FilmScreen films={films} review={reviews[1]} />
            }
          />
          <Route
            path={AppRoute.SingIn}
            element={<SingInScreen />}
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
