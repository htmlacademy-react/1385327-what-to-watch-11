import { createSelector } from '@reduxjs/toolkit';

import { Film } from '../../types/types';
import { State } from '../../types/state';

import { DEFAULT_GENRE_FILTER, MAX_GENRE_FILTER, NameSpace } from '../../const';

export const getFilms = (state: State): Film[] => state[NameSpace.Films].films;
export const getIsFilmsLoading = (state: State): boolean => state[NameSpace.Films].isLoading;

export const getFilmsOpened = (state: State): number => state[NameSpace.Films].filmsOpen;

export const getGenres = (state: State): string[] => [DEFAULT_GENRE_FILTER, ...new Set(state[NameSpace.Films].films.map((film) => film.genre))].slice(0, MAX_GENRE_FILTER);
export const getCurrentGenre = (state: State): string => state[NameSpace.Films].currentGenre;

export const getCountFavoritesFilms = (state: State): number => state[NameSpace.Films].films.filter((film) => film.isFavorite === true).length;

export const getFilteredFilms = createSelector(
  [getFilms, getCurrentGenre],
  (films, genre) => {
    if (genre === DEFAULT_GENRE_FILTER) {
      return films;
    }
    return films.filter((film) => film.genre === genre);
  }
);
