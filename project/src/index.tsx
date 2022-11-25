import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';
import { fetchFilms, checkAuthAction } from './store/api-actions';

import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';

import filmsInfo from './mock/films-info';
import reviews from './mock/reviews';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilms());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App
        // films={filmsInfo}
        reviews={reviews}
        mainFilm={filmsInfo[25]}
      />
    </Provider>
  </React.StrictMode>,
);
