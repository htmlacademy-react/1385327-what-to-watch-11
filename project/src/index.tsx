import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';

import App from './components/app/app';

import filmsInfo from './mock/films-info';
import reviews from './mock/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        films={filmsInfo}
        reviews={reviews}
        mainFilm={filmsInfo[25]}
      />
    </Provider>
  </React.StrictMode>,
);
