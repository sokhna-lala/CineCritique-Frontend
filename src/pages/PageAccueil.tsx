import heroImage from "../assets/acceuil.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MOCK_MOVIES = [
  {
    id: 1,
    title: "Le Voyageur",
    poster: undefined,
    posterName: "1.jpg",
    rating: 8.1,
    overview: "Aventure épique et émotion.",
  },
  {
    id: 2,
    title: "Étoiles Filantes",
    poster: undefined,
    posterName: "2.jpg",
    rating: 7.8,
    overview: "Une romance entre deux rêveurs.",
  },
  {
    id: 3,
    title: "Dernier Plan",
    poster: undefined,
    posterName: "3.jpg",
    rating: 7.5,
    overview: "Thriller haletant et visuel.",
  },
  {
    id: 4,
    title: "Nuit Blanche",
    poster: undefined,
    posterName: "4.jpg",
    rating: 7.2,
    overview: "Drame nocturne contemporain.",
  },
  {
    id: 5,
    title: "Héroïne",
    poster: undefined,
    posterName: "5.jpg",
    rating: 8.3,
    overview: "Biopic inspirant.",
  },
  {
    id: 6,
    title: "Les Rives",
    poster: undefined,
    posterName: "6.jpg",
    rating: 7.0,
    overview: "Road movie poétique.",
  },
  {
    id: 7,
    title: "Miroirs",
    poster: undefined,
    posterName: "7.jpg",
    rating: 7.9,
    overview: "Un drame psychologique captivant.",
  },
  {
    id: 8,
    title: "Horizons",
    poster: undefined,
    posterName: "8.jpg",
    rating: 7.6,
    overview: "Une odyssée visuelle et émotive.",
  },
];

export default function PageAccueil() {
  // Charger automatiquement les images depuis `src/assets` (Vite)
  const modules = import.meta.glob("../assets/*acceuil*.{png,jpg,jpeg}", {
    eager: true,
    as: "url",
  }) as Record<string, string>;
  const autoImages = Object.values(modules || {});
  const images = autoImages.length ? autoImages : [heroImage];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* SECTION HERO - Carousel */}
      <section
        className="w-full h-[450px] bg-cover bg-center flex items-center px-6 relative"
        style={{ backgroundImage: `url(${images[index]})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 bg-transparent p-6 rounded-lg max-w-xl">
          <h2 className="text-5xl font-bold">CineCritique</h2>
          <p className="text-xl mt-2">Trouvez, Notez, Partagez</p>

          <div className="mt-6 flex gap-4">
            <Link to="/connexion" className="">
              <button className="bg-orange-500 text-black px-5 py-2 rounded font-semibold hover:opacity-90">
                Connexion
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-transparent border border-white px-5 py-2 rounded font-medium hover:bg-white/10">
                S'inscrire
              </button>
            </Link>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          aria-label="Précédent"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 p-2 rounded-full hover:bg-black/60"
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Suivant"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 p-2 rounded-full hover:bg-black/60"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Aller à la slide ${i + 1}`}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Films Populaires */}
      <section className="bg-gray-700 px-10 py-16">
        <div className="flex items-center justify-between">
          <h3 className="text-4xl font-bold">Films Populaires</h3>
          <Link to="/films" className="text-sm text-orange-400 hover:underline">
            Voir tous
          </Link>
        </div>

        <PopularMovies />
      </section>

      {/* Points */}
      <div className="flex justify-center gap-4 py-6">
        <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
        <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
        <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
      </div>
    </div>
  );
}

function PopularMovies() {
  type Movie = {
    id: number;
    title: string;
    poster?: string;
    posterName?: string;
    rating?: number;
    overview?: string;
    genre_ids?: number[];
  };

  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  // Charger posters locaux depuis src/assets/posters (nommez vos fichiers par ex. "1.jpg", "2.jpg"...)
  const posterModules = import.meta.glob("../assets/posters/*.{png,jpg,jpeg}", {
    eager: true,
    as: "url",
  }) as Record<string, string>;
  const postersByName = Object.entries(posterModules).reduce(
    (acc, [path, url]) => {
      const name = path.split("/").pop()!; // ex: '1.jpg'
      acc[name] = url;
      // also register without extension to support lookups like '1' or '1.jpg'/'1.png'
      const withoutExt = name.replace(/\.[^.]+$/, "");
      acc[withoutExt] = url;
      // lowercase variants
      acc[name.toLowerCase()] = url;
      acc[withoutExt.toLowerCase()] = url;
      return acc;
    },
    {} as Record<string, string>
  );

  useEffect(() => {
    // If user provided a TMDB API key in Vite env (VITE_TMDB_KEY), fetch real popular movies.
    const key = (
      import.meta as unknown as { env: Record<string, string | undefined> }
    ).env.VITE_TMDB_KEY;

    if (!key) return; // keep mockMovies if no key

    // fetch genres list for mapping ids to names
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=fr-FR`
    )
      .then((r) => r.json())
      .then((d) => setGenres(d.genres || []))
      .catch(() => setGenres([]));

    type TMDBMovie = {
      id: number;
      title?: string;
      name?: string;
      poster_path?: string | null;
      vote_average?: number;
      overview?: string;
    };

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=fr-FR&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        const items = (data.results || []).slice(0, 8).map((m: TMDBMovie) => ({
          id: m.id,
          title: m.title || m.name || "Titre inconnu",
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : undefined,
          rating: m.vote_average,
          overview: m.overview,
          genre_ids: (m as any).genre_ids,
        }));
        setMovies(items);
      })
      .catch(() => {
        // garder les mock par défaut en cas d'erreur
        setMovies(MOCK_MOVIES);
      });
  }, []);

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.length === 0 && (
        <div className="text-gray-300">Chargement des films populaires...</div>
      )}

      {movies.map((m) => (
        <article
          key={m.id}
          className="bg-gray-800 rounded overflow-hidden shadow-md"
        >
          <div className="h-56 bg-gray-700 flex items-center justify-center">
            {(() => {
              const posterKey = m.posterName || `${m.id}`;
              const localPoster =
                postersByName[posterKey] ||
                postersByName[posterKey.toLowerCase()] ||
                postersByName[`${m.id}`] ||
                postersByName[`${m.id}.jpg`] ||
                postersByName[`${m.id}.png`];
              const posterUrl =
                m.poster ||
                localPoster ||
                `https://via.placeholder.com/300x450?text=${encodeURIComponent(
                  m.title
                )}`;
              return (
                <img
                  src={posterUrl}
                  alt={m.title}
                  className="w-full h-full object-cover"
                />
              );
            })()}
          </div>

          <div className="p-4">
            <h4 className="font-semibold text-lg">{m.title}</h4>
            <p className="text-sm text-gray-300 mt-1">{m.overview}</p>

            {m.genre_ids && genres.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {m.genre_ids
                  .map((id) => genres.find((g) => g.id === id)?.name)
                  .filter(Boolean)
                  .slice(0, 2)
                  .join(", ")}
              </p>
            )}

            <div className="mt-3 flex items-center justify-between">
              <span className="text-yellow-400 font-medium">
                {m.rating ?? "—"}
              </span>
              <Link
                to={`/films/${m.id}`}
                className="text-sm bg-orange-500 px-3 py-1 rounded text-black font-medium"
              >
                Voir Détails
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
