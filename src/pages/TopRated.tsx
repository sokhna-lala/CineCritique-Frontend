import React from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  image: string;
  genre: string;
  year: number;
}

const TopRated: React.FC = () => {
  const navigate = useNavigate();

  const movies: Movie[] = [
    {
      id: 1,
      title: "Étoiles Filantes",
      description: "Une romance entre deux rêveurs sous les étoiles de Paris.",
      rating: 7.8,
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      genre: "Romance",
      year: 2024
    },
    {
      id: 2,
      title: "Dernier Plan",
      description: "Thriller haletant dans le monde du cinéma indépendant.",
      rating: 7.5,
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
      genre: "Thriller",
      year: 2024
    },
    {
      id: 3,
      title: "Nuit Blanche",
      description: "Drame nocturne contemporain dans les rues de Tokyo.",
      rating: 7.2,
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      genre: "Drame",
      year: 2023
    },
    {
      id: 4,
      title: "Les Rêves",
      description: "Road movie poétique à travers l'Europe.",
      rating: 8.1,
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=600&fit=crop",
      genre: "Aventure",
      year: 2024
    },
    {
      id: 5,
      title: "Miroirs",
      description: "Un drame psychologique captivant sur l'identité.",
      rating: 7.6,
      image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=600&fit=crop",
      genre: "Psychologique",
      year: 2023
    },
    {
      id: 6,
      title: "Horizons",
      description: "Une odyssée visuelle et émotive à travers les continents.",
      rating: 8.3,
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      genre: "Aventure",
      year: 2024
    },
    {
      id: 7,
      title: "L'Écho du Silence",
      description: "Histoire émouvante dans un monastère isolé.",
      rating: 8.7,
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop", // Image corrigée
      genre: "Drame",
      year: 2023
    },
    {
      id: 8,
      title: "Code Source",
      description: "Science-fiction cyberpunk dans un futur proche.",
      rating: 7.9,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop",
      genre: "Sci-Fi",
      year: 2024
    },
    {
      id: 9,
      title: "Rivages",
      description: "Drame familial sur les côtes bretonnes.",
      rating: 7.4,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      genre: "Drame",
      year: 2023
    },
    {
      id: 10,
      title: "L'Ombre du Passé",
      description: "Mystère historique dans le Paris des années 50.",
      rating: 8.0,
      image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&h=600&fit=crop",
      genre: "Mystère",
      year: 2024
    },
    {
      id: 11,
      title: "Infini",
      description: "Exploration spatiale aux confins de l'univers.",
      rating: 8.5,
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
      genre: "Sci-Fi",
      year: 2024
    },
    {
      id: 12,
      title: "Reflets",
      description: "Comédie romantique moderne à New York.",
      rating: 7.3,
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
      genre: "Comédie",
      year: 2023
    },
    {
      id: 13,
      title: "Le Dernier Voyage",
      description: "Aventure épique dans les montagnes himalayennes.",
      rating: 8.2,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      genre: "Aventure",
      year: 2024
    },
    {
      id: 14,
      title: "Silence",
      description: "Thriller psychologique dans un hôpital abandonné.",
      rating: 7.7,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop", // Image corrigée
      genre: "Horreur",
      year: 2023
    },
    {
      id: 15,
      title: "Lueurs",
      description: "Drame social dans les banlieues parisiennes.",
      rating: 7.9,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop", // Image corrigée
      genre: "Drame",
      year: 2024
    },
    {
      id: 16,
      title: "Renaissance",
      description: "Histoire de rédemption dans le monde de l'art.",
      rating: 8.4,
      image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop",
      genre: "Drame",
      year: 2023
    },
    {
      id: 17,
      title: "Échos",
      description: "Film expérimental sur la mémoire et le temps.",
      rating: 7.1,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      genre: "Expérimental",
      year: 2024
    },
    {
      id: 18,
      title: "Horizons Perdus",
      description: "Dystopie futuriste dans une société contrôlée.",
      rating: 8.6,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop",
      genre: "Sci-Fi",
      year: 2024
    },
    {
      id: 19,
      title: "Mémoires Vives",
      description: "Enquête policière complexe à travers les décennies.",
      rating: 7.8,
      image: "https://images.unsplash.com/photo-1512070679279-8988d32161be?w=400&h=600&fit=crop",
      genre: "Policier",
      year: 2023
    },
    {
      id: 20,
      title: "Au-delà des Nuages",
      description: "Conte fantastique dans un monde imaginaire.",
      rating: 8.8,
      image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=400&h=600&fit=crop",
      genre: "Fantastique",
      year: 2024
    }
  ];

  const handleViewDetails = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Films les mieux notés
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-[#1C2437] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300">
              
              {/* Image */}
              <div className="relative">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-64 object-cover" 
                />

                <span className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                  ⭐ {movie.rating}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1">{movie.title}</h3>

                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                  {movie.description}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm bg-gray-800 px-2 py-1 rounded text-gray-300">
                    {movie.genre}
                  </span>

                  <button
                    onClick={() => handleViewDetails(movie.id)}
                    className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600"
                  >
                    Voir détails
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TopRated;