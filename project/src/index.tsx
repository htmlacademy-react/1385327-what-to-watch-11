import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import filmsInfo from './mock/films-info';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      title={filmsInfo[25].name}
      genre={filmsInfo[25].genre}
      year={filmsInfo[25].released}
      posterImage={filmsInfo[25].posterImage}
    />
  </React.StrictMode>,
);
