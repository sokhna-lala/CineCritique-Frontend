import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  fullName: string;
  avatar: string;
  email: string;
  bio: string;
  joinDate: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    bio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Charger l'utilisateur connecté depuis localStorage
  useEffect(() => {
    const loadCurrentUser = () => {
      const savedUsers = localStorage.getItem('cinecritique_users');
      if (savedUsers) {
        const users: User[] = JSON.parse(savedUsers);
        // Simuler que "gora" est l'utilisateur connecté
        const user = users.find(u => u.username === "gora");
        if (user) {
          setCurrentUser(user);
          setFormData({
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            bio: user.bio
          });
          return;
        }
      }
      
      // Fallback si pas trouvé
      const fallbackUser: User = {
        username: "gora",
        fullName: "Gora Leye",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        email: "gora@example.com",
        bio: "Passionné de cinéma d'auteur et de films africains. Critique amateur depuis 5 ans.",
        joinDate: "2023-01-15"
      };
      setCurrentUser(fallbackUser);
      setFormData({
        username: fallbackUser.username,
        fullName: fallbackUser.fullName,
        email: fallbackUser.email,
        bio: fallbackUser.bio
      });
    };

    loadCurrentUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validation
    if (!formData.username.trim() || !formData.fullName.trim() || !formData.email.trim()) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs obligatoires.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Récupérer les utilisateurs actuels
      const savedUsers = localStorage.getItem('cinecritique_users');
      if (!savedUsers) throw new Error('Aucune donnée utilisateur trouvée');

      const users: User[] = JSON.parse(savedUsers);
      
      // Vérifier si le username existe déjà (sauf pour l'utilisateur actuel)
      const usernameExists = users.some(user => 
        user.username === formData.username && user.username !== currentUser?.username
      );

      if (usernameExists) {
        setMessage({ type: 'error', text: 'Ce nom d\'utilisateur est déjà pris.' });
        setIsSubmitting(false);
        return;
      }

      // Mettre à jour l'utilisateur
      const updatedUsers = users.map(user => 
        user.username === currentUser?.username 
          ? { ...user, ...formData }
          : user
      );

      // Sauvegarder dans localStorage
      localStorage.setItem('cinecritique_users', JSON.stringify(updatedUsers));
      
      setMessage({ 
        type: 'success', 
        text: 'Profil mis à jour avec succès ! Redirection...' 
      });

      // Redirection après un court délai
      setTimeout(() => {
        navigate(`/profile/${formData.username}`);
      }, 1500);

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Erreur lors de la mise à jour du profil. Veuillez réessayer.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Modifier le profil
          </h1>
          <p className="text-gray-400 text-lg">
            Personnalisez votre profil et vos informations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              
              <div className="flex flex-col items-center mb-8">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-lg"
                />
                <p className="text-gray-400 text-sm mt-3">
                  Photo de profil (bientôt modifiable)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-semibold mb-2">
                    Nom d'utilisateur *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="mb-8">
                <label htmlFor="bio" className="block text-sm font-semibold mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Parlez-nous de vous, de vos goûts cinématographiques..."
                />
                <p className="text-gray-400 text-sm mt-2">
                  {formData.bio.length}/500 caractères
                </p>
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  message.type === 'success' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      Enregistrer les modifications
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors border border-gray-600"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-6">Conseils</h3>
              
              <div className="space-y-4 text-sm text-gray-300">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-orange-400 mb-1">📝 Votre bio</h4>
                  <p>Partagez vos goûts cinématographiques pour aider les autres à vous découvrir.</p>
                </div>
                
                <div className="p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-1">👤 Nom d'utilisateur</h4>
                  <p>Choisissez un nom unique et facile à retenir.</p>
                </div>
                
                <div className="p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-1">✉️ Email</h4>
                  <p>Utilisez une adresse valide pour recevoir les notifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;