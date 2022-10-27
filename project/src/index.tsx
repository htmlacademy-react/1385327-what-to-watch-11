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
      film={filmsInfo[25]}
    />
  </React.StrictMode>,
);
