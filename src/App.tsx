import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PageAccueil from "./pages/PageAccueil";
import Login from "./pages/login";
import Register from "./pages/register";
import Films from "./pages/Films";
import MovieDetail from "./pages/MovieDetail";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}
