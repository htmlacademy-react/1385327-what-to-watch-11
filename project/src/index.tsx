import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';

import filmsInfo from './mock/films-info';
import reviews from './mock/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      films={filmsInfo}
      reviews={reviews}
      mainFilm={filmsInfo[25]}
    />
  </React.StrictMode>,
);
