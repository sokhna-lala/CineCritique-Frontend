import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-black text-white px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        Cine<span className="text-orange-500">Critique</span>
      </h1>

      <nav className="flex gap-6 text-sm">
        <Link to="/" className="text-orange-500">
          accueil
        </Link>
        <Link to="/films" className="hover:text-orange-500">
          films
        </Link>
        <Link to="/top-rated" className="hover:text-orange-500">
          classements
        </Link>
        <Link to="/profil" className="hover:text-orange-500">
          profil
        </Link>
        <Link to="/connexion" className="hover:text-orange-500">
          connexion
        </Link>
      </nav>
    </header>
  );
};

export default Header;
