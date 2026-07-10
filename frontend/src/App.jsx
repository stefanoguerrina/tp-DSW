import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal del Frontend */}
        <Route path="/" element={<Home />} />
        
        {/* Espacio reservado para futuras páginas (Ej: Registro, Login, etc) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;