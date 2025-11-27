import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DEFAULT_MOCK_MOVIES } from "../data/mockMovies";
import type { Movie, CastMember } from "../data/mockMovies";
import { DEFAULT_MOCK_REVIEWS } from "../data/mockReviews";
import type { Review } from "../data/mockReviews";

type TMDBGenre = { id: number; name: string };
type TMDBCredits = {
  cast?: Array<{
    id: number;
    name: string;
    character?: string;
    profile_path?: string | null;
  }>;
};

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ author: "", rating: 5, text: "" });

  const tmdbKey = (
    import.meta as unknown as { env: Record<string, string | undefined> }
  ).env.VITE_TMDB_KEY;

  // Load local posters
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
    if (!id) return;
    fetchDetail();

    // Load reviews for this movie
    const movieReviews = DEFAULT_MOCK_REVIEWS.filter(
      (r) => String(r.movieId) === String(id) || r.movieId === Number(id)
    );
    setReviews(movieReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDetail = async (): Promise<void> => {
    setLoading(true);
    if (!tmdbKey) {
      // fallback to local mock movie
      const local = DEFAULT_MOCK_MOVIES.find(
        (m) => String(m.id) === String(id) || m.id === Number(id)
      );
      if (local) {
        const poster =
          postersByName[`${local.id}.png`] ||
          postersByName[String(local.id)] ||
          postersByName[`${local.id}.jpg`];
        const mockGenres = local.genre_ids
          ? local.genre_ids.map((id) => {
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
              return { id, name: genreMap[id] || "Genre" };
            })
          : [];
        setMovie({
          ...local,
          poster: poster || local.poster,
          runtime: local.runtime || 120,
          genres: mockGenres,
        });
        setCast(
          (local.cast || [
            { id: 1, name: "Acteur Principal", character: "Héros", profile_path: null },
            { id: 2, name: "Actrice Secondaire", character: "Ami(e)", profile_path: null },
          ]).map((c) => ({ ...c, character: c.character || "" }))
        );
      }
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbKey}&language=fr-FR&append_to_response=credits`
      );
      const data = await res.json();

      setMovie({
        id: data.id,
        title: data.title || data.name,
        overview: data.overview,
        poster: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : undefined,
        runtime: data.runtime,
        genres: data.genres as TMDBGenre[] | undefined,
        release_date: data.release_date,
      });

      const credits = data.credits as TMDBCredits | undefined;
      setCast(
        (credits?.cast || []).slice(0, 8).map((c) => ({
          id: c.id,
          name: c.name,
          character: c.character || "",
          profile_path: c.profile_path,
        }))
      );
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = () => {
    if (!newReview.author.trim() || !newReview.text.trim()) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const review: Review = {
      id: Math.max(...reviews.map((r) => r.id), 0) + 1,
      movieId: Number(id),
      author: newReview.author,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([...reviews, review]);
    setNewReview({ author: "", rating: 5, text: "" });
  };

  const StarRating = ({ rating, onRate }: { rating: number; onRate?: (r: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate?.(star)}
            className={`text-xl transition ${
              star <= rating ? "text-yellow-400" : "text-gray-600"
            } ${onRate ? "cursor-pointer hover:text-yellow-300" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (!id) return <div>Film introuvable</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <Link to="/films" className="text-sm text-orange-400 hover:underline">
          ← Retour aux films
        </Link>

        {loading && <div className="mt-6 text-gray-300">Chargement...</div>}

        {movie && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <img
                src={
                  movie.poster ||
                  `https://via.placeholder.com/400x600?text=${encodeURIComponent(movie.title)}`
                }
                alt={movie.title}
                className="w-full rounded"
              />
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="text-sm text-gray-300 mt-2">
                {movie.release_date} • {movie.runtime ? `${movie.runtime} min` : "—"}
              </p>
              <div className="mt-4 text-gray-200">
                <p className="mb-4">
                  {movie.overview || movie.description || "Aucune description disponible."}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold">Genres</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(movie.genres || []).map((g) => (
                    <span key={g.id} className="bg-gray-800 px-3 py-1 rounded text-sm">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold">Casting</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                  {cast.map((c) => (
                    <div key={c.id} className="text-center">
                      <div className="w-full h-40 bg-gray-700 rounded flex items-center justify-center mb-2">
                        {c.profile_path ? (
                          <img
                            src={c.profile_path}
                            alt={c.name}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-300 text-xs px-2">{c.name}</span>
                        )}
                      </div>
                      <div className="mt-2 text-sm font-semibold">{c.name}</div>
                      <div className="text-xs text-gray-400">{c.character}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Critiques ({reviews.length})</h3>

                <div className="space-y-4 mb-8">
                  {reviews.length === 0 ? (
                    <p className="text-gray-400">Aucune critique pour le moment.</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="bg-gray-800 rounded p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold">{review.author}</div>
                            <div className="text-sm text-gray-400">{review.date}</div>
                          </div>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-200 text-sm">{review.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-gray-800 rounded p-6">
                  <h4 className="font-semibold mb-4">Ajouter une critique</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Votre nom</label>
                      <input
                        type="text"
                        value={newReview.author}
                        onChange={(e) =>
                          setNewReview({ ...newReview, author: e.target.value })
                        }
                        placeholder="Entrez votre nom"
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-orange-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Votre note</label>
                      <div className="flex gap-2 items-center">
                        <StarRating
                          rating={newReview.rating}
                          onRate={(r) => setNewReview({ ...newReview, rating: r })}
                        />
                        <span className="text-sm text-gray-400">{newReview.rating}/5</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Votre critique</label>
                      <textarea
                        value={newReview.text}
                        onChange={(e) =>
                          setNewReview({ ...newReview, text: e.target.value })
                        }
                        placeholder="Écrivez votre critique ici..."
                        rows={4}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-orange-400 outline-none resize-none"
                      />
                    </div>

                    <button
                      onClick={handleAddReview}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
                    >
                      Soumettre la critique
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
