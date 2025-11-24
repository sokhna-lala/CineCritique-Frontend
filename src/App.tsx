import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import TopRated from "./pages/TopRated"; // <-- import ici

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/top-rated" element={<TopRated />} /> {/* <-- nouvelle route */}
    </Routes>
  );
}

export default App;
