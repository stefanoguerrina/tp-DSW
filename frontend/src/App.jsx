<<<<<<< Updated upstream
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

=======
import { useState } from 'react';
import Auth from './pages/auth/index'

function App() {

    const [isAppLoggedIn, setIsAppLoggedIn] = useState(false);

    const handleLoginExitoso = () => {
        setIsAppLoggedIn(true);
    };

    return (
        <div className="App">
            {!isAppLoggedIn ? (
                <Auth onLoginSuccess={handleLoginExitoso} />
            ) : (
                <h1>llamar al home</h1>
            )}
        </div>
    );
}
>>>>>>> Stashed changes
export default App;