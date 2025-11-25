import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import PageAccueil from "./pages/PageAccueil";
import Login from "./pages/login";
import Register from "./pages/register";
import TopRated from "./pages/TopRated";
import Profile from "./pages/profile";
import Films from "./pages/Films";
import MovieDetail from "./pages/MovieDetail";

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

        {/* Top Rated */}
        <Route path="/top-rated" element={<TopRated />} />
        <Route
          path="/classements"
          element={<Navigate to="/top-rated" replace />}
        />

        {/* Profil utilisateur */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profil" element={<Navigate to="/profile" replace />} />

        {/* Films */}
        <Route path="/films" element={<Films />} />
        <Route path="/films/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}
