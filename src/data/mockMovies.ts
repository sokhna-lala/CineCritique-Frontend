type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
};

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  overview?: string;
  description?: string;
  poster?: string | undefined;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  cast?: CastMember[];
  runtime?: number;         // durée en minutes
  genres?: Genre[];         // genres complets pour TMDb
};

export const DEFAULT_MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Le Voyageur",
    overview: "Aventure épique et émotion.",
    description: "Un jeune homme entreprend un voyage extraordinaire à travers des paysages enchanteurs...",
    poster: undefined,
    release_date: "2021-05-12",
    vote_average: 8.1,
    genre_ids: [12, 18],
    runtime: 120,
    genres: [
      { id: 12, name: "Aventure" },
      { id: 18, name: "Drame" }
    ],
    cast: [
      { id: 1, name: "Marc Leclerc", character: "Le Voyageur", profile_path: "https://via.placeholder.com/200x300?text=Marc+Leclerc" },
      { id: 2, name: "Sophie Bernard", character: "La Compagne", profile_path: "https://via.placeholder.com/200x300?text=Sophie+Bernard" },
    ]
  },
  {
    id: 2,
    title: "Étoiles Filantes",
    overview: "Une romance entre deux rêveurs.",
    description: "Sous les cieux étoilés de Paris, deux âmes perdues se rencontrent par hasard...",
    poster: undefined,
    release_date: "2020-08-20",
    vote_average: 7.8,
    genre_ids: [10749, 35],
    runtime: 110,
    genres: [
      { id: 10749, name: "Romance" },
      { id: 35, name: "Comédie" }
    ],
    cast: [
      { id: 3, name: "Pierre Rousseau", character: "Adam", profile_path: "https://via.placeholder.com/200x300?text=Pierre+Rousseau" },
      { id: 4, name: "Amélie Dubois", character: "Éva", profile_path: "https://via.placeholder.com/200x300?text=Amelie+Dubois" },
    ]
  },
  // … continue pour tous tes films en ajoutant runtime et genres
];

export type { Movie, CastMember, Genre };
