import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

interface User {
  username: string;
  fullName: string;
  avatar: string;
  email: string;
  bio: string;
  joinDate: string;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  rating: number;
  image: string;
  genre: string;
}

interface Review {
  id: number;
  movieId: number;
  username: string;
  text: string;
  rating: number;
  date: string;
}

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  // Données initiales
  const initialUsers: User[] = [
    { 
      username: "gora", 
      fullName: "Gora Leye", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      email: "gora@example.com",
      bio: "Passionné de cinéma d'auteur et de films africains. Critique amateur depuis 5 ans. J'adore découvrir des pépites méconnues ! 🎬",
      joinDate: "2023-01-15"
    },
    { 
      username: "aicha", 
      fullName: "Aicha Ndiaye", 
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      email: "aicha@example.com",
      bio: "Amateur de blockbusters et de films d'action. Je partage mes coups de cœur et découvertes chaque semaine ! 💥",
      joinDate: "2023-03-20"
    },
  ];

  const movies: Movie[] = [
    { 
      id: 1, 
      title: "Dune : Deuxième partie", 
      description: "Paul Atreides s'allie avec Chani et les Fremen pour venger son père.", 
      year: 2024, 
      rating: 4.5, 
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
      genre: "Science-Fiction"
    },
    { 
      id: 2, 
      title: "Oppenheimer", 
      description: "Histoire épique de J. Robert Oppenheimer et la bombe atomique.", 
      year: 2023, 
      rating: 4.8, 
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
      genre: "Biographique"
    },
    { 
      id: 3, 
      title: "Interstellar", 
      description: "Voyage à travers un trou de ver pour sauver l'humanité.", 
      year: 2014, 
      rating: 4.7, 
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
      genre: "Science-Fiction"
    },
    { 
      id: 4, 
      title: "Les Gardiens de la Galaxie 3", 
      description: "Les Gardiens affrontent de nouveaux défis pour protéger l'univers.", 
      year: 2023, 
      rating: 4.2, 
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
      genre: "Action"
    },
  ];

  const reviews: Review[] = [
    // Critiques de Gora (positives et négatives)
    { id: 1, movieId: 1, username: "gora", text: "Chef d'œuvre cinématographique ! La photographie est magnifique, l'histoire captivante, et la bande-son sublime. Denis Villeneuve a réussi à transcender l'œuvre de Frank Herbert.", rating: 5, date: "2024-03-10" },
    { id: 2, movieId: 2, username: "gora", text: "Performance magistrale de Cillian Murphy. Un film profond qui questionne la morale et la responsabilité scientifique. La réalisation de Nolan est impeccable.", rating: 4, date: "2024-03-09" },
    { id: 3, movieId: 4, username: "gora", text: "Décevant. L'humour forcé et le scénario prévisible gâchent l'expérience. Les premiers opus étaient bien meilleurs.", rating: 2, date: "2024-03-08" },
    
    // Critiques d'Aicha (positives et négatives)
    { id: 4, movieId: 1, username: "aicha", text: "Visuellement impressionnant mais un peu long à mon goût. Certaines scènes auraient pu être raccourcies sans perdre l'essence du film.", rating: 3, date: "2024-03-11" },
    { id: 5, movieId: 3, username: "aicha", text: "Une odyssée spatiale émouvante ! La relation père-fille touche en plein cœur. Les effets spéciaux sont toujours aussi impressionnants.", rating: 5, date: "2024-03-08" },
    { id: 6, movieId: 4, username: "aicha", text: "Action et émotions au rendez-vous ! James Gunn conclut sa trilogie en beauté. Les scènes de combat sont incroyables.", rating: 4, date: "2024-03-07" },
  ];

  const [users, setUsers] = useState<User[]>([]);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userReviews, setUserReviews] = useState<(Review & { movie: Movie })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données depuis localStorage ou utiliser les données initiales
  useEffect(() => {
    const loadUsers = () => {
      const savedUsers = localStorage.getItem('cinecritique_users');
      if (savedUsers) {
        return JSON.parse(savedUsers);
      }
      // Initialiser localStorage avec les données initiales
      localStorage.setItem('cinecritique_users', JSON.stringify(initialUsers));
      return initialUsers;
    };

    const usersData = loadUsers();
    setUsers(usersData);
  }, []);

  useEffect(() => {
    if (users.length === 0) return;

    // Déterminer l'utilisateur connecté (simulé comme "gora")
    const currentUsername = "gora";
    
    // Déterminer l'utilisateur du profil à afficher
    const profileUsername = username || currentUsername;
    const user = users.find(u => u.username === profileUsername) || null;
    setProfileUser(user);

    if (user) {
      // Filtrer et associer les critiques de l'utilisateur
      const userReviewsData = reviews
        .filter(review => review.username === user.username)
        .map(review => {
          const movie = movies.find(m => m.id === review.movieId);
          return { ...review, movie: movie! };
        })
        .filter(item => item.movie);

      setUserReviews(userReviewsData);
    }

    setIsLoading(false);
  }, [username, users]);

  const isOwnProfile = username === "gora" || !username; // "gora" est l'utilisateur connecté
  const otherUsers = users.filter(user => user.username !== (username || "gora"));

  const averageRating = userReviews.length > 0 
    ? (userReviews.reduce((acc, review) => acc + review.rating, 0) / userReviews.length).toFixed(1)
    : '0.0';

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Utilisateur non trouvé</h1>
          <p className="text-gray-400 mb-6">Le profil @{username} n'existe pas.</p>
          <button 
            onClick={() => navigate('/profile')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Retour à mon profil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête du profil */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={profileUser.avatar}
                alt={profileUser.fullName}
                className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(profileUser.fullName) + "&size=150&background=f97316&color=fff";
                }}
              />
              {isOwnProfile && (
                <div className="mt-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Votre profil
                </div>
              )}
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-2">{profileUser.fullName}</h1>
              <p className="text-gray-400 text-xl mb-4">@{profileUser.username}</p>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mb-6">
                {profileUser.bio}
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-orange-500">{userReviews.length}</span>
                  <span className="text-gray-400 text-sm">Critiques publiées</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold text-yellow-400">{averageRating}</span>
                  <span className="text-gray-400 text-sm">Note moyenne</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold text-blue-400">
                    {formatJoinDate(profileUser.joinDate)}
                  </span>
                  <span className="text-gray-400 text-sm">Membre depuis</span>
                </div>
              </div>
            </div>

            {isOwnProfile && (
              <button
                onClick={() => navigate('/profile/edit')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                ✏️ Modifier le profil
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Section des critiques */}
          <div className="xl:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Critiques publiées</h2>
              <span className="text-gray-400">
                {userReviews.length} {userReviews.length === 1 ? 'critique' : 'critiques'}
              </span>
            </div>
            
            {userReviews.length > 0 ? (
              <div className="space-y-6">
                {userReviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={review.movie.image}
                          alt={review.movie.title}
                          className="w-24 h-36 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                          <div>
                            <h3 className="text-xl font-semibold hover:text-orange-400 transition-colors">
                              {review.movie.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {review.movie.year} • {review.movie.genre}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <StarRating rating={review.rating} />
                            <span className="text-gray-400 text-sm">
                              {review.date}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {review.text}
                        </p>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">Note du film:</span>
                            <StarRating rating={review.movie.rating} size="sm" />
                          </div>
                          <span className="text-orange-500 text-sm font-semibold">
                            {review.movie.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-gray-400 text-lg mb-4">
                  {isOwnProfile 
                    ? "Vous n'avez pas encore publié de critiques."
                    : `${profileUser.fullName} n'a pas encore publié de critiques.`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Section autres utilisateurs */}
          <div className="xl:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Autres utilisateurs</h2>
            <div className="space-y-4">
              {otherUsers.map((user) => (
                <div 
                  key={user.username} 
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-12 h-12 rounded-full border-2 border-gray-600"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.fullName) + "&size=48&background=f97316&color=fff";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{user.fullName}</h3>
                      <p className="text-gray-400 text-sm truncate">@{user.username}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/profile/${user.username}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
                    >
                      Voir profil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;