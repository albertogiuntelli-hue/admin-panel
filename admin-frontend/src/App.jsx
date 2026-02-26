import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Prodotti from "./pages/Prodotti.jsx";
import Categorie from "./pages/Categorie.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/prodotti" />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/categorie" element={<Categorie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
