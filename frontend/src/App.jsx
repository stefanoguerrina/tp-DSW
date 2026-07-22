// Main application component managing authentication state and route navigation.
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home.jsx';
import Auth from './views/auth/index';

function App() {
  const [isAppLoggedIn, setIsAppLoggedIn] = useState(false);

  // Updates authentication state when a user successfully logs in.
  const handleSuccessfulLogin = () => {
    setIsAppLoggedIn(true);
  };

  return (
    <div className="App">
      {!isAppLoggedIn ? (
        <Auth onLoginSuccess={handleSuccessfulLogin} />
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Main route of the Frontend */}
            <Route path="/" element={<Home />} />

            {/* Space reserved for future pages (e.g., Register, Login, etc.) */}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;