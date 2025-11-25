import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
};

type Genre = { id: number; name: string };

const MOCK_RESULTS: Movie[] = [];

export default function Films() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>(MOCK_RESULTS);
  const [loading, setLoading] = useState(false);

  // filters
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | ''>('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number>(0);

  const tmdbKey = (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_TMDB_KEY;

  // Charger posters locaux depuis src/assets/posters
  const posterModules = import.meta.glob('../assets/posters/*.{png,jpg,jpeg}', {
    eager: true,
    as: 'url',
  }) as Record<string, string>;
  const postersByName = Object.entries(posterModules).reduce((acc, [path, url]) => {
    const name = path.split('/').pop()!;
    acc[name] = url;
    acc[name.replace(/\.[^.]+$/, '')] = url;
    acc[name.toLowerCase()] = url;
    acc[name.replace(/\.[^.]+$/, '').toLowerCase()] = url;
    return acc;
  }, {} as Record<string, string>);

  // Mock local movies to show when no TMDb key is provided
  const LOCAL_MOCK: Movie[] = [
    { id: 1, title: 'Le Voyageur', overview: 'Aventure épique et émotion.', poster: postersByName['1.png'] || postersByName['1'] , release_date: '2021-05-12', vote_average: 8.1, genre_ids: [12, 18] },
    { id: 2, title: 'Étoiles Filantes', overview: "Une romance entre deux rêveurs.", poster: postersByName['2.png'] || postersByName['2'], release_date: '2020-08-20', vote_average: 7.8, genre_ids: [10749, 35] },
    { id: 3, title: 'Dernier Plan', overview: 'Thriller haletant et visuel.', poster: postersByName['3.png'] || postersByName['3'], release_date: '2019-11-01', vote_average: 7.5, genre_ids: [53, 18] },
    { id: 4, title: 'Nuit Blanche', overview: 'Drame nocturne contemporain.', poster: postersByName['4.png'] || postersByName['4'], release_date: '2018-02-14', vote_average: 7.2, genre_ids: [18] },
    { id: 5, title: 'Héroïne', overview: 'Biopic inspirant.', poster: postersByName['5.png'] || postersByName['5'], release_date: '2022-09-08', vote_average: 8.3, genre_ids: [18, 36] },
    { id: 6, title: 'Les Rives', overview: "Road movie poétique.", poster: postersByName['6.png'] || postersByName['6'], release_date: '2017-06-30', vote_average: 7.0, genre_ids: [12, 35] },
    { id: 7, title: 'Miroirs', overview: 'Un drame psychologique captivant.', poster: postersByName['7.png'] || postersByName['7'], release_date: '2016-10-05', vote_average: 7.9, genre_ids: [18, 9648] },
    { id: 8, title: 'Horizons', overview: 'Une odyssée visuelle et émotive.', poster: postersByName['8.png'] || postersByName['8'], release_date: '2015-03-22', vote_average: 7.6, genre_ids: [12, 14] },
  ];

  useEffect(() => {
    fetchPopular();
    if (tmdbKey) fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchGenres() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}&language=fr-FR`);
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (err) {
      setGenres([]);
    }
  }

  async function fetchPopular() {
    if (!tmdbKey) {
      // Show local mock movies when no TMDb key is configured
      setMovies(LOCAL_MOCK);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=fr-FR&page=1`);
      const data = await res.json();
      setMovies((data.results || []).map((m: any) => ({
        id: m.id,
        title: m.title || m.name,
        overview: m.overview,
        poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : undefined,
        release_date: m.release_date,
        vote_average: m.vote_average,
        genre_ids: m.genre_ids,
      })));
    } catch (err) {
      setMovies(MOCK_RESULTS);
    } finally {
      setLoading(false);
    }
  }

  // use TMDb discover endpoint when filters are applied (or show search results)
  async function applyFilters() {
    // If user typed a query, prefer search endpoint
    if (query) return search();

    if (!tmdbKey) {
      // client-side filter of LOCAL_MOCK
      const filtered = LOCAL_MOCK.filter((m) => {
        if (selectedGenre && !(m as any).genre_ids?.includes(selectedGenre)) return false;
        if (selectedYear && m.release_date && new Date(m.release_date).getFullYear() !== selectedYear) return false;
        if (minRating && (m.vote_average ?? 0) < minRating) return false;
        return true;
      });
      setMovies(filtered);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({ api_key: tmdbKey, language: 'fr-FR', page: '1' });
      if (selectedGenre) params.set('with_genres', String(selectedGenre));
      if (selectedYear) params.set('primary_release_year', String(selectedYear));
      if (minRating) params.set('vote_average.gte', String(minRating));

      const url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies((data.results || []).map((m: any) => ({
        id: m.id,
        title: m.title || m.name,
        overview: m.overview,
        poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : undefined,
        release_date: m.release_date,
        vote_average: m.vote_average,
        genre_ids: m.genre_ids,
      })));
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function search() {
    if (!query) return applyFilters();
    if (!tmdbKey) {
      // simple client-side search on LOCAL_MOCK
      const results = LOCAL_MOCK.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
      setMovies(results);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=fr-FR&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
      const data = await res.json();
      setMovies((data.results || []).map((m: any) => ({
        id: m.id,
        title: m.title || m.name,
        overview: m.overview,
        poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : undefined,
        release_date: m.release_date,
        vote_average: m.vote_average,
        genre_ids: m.genre_ids,
      })));
    } catch (err) {
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher par titre..."
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
            />
          </div>

          <div className="flex gap-2 items-center">
            <select aria-label="Filtrer par genre" title="Filtrer par genre" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : '')} className="px-3 py-2 bg-gray-800 border border-gray-700 rounded">
              <option value="">Tous genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>

            <select aria-label="Filtrer par année" title="Filtrer par année" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : '')} className="px-3 py-2 bg-gray-800 border border-gray-700 rounded">
              <option value="">Toutes années</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select aria-label="Filtrer par note minimale" title="Filtrer par note minimale" value={String(minRating)} onChange={(e) => setMinRating(Number(e.target.value))} className="px-3 py-2 bg-gray-800 border border-gray-700 rounded">
              <option value="0">Toute note</option>
              <option value="5">≥ 5</option>
              <option value="6">≥ 6</option>
              <option value="7">≥ 7</option>
              <option value="8">≥ 8</option>
            </select>

            <button onClick={applyFilters} className="px-4 py-2 bg-orange-500 text-black rounded font-medium">Appliquer</button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Résultats</h3>
          {loading && <div className="text-gray-300">Chargement...</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {movies.map((m) => (
              <article key={m.id} className="bg-gray-800 rounded overflow-hidden">
                <div className="h-56 bg-gray-700">
                  <img src={m.poster || `https://via.placeholder.com/300x450?text=${encodeURIComponent(m.title)}`} alt={m.title} className="w-full h-full object-cover" />
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
                        .join(', ')}
                    </p>
                  )}
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-yellow-400">{m.vote_average ?? '—'}</span>
                    <Link to={`/films/${m.id}`} className="bg-orange-500 px-3 py-1 rounded text-black font-medium">Détails</Link>
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
