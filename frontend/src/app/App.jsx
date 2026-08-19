// Main application component managing authentication state and route navigation.
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../features/user/pages/HomePage.jsx';
import AuthPage from '../features/auth/pages/AuthPage.jsx';

function App() {
  const [isAppLoggedIn, setIsAppLoggedIn] = useState(false);
  // Tracks whether the logged-in user has the admin role.
  const [isAdmin, setIsAdmin] = useState(false);

  // Receives adminStatus from useAuth after a successful login.
  const handleSuccessfulLogin = (adminStatus) => {
    setIsAppLoggedIn(true);
    setIsAdmin(adminStatus === true);
  };

  return (
    <div className="App">
      {!isAppLoggedIn ? (
        <AuthPage onLoginSuccess={handleSuccessfulLogin} />
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Main route — passes isAdmin so the page can conditionally render the admin panel */}
            <Route path="/" element={<HomePage isAdmin={isAdmin} />} />

            {/* Space reserved for future pages (e.g., Profile, Recipes, etc.) */}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
