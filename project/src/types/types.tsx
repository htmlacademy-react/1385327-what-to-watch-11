type Film = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: [string];
  // starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}

type Review = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    id: number
    name: string
  }
}

type NewReview = {
  comment: string;
  rating: number | null;
}

export type { Film, Review, NewReview };
