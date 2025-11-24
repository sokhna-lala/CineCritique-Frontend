import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        setError(data.message || 'Email ou mot de passe incorrect.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full space-y-8">

        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Accédez à votre espace personnel
          </p>
        </div>

        <form
          className="mt-8 space-y-6 
            bg-gray-900 p-8 rounded-2xl shadow-xl 
            border border-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">

            {error && (
              <div className="text-red-400 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 
                  bg-gray-800 text-white 
                  placeholder-gray-400 
                  border border-gray-700 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="exemple@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 
                  bg-gray-800 text-white 
                  placeholder-gray-400 
                  border border-gray-700 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre mot de passe"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium transition
              ${isFormValid && !loading
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                : 'bg-gray-600 cursor-not-allowed'}
            `}
          >
            {loading ? 'Connexion...' : 'connectez-vous'}
          </button>

          <div className="text-center mt-2">
            <span className="text-gray-300">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                S'inscrire
              </Link>
            </span>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;
