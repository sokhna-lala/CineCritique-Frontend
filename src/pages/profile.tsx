import React from 'react';

// Interface TypeScript pour les films
interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  rating: number;
  image: string;
}

const Profile: React.FC = () => {
  // Données utilisateur simulées
  const user = {
    username: "gora",
    email: "gora@example.com",
    bio: "Passionné de cinéma 🎬 - Amateur de films d'auteur et de blockbusters. Je partage mes découvertes et coups de cœur cinématographiques.",
    avatar: "https://i.pravatar.cc/150?u=gora",
    memberSince: "Janvier 2023",
    favoriteCount: 32
  };

  // Données films simulées avec URLs TMDB CORRIGÉES
  const movies: Movie[] = [
    { id: 1, title: "Dune: Part Two", description: "Paul Atreides s'allie avec Chani et les Fremen pour venger sa famille.", year: 2024, rating: 4.5, image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg" },
    { id: 2, title: "Oppenheimer", description: "L'histoire du physicien J. Robert Oppenheimer et son rôle dans le développement de la bombe atomique.", year: 2023, rating: 4.8, image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
    { id: 3, title: "Spider-Man: Across the Spider-Verse", description: "Miles Morales traverse le multivers et rencontre une équipe de Spider-People.", year: 2023, rating: 4.7, image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
    { id: 4, title: "The Batman", description: "Batman enquête sur la corruption à Gotham City et affronte le Sphinx.", year: 2022, rating: 4.3, image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
    { id: 5, title: "Top Gun: Maverick", description: "Après plus de trente ans de service, Maverick est confronté à son passé.", year: 2022, rating: 4.6, image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" },
    { id: 6, title: "Avatar: The Way of Water", description: "Jake Sully et Ney'tiri forment une famille sur Pandora et doivent affronter de nouvelles menaces.", year: 2022, rating: 4.2, image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    { id: 7, title: "Everything Everywhere All at Once", description: "Une femme chinoise plonge dans des univers parallèles pour empêcher la destruction de tout.", year: 2022, rating: 4.9, image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg" },
    { id: 8, title: "Black Panther: Wakanda Forever", description: "Le peuple du Wakanda se bat pour protéger sa nation après la mort du roi T'Challa.", year: 2022, rating: 4.1, image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg" },
    { id: 9, title: "The Super Mario Bros. Movie", description: "Mario et Luigi, plombiers de Brooklyn, se retrouvent dans un nouveau monde magique.", year: 2023, rating: 4.0, image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg" },
    { id: 10, title: "John Wick: Chapter 4", description: "John Wick découvre un moyen de vaincre le Haut-Tableau, mais il doit affronter un nouvel ennemi.", year: 2023, rating: 4.4, image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg" },
    { id: 11, title: "Guardians of the Galaxy Vol. 3", description: "Les Gardiens de la Galaxie doivent protéger l'un des leurs et terminer leur mission.", year: 2023, rating: 4.3, image: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg" },
    { id: 12, title: "Barbie", description: "Barbie quitte Barbie Land pour le monde réel à la recherche du bonheur parfait.", year: 2023, rating: 4.2, image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
    { id: 13, title: "Mission: Impossible - Dead Reckoning Part One", description: "Ethan Hunt et son équipe traquent une nouvelle arme terrifiante.", year: 2023, rating: 4.3, image: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg" },
    { id: 14, title: "The Little Mermaid", description: "Ariel, jeune sirène, rêve de découvrir le monde des humains.", year: 2023, rating: 3.9, image: "https://image.tmdb.org/t/p/w500/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg" },
    { id: 15, title: "Ant-Man and the Wasp: Quantumania", description: "Scott Lang et Hope van Dyne explorent le Monde Quantique.", year: 2023, rating: 3.8, image: "https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg" },
    { id: 16, title: "Creed III", description: "Adonis Creed affronte un ami d'enfance devenu rival dans le monde de la boxe.", year: 2023, rating: 4.1, image: "https://image.tmdb.org/t/p/w500/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg" },
    { id: 17, title: "The Flash", description: "Barry Allen utilise ses pouvoirs pour voyager dans le temps et changer le passé.", year: 2023, rating: 3.7, image: "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg" },
    { id: 18, title: "Transformers: Rise of the Beasts", description: "Les Autobots affrontent une nouvelle menace terrifiante venue des étoiles.", year: 2023, rating: 3.9, image: "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg" },
    { id: 19, title: "Fast X", description: "Dom Toretto et sa famille affrontent leur ennemi le plus redoutable.", year: 2023, rating: 3.8, image: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg" },
    { id: 20, title: "The Marvels", description: "Carol Danvers, Monica Rambeau et Kamala Khan unissent leurs forces.", year: 2023, rating: 3.6, image: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg" },
    { id: 21, title: "Wonka", description: "L'histoire du jeune Willy Wonka et comment il est devenu le chocolatier légendaire.", year: 2023, rating: 4.1, image: "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg" },
    { id: 22, title: "Killers of the Flower Moon", description: "Une enquête sur une série de meurtres dans la nation Osage dans les années 1920.", year: 2023, rating: 4.4, image: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg" },
    { id: 23, title: "Napoleon", description: "L'ascension et la chute de l'empereur français Napoléon Bonaparte.", year: 2023, rating: 4.0, image: "https://image.tmdb.org/t/p/w500/jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg" },
    { id: 24, title: "The Hunger Games: The Ballad of Songbirds & Snakes", description: "Coriolanus Snow devient le mentor de Lucy Gray Baird lors de la 10e édition des Hunger Games.", year: 2023, rating: 4.1, image: "https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg" },
    { id: 25, title: "Godzilla Minus One", description: "Le Japon doit affronter Godzilla dans l'immédiat après-guerre.", year: 2023, rating: 4.6, image: "https://image.tmdb.org/t/p/w500/gkseI3CUfQtMKX41XD4AxDzhQb7.jpg" },
    { id: 26, title: "Poor Things", description: "Une jeune femme se réincarne et découvre la vie sous un nouveau jour.", year: 2023, rating: 4.5, image: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg" },
    { id: 27, title: "The Creator", description: "Dans une guerre entre humains et IA, un ancien agent est chargé de tuer le Créateur.", year: 2023, rating: 4.0, image: "https://image.tmdb.org/t/p/w500/vBZ0qvaRxqEhZwl6LWmruJqWE8Z.jpg" },
    { id: 28, title: "Elemental", description: "Dans une ville où les habitants du feu, de l'eau, de la terre et de l'air cohabitent.", year: 2023, rating: 4.0, image: "https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg" },
    { id: 29, title: "The Killer", description: "Un tueur à gages solitaire commence à avoir une crise psychologique.", year: 2023, rating: 4.2, image: "https://image.tmdb.org/t/p/w500/e7Jvsry47JJQruuezjU2X1Z6J77.jpg" },
    { id: 30, title: "Past Lives", description: "Nora et Hae Sung, amis d'enfance, sont réunis pour une semaine à New York.", year: 2023, rating: 4.5, image: "https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg" }
  ];

  // Composant pour afficher les étoiles de notation avec demi-étoiles
  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => {
          let starClass = "text-gray-600";
          if (star <= Math.floor(rating)) {
            starClass = "text-yellow-400";
          } else if (star === Math.ceil(rating) && rating % 1 >= 0.5) {
            starClass = "text-yellow-400";
          }
          return (
            <svg
              key={star}
              className={`w-4 h-4 ${starClass}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
        <span className="text-gray-400 text-sm ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  // Fonction pour générer un placeholder si l'image ne charge pas
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, movieTitle: string) => {
    const target = e.target as HTMLImageElement;
    // Créer un placeholder avec le titre du film
    target.src = `https://via.placeholder.com/300x400/374151/ffffff?text=${encodeURIComponent(movieTitle)}`;
    target.className = "w-full h-full object-cover bg-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Section Profil Utilisateur */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-600 shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/150/374151/ffffff?text=USER";
                }}
              />
            </div>
            
            {/* Informations utilisateur */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.username}
              </h1>
              <p className="text-gray-300 mb-3">{user.email}</p>
              <p className="text-gray-200 mb-4 leading-relaxed">{user.bio}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Membre depuis {user.memberSince}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {user.favoriteCount} films favoris
                </span>
              </div>
              
              {/* Bouton Modifier le profil */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg">
                Modifier le profil
              </button>
            </div>
          </div>
        </div>

        {/* Section Films Favoris */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Films Favoris <span className="text-orange-400">({movies.length})</span>
          </h2>
          
          {/* Grille de films */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700"
              >
                {/* Image du film avec ratio 3:4 et fallback */}
                <div className="relative h-64">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, movie.title)}
                  />
                </div>
                
                {/* Contenu de la carte */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">
                    {movie.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {movie.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-orange-400 font-semibold">{movie.year}</span>
                    <StarRating rating={movie.rating} />
                  </div>
                  
                  {/* Bouton Voir les détails */}
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm transition duration-200 font-semibold shadow-md hover:shadow-lg">
                    Voir les détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;