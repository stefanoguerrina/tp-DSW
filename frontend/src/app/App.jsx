// Main application component managing authentication state and route navigation.
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../features/user/pages/HomePage.jsx';
import AuthPage from '../features/auth/pages/AuthPage.jsx';

function App() {
  const [isAppLoggedIn, setIsAppLoggedIn] = useState(false);

  // Updates authentication state when a user successfully logs in.
  const handleSuccessfulLogin = () => {
    setIsAppLoggedIn(true);
  };

  return (
    <div className="App">
      {!isAppLoggedIn ? (
        <AuthPage onLoginSuccess={handleSuccessfulLogin} />
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Main route of the Frontend */}
            <Route path="/" element={<HomePage />} />

            {/* Space reserved for future pages (e.g., Profile, Recipes, etc.) */}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
