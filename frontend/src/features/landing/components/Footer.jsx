// Pie de página de la landing: logo, copyright y enlaces secundarios.
import '../styles/_footer.scss';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="Footer">
      <div className="Footer-content">
        <div className="Footer-brand">
          <span className="Footer-logo">
            <span className="material-symbols-outlined">restaurant_menu</span>
            Chefcito
          </span>
          <p>© {currentYear} Chefcito — Proyecto académico de Desarrollo de Software.</p>
        </div>

        <nav className="Footer-links">
          <a href="#explorar">Explorar</a>
          <a href="#top">Comunidad</a>
          <a href="#top">Sobre el Proyecto</a>
          <a href="#top">Privacidad</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
