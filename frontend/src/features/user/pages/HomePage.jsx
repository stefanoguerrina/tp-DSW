// Home page — main view displayed after a successful login.
// Receives isAdmin prop to conditionally show the administrator panel.
import SearchUsersForm from '../components/SearchUsersForm.jsx';

function HomePage({ isAdmin }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>¡Bienvenido a Chefcito! 🍳</h1>
      <p>Esta es la página principal del Frontend.</p>

      {/* Admin-only section: user management panel */}
      {isAdmin && <SearchUsersForm />}

      {/* Shown to regular (non-admin) users instead of the panel */}
      {!isAdmin && (
        <p style={{ marginTop: '20px', color: 'var(--text)' }}>
          Iniciaste sesión correctamente. ¡Explorá las recetas!
        </p>
      )}
    </div>
  );
}

export default HomePage;
