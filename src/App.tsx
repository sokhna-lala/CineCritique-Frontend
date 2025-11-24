import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PageAccueil from "./pages/PageAccueil";
import Login from "./pages/login";
import Register from "./pages/register";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
