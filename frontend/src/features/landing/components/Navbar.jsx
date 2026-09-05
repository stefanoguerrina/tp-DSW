// Barra de navegación superior de la landing: logo, buscador (decorativo por ahora,
// no hay feature de búsqueda de recetas todavía) y accesos a login/registro.
import '../styles/_navbar.scss';

// Recibe: onLoginClick y onRegisterClick, los handlers de useAuth que muestran cada form.
function Navbar({ onLoginClick, onRegisterClick }) {
  return (
    <header className="Navbar">
      <div className="Navbar-content">
        {/* Agrupados en un solo item de grid para que la barra de búsqueda pueda quedar
            centrada en la columna del medio, sin importar cuánto midan logo+links. */}
        <div className="Navbar-start">
          <a className="Navbar-logo" href="#top">
            <span className="material-symbols-outlined">restaurant_menu</span>
            Chefcito
          </a>

          <nav className="Navbar-links">
            <a href="#explorar">Explorar</a>
          </nav>
        </div>

        {/* TODO: conectar con la futura feature de búsqueda de recetas. */}
        <form
          className="Navbar-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Busca ideas, recetas, ingredientes..." />
        </form>

        <div className="Navbar-actions">
          <button type="button" className="Navbar-loginButton" onClick={onLoginClick}>
            Iniciar sesión
          </button>
          <button type="button" className="Navbar-registerButton" onClick={onRegisterClick}>
            Registrarse
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
