import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import PageAccueil from "./pages/PageAccueil";
import Login from "./pages/login";
import Register from "./pages/register";
import TopRated from "./pages/TopRated";
import Profile from "./pages/profile"; // <-- nouvelle page Profil utilisateur

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

        {/* Profil utilisateur */}
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </>
  );
}
