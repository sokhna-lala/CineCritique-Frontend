type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
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
};

export const DEFAULT_MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Le Voyageur",
    overview: "Aventure épique et émotion.",
    description: "Un jeune homme entreprend un voyage extraordinaire à travers des paysages enchanteurs. Confronté à des défis inattendus et des rencontres magiques, il découvrira que le véritable voyage est celui de l'âme. Une épopée visuelle sur la quête de soi et l'exploration des limites de l'humanité.",
    poster: undefined,
    release_date: "2021-05-12",
    vote_average: 8.1,
    genre_ids: [12, 18],
    cast: [
      { id: 1, name: "Marc Leclerc", character: "Le Voyageur", profile_path: "https://via.placeholder.com/200x300?text=Marc+Leclerc" },
      { id: 2, name: "Sophie Bernard", character: "La Compagne", profile_path: "https://via.placeholder.com/200x300?text=Sophie+Bernard" },
    ]
  },
  {
    id: 2,
    title: "Étoiles Filantes",
    overview: "Une romance entre deux rêveurs.",
    description: "Sous les cieux étoilés de Paris, deux âmes perdues se rencontrent par hasard. Entre poésie et tendresse, ils naviguent les méandres de l'amour moderne. Un conte romantique sur la connexion humaine et la beauté des moments fugaces partagés sous les étoiles.",
    poster: undefined,
    release_date: "2020-08-20",
    vote_average: 7.8,
    genre_ids: [10749, 35],
    cast: [
      { id: 3, name: "Pierre Rousseau", character: "Adam", profile_path: "https://via.placeholder.com/200x300?text=Pierre+Rousseau" },
      { id: 4, name: "Amélie Dubois", character: "Éva", profile_path: "https://via.placeholder.com/200x300?text=Amelie+Dubois" },
    ]
  },
  {
    id: 3,
    title: "Dernier Plan",
    overview: "Thriller haletant et visuel.",
    description: "Un cinéaste intrépide découvre un secret sombre dans les coulisses du cinéma indépendant. Pris entre la vérité et les apparences, il doit naviguer un monde de mensonges et de trahisons. Un thriller psychologique qui remet en question la nature même de la réalité.",
    poster: undefined,
    release_date: "2019-11-01",
    vote_average: 7.5,
    genre_ids: [53, 18],
    cast: [
      { id: 5, name: "Thomas Moreau", character: "Réalisateur", profile_path: "https://via.placeholder.com/200x300?text=Thomas+Moreau" },
      { id: 6, name: "Isabelle Martin", character: "Productrice", profile_path: "https://via.placeholder.com/200x300?text=Isabelle+Martin" },
    ]
  },
  {
    id: 4,
    title: "Nuit Blanche",
    overview: "Drame nocturne contemporain.",
    description: "Une nuit ordinaire devient extraordinaire quand un cadre réussit se perd dans les rues de Tokyo. Entre rencontres inattendues et introspection profonde, il redécouvre le sens de son existence. Un drame urbain sur la solitude et la rédemption dans la pénombre.",
    poster: undefined,
    release_date: "2018-02-14",
    vote_average: 7.2,
    genre_ids: [18],
    cast: [
      { id: 7, name: "Yuki Tanaka", character: "Hiroshi", profile_path: "https://via.placeholder.com/200x300?text=Yuki+Tanaka" },
      { id: 8, name: "Aiko Yamamoto", character: "Miyuki", profile_path: "https://via.placeholder.com/200x300?text=Aiko+Yamamoto" },
    ]
  },
  {
    id: 5,
    title: "Héroïne",
    overview: "Biopic inspirant.",
    description: "L'histoire vraie d'une femme ordinaire qui devient une légende. Surpassant les obstacles et les préjugés, elle forge son propre destin. Un portrait émouvant de courage, de détermination et de la force indomptable de l'esprit humain.",
    poster: undefined,
    release_date: "2022-09-08",
    vote_average: 8.3,
    genre_ids: [18, 36],
    cast: [
      { id: 9, name: "Emma Rossi", character: "Rosa", profile_path: "https://via.placeholder.com/200x300?text=Emma+Rossi" },
      { id: 10, name: "Luca Ferrari", character: "Père", profile_path: "https://via.placeholder.com/200x300?text=Luca+Ferrari" },
    ]
  },
  {
    id: 6,
    title: "Les Rives",
    overview: "Road movie poétique.",
    description: "Deux amis d'enfance se retrouvent pour un dernier voyage à travers l'Europe. Entre les routes sinueuses et les villes pittoresques, ils se confrontent à leurs rêves abandonnés. Un road movie poétique sur l'amitié, le temps et les chemins non pris.",
    poster: undefined,
    release_date: "2017-06-30",
    vote_average: 7.0,
    genre_ids: [12, 35],
    cast: [
      { id: 11, name: "Antoine Girard", character: "Paul", profile_path: "https://via.placeholder.com/200x300?text=Antoine+Girard" },
      { id: 12, name: "Clément Lemaire", character: "Jean", profile_path: "https://via.placeholder.com/200x300?text=Clement+Lemaire" },
    ]
  },
  {
    id: 7,
    title: "Miroirs",
    overview: "Un drame psychologique captivant.",
    description: "Une femme se regarde dans un miroir et voit une version alternative d'elle-même. Plongée dans un univers où la réalité et l'illusion se confondent, elle doit affronter ses démons intérieurs. Un drame psychologique sur l'identité et les fractales de l'âme.",
    poster: undefined,
    release_date: "2016-10-05",
    vote_average: 7.9,
    genre_ids: [18, 9648],
    cast: [
      { id: 13, name: "Céline Dupont", character: "Catherine", profile_path: "https://via.placeholder.com/200x300?text=Celine+Dupont" },
      { id: 14, name: "Maxime Lefevre", character: "Psychiatre", profile_path: "https://via.placeholder.com/200x300?text=Maxime+Lefevre" },
    ]
  },
  {
    id: 8,
    title: "Horizons",
    overview: "Une odyssée visuelle et émotive.",
    description: "Un explorateur découvre une terre mystérieuse oubliée du temps. Chaque horizon révèle de nouveaux secrets et des vérités cachées. Une épopée visuelle sur la curiosité humaine et la quête de connaissance au-delà des frontières du monde connu.",
    poster: undefined,
    release_date: "2015-03-22",
    vote_average: 7.6,
    genre_ids: [12, 14],
    cast: [
      { id: 15, name: "David Mercier", character: "Explorateur", profile_path: "https://via.placeholder.com/200x300?text=David+Mercier" },
      { id: 16, name: "Nathalie Gaston", character: "Guide", profile_path: "https://via.placeholder.com/200x300?text=Nathalie+Gaston" },
    ]
  },
];

export type { Movie, CastMember };
