import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type CastMember = { id: number; name: string; character?: string; profile_path?: string | null };

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);

  const tmdbKey = (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_TMDB_KEY;

  useEffect(() => {
    if (!id) return;
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchDetail() {
    setLoading(true);
    if (!tmdbKey) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbKey}&language=fr-FR&append_to_response=credits`);
      const data = await res.json();
      setMovie({
        id: data.id,
        title: data.title || data.name,
        overview: data.overview,
        poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : undefined,
        runtime: data.runtime,
        genres: data.genres,
        release_date: data.release_date,
      });
      setCast((data.credits?.cast || []).slice(0, 8).map((c: any) => ({ id: c.id, name: c.name, character: c.character, profile_path: c.profile_path })));
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  if (!id) return <div>Film introuvable</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <Link to="/films" className="text-sm text-orange-400 hover:underline">← Retour aux films</Link>

        {loading && <div className="mt-6 text-gray-300">Chargement...</div>}

        {movie && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <img src={movie.poster || `https://via.placeholder.com/400x600?text=${encodeURIComponent(movie.title)}`} alt={movie.title} className="w-full rounded" />
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="text-sm text-gray-300 mt-2">{movie.release_date} • {movie.runtime ? `${movie.runtime} min` : '—'}</p>
              <div className="mt-4 text-gray-200">{movie.overview}</div>

              <div className="mt-6">
                <h3 className="font-semibold">Genres</h3>
                <div className="flex gap-2 mt-2">
                  {(movie.genres || []).map((g: any) => (
                    <span key={g.id} className="bg-gray-800 px-3 py-1 rounded">{g.name}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold">Casting</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                  {cast.map((c) => (
                    <div key={c.id} className="text-center">
                      <img src={c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : `https://via.placeholder.com/200x300?text=${encodeURIComponent(c.name)}`} alt={c.name} className="w-full h-40 object-cover rounded" />
                      <div className="mt-2 text-sm">{c.name}</div>
                      <div className="text-xs text-gray-400">{c.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
