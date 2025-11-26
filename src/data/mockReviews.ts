export type Review = {
  id: number;
  movieId: number;
  author: string;
  rating: number; // 1-5
  text: string;
  date: string;
};

export const DEFAULT_MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    movieId: 1,
    author: "Jean Dupont",
    rating: 5,
    text: "Un chef-d'œuvre ! Les paysages sont magnifiques et l'histoire captivante du début à la fin.",
    date: "2024-01-15",
  },
  {
    id: 2,
    movieId: 1,
    author: "Marie Leclerc",
    rating: 4,
    text: "Très bon film, bien que quelques scènes auraient pu être raccourcies. Recommandé !",
    date: "2024-01-10",
  },
  {
    id: 3,
    movieId: 2,
    author: "Pierre Bernard",
    rating: 5,
    text: "Une romance sublime sous les étoiles. Les acteurs jouent merveilleusement bien.",
    date: "2023-12-20",
  },
  {
    id: 4,
    movieId: 3,
    author: "Sophie Martin",
    rating: 4,
    text: "Thriller intéressant avec des rebondissements attendus. Bonne ambiance générale.",
    date: "2023-11-05",
  },
  {
    id: 5,
    movieId: 5,
    author: "Luc Gaston",
    rating: 5,
    text: "Une histoire inspirante qui laisse une trace. Les performances des acteurs sont exceptionnelles.",
    date: "2024-02-28",
  },
];
