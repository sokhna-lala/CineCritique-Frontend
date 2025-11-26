type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster?: string | undefined;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
};

export const DEFAULT_MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Le Voyageur",
    overview: "Aventure épique et émotion.",
    poster: undefined,
    release_date: "2021-05-12",
    vote_average: 8.1,
    genre_ids: [12, 18],
  },
  {
    id: 2,
    title: "Étoiles Filantes",
    overview: "Une romance entre deux rêveurs.",
    poster: undefined,
    release_date: "2020-08-20",
    vote_average: 7.8,
    genre_ids: [10749, 35],
  },
  {
    id: 3,
    title: "Dernier Plan",
    overview: "Thriller haletant et visuel.",
    poster: undefined,
    release_date: "2019-11-01",
    vote_average: 7.5,
    genre_ids: [53, 18],
  },
  {
    id: 4,
    title: "Nuit Blanche",
    overview: "Drame nocturne contemporain.",
    poster: undefined,
    release_date: "2018-02-14",
    vote_average: 7.2,
    genre_ids: [18],
  },
  {
    id: 5,
    title: "Héroïne",
    overview: "Biopic inspirant.",
    poster: undefined,
    release_date: "2022-09-08",
    vote_average: 8.3,
    genre_ids: [18, 36],
  },
  {
    id: 6,
    title: "Les Rives",
    overview: "Road movie poétique.",
    poster: undefined,
    release_date: "2017-06-30",
    vote_average: 7.0,
    genre_ids: [12, 35],
  },
  {
    id: 7,
    title: "Miroirs",
    overview: "Un drame psychologique captivant.",
    poster: undefined,
    release_date: "2016-10-05",
    vote_average: 7.9,
    genre_ids: [18, 9648],
  },
  {
    id: 8,
    title: "Horizons",
    overview: "Une odyssée visuelle et émotive.",
    poster: undefined,
    release_date: "2015-03-22",
    vote_average: 7.6,
    genre_ids: [12, 14],
  },
];

export type { Movie };
