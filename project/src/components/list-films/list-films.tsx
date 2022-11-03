import { BaseSyntheticEvent, useState } from 'react';

import { Film } from '../../types/types';

import SmallFilmCard from '../small-film-card/small-film-card';

type ListFilmProps = {
  films: Film[];
}

function ListFilm(props: ListFilmProps): JSX.Element {
  const { films } = props;

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleMouseOver = (evt: BaseSyntheticEvent) => {
    const target = evt.target as Element;
    const parent = target.parentElement as Element;
    if (parent.classList.contains('small-film-card') || target.tagName === 'A') {
      setActiveId(parent.id);
    } else {
      setActiveId(null);
    }
  };

  return (
    <div className="catalog__films-list" onMouseOver={handleMouseOver} onMouseOut={() => setActiveId(null)}>
      {films.map((film) => <SmallFilmCard key={film.id} film={film} isActive={film.id.toString() === activeId}/>)}
    </div>
  );
}

export default ListFilm;
