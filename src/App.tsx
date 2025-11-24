import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || "Impossible de créer un compte.");
      }
    } catch (err) {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const isValid =
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white">
            Créer un compte
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Rejoignez la communauté CinéCritique
          </p>
        </div>

        <form
          className="mt-8 space-y-6 bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">

            {error && (
              <div className="text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Votre pseudo
              </label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 text-white 
                  border border-gray-700 rounded-md placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre pseudo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Adresse email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 text-white 
                border border-gray-700 rounded-md placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Mot de passe (minimum 8 caractères)
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 text-white 
                border border-gray-700 rounded-md placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Confirmer le mot de passe
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 text-white 
                border border-gray-700 rounded-md placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium
            ${isValid && !loading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'}
            `}
          >
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>

          <div className="text-center">
            <span className="text-gray-300">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                Se connecter
              </Link>
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;
