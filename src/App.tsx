import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import PageAccueil from "./pages/PageAccueil";
import Login from "./pages/login";
import Register from "./pages/register";
<<<<<<< HEAD
import TopRated from "./pages/TopRated";
import Profile from "./pages/profile"; // <-- nouvelle page Profil utilisateur
=======
import Films from "./pages/Films";
import MovieDetail from "./pages/MovieDetail";
>>>>>>> page-films

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<PageAccueil />} />

        {/* Page de connexion */}
        <Route path="/connexion" element={<Login />} />

        {/* Redirection de /login vers /connexion */}
        <Route path="/login" element={<Navigate to="/connexion" replace />} />

        {/* Page d'inscription */}
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD

        {/* Top Rated */}
        <Route path="/top-rated" element={<TopRated />} />

        {/* Profil utilisateur */}
        <Route path="/profile/:username" element={<Profile />} />
=======
        <Route path="/films" element={<Films />} />
        <Route path="/films/:id" element={<MovieDetail />} />
>>>>>>> page-films
      </Routes>
    </>
  );
}
