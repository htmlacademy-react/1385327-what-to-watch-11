import { date, image, internet, lorem, music, name, random } from 'faker';

import { Film, Review, UserData } from '../types/types';

const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);
const getRandomColor = () => Math.floor(Math.random() * 16).toString();
const getRandomFullName = () => `${name.firstName()} ${name.lastName()}`;
const getRandomDate = (start: Date, end: Date): number => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getFullYear();

export const makeFakeFilm = (): Film => ({
  id: getRandomNumber(100500),
  name: random.words(3),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: getRandomColor(),
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
  description: lorem.paragraph(),
  rating: getRandomNumber(10),
  scoresCount: getRandomNumber(100500),
  director: getRandomFullName(),
  starring: Array.from({length: 3}, getRandomFullName),
  runTime: getRandomNumber(300),
  genre: music.genre(),
  released: getRandomDate(new Date(1970, 0, 1), new Date()),
  isFavorite: Math.random() < 0.5,
} as Film);

export const makeFakeFilmComment = (): Review => ({
  comment: lorem.sentence(),
  date: String(date.recent()),
  id: getRandomNumber(100500),
  rating: getRandomNumber(10),
  user: {
    id: getRandomNumber(100500),
    name: getRandomFullName(),
  }
} as Review);

export const makeFakeUser = (): UserData => ({
  id: getRandomNumber(100500),
  email: internet.email(),
  token: random.alpha({count: 10}),
  avatarUrl: image.imageUrl(),
  name: getRandomFullName()
} as UserData);
