import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_MOCK_MOVIES, type Movie } from "../data/mockMovies";

type Genre = { id: number; name: string };

export default function Films() {
  const [query, setQuery] = useState("");
  const [allMovies, setAllMovies] = useState<Movie[]>([]); // Tous les films avec posters
  const [movies, setMovies] = useState<Movie[]>([]); // Films filtrés à afficher
  const [loading, setLoading] = useState(false);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | "">("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [minRating, setMinRating] = useState<number>(0);

  // Charger posters locaux depuis src/assets/posters
  const posterModules = import.meta.glob("../assets/posters/*.{png,jpg,jpeg}", {
    eager: true,
    as: "url",
  }) as Record<string, string>;

  const postersByName = Object.entries(posterModules).reduce((acc, [path, url]) => {
    const name = path.split("/").pop()!;
    acc[name] = url;
    acc[name.replace(/\.[^.]+$/, "")] = url;
    acc[name.toLowerCase()] = url;
    acc[name.replace(/\.[^.]+$/, "").toLowerCase()] = url;
    return acc;
  }, {} as Record<string, string>);

  useEffect(() => {
    setLoading(true);

    // Ajouter posters aux films mock
    const withPosters = DEFAULT_MOCK_MOVIES.map((m) => ({
      ...m,
      poster:
        postersByName[`${m.id}.png`] ||
        postersByName[String(m.id)] ||
        postersByName[`${m.id}.jpg`] ||
        m.poster,
    }));
    setAllMovies(withPosters);
    setMovies(withPosters);

    // Générer liste de genres depuis films mock
    const allGenreIds = new Set<number>();
    DEFAULT_MOCK_MOVIES.forEach((m) => m.genre_ids?.forEach((id) => allGenreIds.add(id)));

    const genreMap: Record<number, string> = {
      12: "Aventure",
      18: "Drame",
      10749: "Romance",
      35: "Comédie",
      53: "Thriller",
      36: "Biopic",
      9648: "Mystère",
      14: "Fantastique",
    };

    const genreList: Genre[] = Array.from(allGenreIds).map((id) => ({
      id,
      name: genreMap[id] || "Genre",
    }));

    setGenres(genreList);
    setLoading(false);
  }, []);

  const applyFilters = () => {
    let filtered = allMovies; // On filtre à partir de tous les films avec posters

    if (query.trim()) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(query.trim().toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((m) => m.genre_ids?.includes(selectedGenre));
    }

    if (selectedYear) {
      filtered = filtered.filter(
        (m) => m.release_date && new Date(m.release_date).getFullYear() === selectedYear
      );
    }

    if (minRating) {
      filtered = filtered.filter((m) => (m.vote_average ?? 0) >= minRating);
    }

    setMovies(filtered);
  };

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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher par titre..."
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>

          <div className="flex gap-2 items-center">
            <select
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
              <article key={m.id} className="bg-gray-800 rounded overflow-hidden">
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
                    <span className="text-yellow-400">{m.vote_average ?? "—"}</span>
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