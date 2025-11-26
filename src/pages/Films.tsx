import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_MOCK_MOVIES } from "../data/mockMovies";
import type { Movie } from "../data/mockMovies";

type Genre = { id: number; name: string };

export default function Films() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>(DEFAULT_MOCK_MOVIES);
  const [loading, setLoading] = useState(false);

  // filters
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | "">("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [minRating, setMinRating] = useState<number>(0);

  const tmdbKey = (
    import.meta as unknown as { env: Record<string, string | undefined> }
  ).env.VITE_TMDB_KEY;

  // Charger posters locaux depuis src/assets/posters
  const posterModules = import.meta.glob("../assets/posters/*.{png,jpg,jpeg}", {
    eager: true,
    as: "url",
  }) as Record<string, string>;
  const postersByName = Object.entries(posterModules).reduce(
    (acc, [path, url]) => {
      const name = path.split("/").pop()!;
      acc[name] = url;
      acc[name.replace(/\.[^.]+$/, "")] = url;
      acc[name.toLowerCase()] = url;
      acc[name.replace(/\.[^.]+$/, "").toLowerCase()] = url;
      return acc;
    },
    {} as Record<string, string>
  );

  useEffect(() => {
    // Apply local posters to mock movies on component mount
    if (!tmdbKey) {
      const withPosters = DEFAULT_MOCK_MOVIES.map((m, idx) => ({
        ...m,
        poster:
          postersByName[`${idx + 1}.png`] ||
          postersByName[String(idx + 1)] ||
          postersByName[`${idx + 1}.jpg`],
      }));
      setMovies(withPosters);
      if (tmdbKey) fetchGenres();
      return; // Don't call fetchPopular if no TMDb key
    }

    // If TMDb key exists, fetch real data
    fetchPopular();
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchGenres() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}&language=fr-FR`
      );
      const data = await res.json();
      setGenres(data.genres || []);
    } catch {
      setGenres([]);
    }
  }

  async function fetchPopular() {
    if (!tmdbKey) {
      // Show local mock movies when no TMDb key is configured
      setMovies(DEFAULT_MOCK_MOVIES);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=fr-FR&page=1`
      );
      const data = await res.json();
      type TMDBMovie = {
        id: number;
        title?: string;
        name?: string;
        poster_path?: string | null;
        vote_average?: number;
        overview?: string;
        release_date?: string;
        genre_ids?: number[];
      };
      setMovies(
        (data.results || []).map((m: TMDBMovie) => ({
          id: m.id,
          title: m.title || m.name,
          overview: m.overview,
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : undefined,
          release_date: m.release_date,
          vote_average: m.vote_average,
          genre_ids: m.genre_ids,
        }))
      );
    } catch {
      setMovies(DEFAULT_MOCK_MOVIES);
    } finally {
      setLoading(false);
    }
  }

  // use TMDb discover endpoint when filters are applied (or show search results)
  async function applyFilters(): Promise<void> {
    // If user typed a query, prefer search endpoint
    if (query) {
      await search();
      return;
    }

    if (!tmdbKey) {
      // client-side filter of DEFAULT_MOCK_MOVIES
      const filtered = DEFAULT_MOCK_MOVIES.filter((m) => {
        if (selectedGenre && !m.genre_ids?.includes(selectedGenre))
          return false;
        if (
          selectedYear &&
          m.release_date &&
          new Date(m.release_date).getFullYear() !== selectedYear
        )
          return false;
        if (minRating && (m.vote_average ?? 0) < minRating) return false;
        return true;
      });
      setMovies(filtered);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        api_key: tmdbKey,
        language: "fr-FR",
        page: "1",
      });
      if (selectedGenre) params.set("with_genres", String(selectedGenre));
      if (selectedYear)
        params.set("primary_release_year", String(selectedYear));
      if (minRating) params.set("vote_average.gte", String(minRating));

      type TMDBMovie = {
        id: number;
        title?: string;
        name?: string;
        poster_path?: string | null;
        vote_average?: number;
        overview?: string;
        release_date?: string;
        genre_ids?: number[];
      };

      const url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(
        (data.results || []).map((m: TMDBMovie) => ({
          id: m.id,
          title: m.title || m.name,
          overview: m.overview,
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : undefined,
          release_date: m.release_date,
          vote_average: m.vote_average,
          genre_ids: m.genre_ids,
        }))
      );
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function search(): Promise<void> {
    if (!query) {
      await applyFilters();
      return;
    }
    if (!tmdbKey) {
      // simple client-side search on DEFAULT_MOCK_MOVIES
      const results = DEFAULT_MOCK_MOVIES.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      ).map((m, idx) => ({
        ...m,
        poster:
          postersByName[`${m.id}.png`] ||
          postersByName[String(m.id)] ||
          postersByName[`${m.id}.jpg`] ||
          m.poster,
      }));
      setMovies(results);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=fr-FR&query=${encodeURIComponent(
          query
        )}&page=1&include_adult=false`
      );
      const data = await res.json();

      type TMDBMovie = {
        id: number;
        title?: string;
        name?: string;
        poster_path?: string | null;
        vote_average?: number;
        overview?: string;
        release_date?: string;
        genre_ids?: number[];
      };

      setMovies(
        (data.results || []).map((m: TMDBMovie) => ({
          id: m.id,
          title: m.title || m.name,
          overview: m.overview,
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : undefined,
          release_date: m.release_date,
          vote_average: m.vote_average,
          genre_ids: m.genre_ids,
        }))
      );
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  // helper: build year options (e.g., last 50 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Découverte de films</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
          <div className="flex-1 w-full">
            <input
              value={query}
              onChange={async (e) => {
                const value = e.target.value;
                setQuery(value);
                // Recherche instantanée dès la saisie
                if (value.trim() !== "") {
                  await search();
                } else {
                  // Si le champ est vide, réinitialise la liste complète
                  if (!tmdbKey) {
                    const withPosters = DEFAULT_MOCK_MOVIES.map((m) => ({
                      ...m,
                      poster:
                        postersByName[`${m.id}.png`] ||
                        postersByName[String(m.id)] ||
                        postersByName[`${m.id}.jpg`] ||
                        m.poster,
                    }));
                    setMovies(withPosters);
                  } else {
                    await fetchPopular();
                  }
                }
              }}
              placeholder="Rechercher par titre..."
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>

          <div className="flex gap-2 items-center">
            <select
              aria-label="Filtrer par genre"
              title="Filtrer par genre"
              value={selectedGenre}
              onChange={(e) =>
                setSelectedGenre(e.target.value ? Number(e.target.value) : "")
              }
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">Tous genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <select
              aria-label="Filtrer par année"
              title="Filtrer par année"
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value ? Number(e.target.value) : "")
              }
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="">Toutes années</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              aria-label="Filtrer par note minimale"
              title="Filtrer par note minimale"
              value={String(minRating)}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            >
              <option value="0">Toute note</option>
              <option value="5">≥ 5</option>
              <option value="6">≥ 6</option>
              <option value="7">≥ 7</option>
              <option value="8">≥ 8</option>
            </select>

            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-orange-500 text-black rounded font-medium"
            >
              Appliquer
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Résultats</h3>
          {loading && <div className="text-gray-300">Chargement...</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {movies.map((m) => (
              <article
                key={m.id}
                className="bg-gray-800 rounded overflow-hidden"
              >
                <div className="h-56 bg-gray-700">
                  <img
                    src={
                      m.poster ||
                      `https://via.placeholder.com/300x450?text=${encodeURIComponent(
                        m.title
                      )}`
                    }
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold">{m.title}</h4>
                  <p className="text-sm text-gray-300 mt-1">{m.release_date}</p>
                  {m.genre_ids && genres.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      {m.genre_ids
                        .map((id) => genres.find((g) => g.id === id)?.name)
                        .filter(Boolean)
                        .slice(0, 2)
                        .join(", ")}
                    </p>
                  )}
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-yellow-400">
                      {m.vote_average ?? "—"}
                    </span>
                    <Link
                      to={`/films/${m.id}`}
                      className="bg-orange-500 px-3 py-1 rounded text-black font-medium"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
