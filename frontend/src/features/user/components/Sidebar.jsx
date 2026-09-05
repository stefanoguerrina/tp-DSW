// Barra de navegación lateral fija, visible en toda página autenticada (home, y las que
// se agreguen después). Recibe: isAdmin, showAdminPanel y onToggleAdminPanel — el ícono
// de configuración solo abre el panel de administración de usuarios para un admin.
import '../styles/_sidebar.scss';

// Accesos todavía sin feature propia: quedan visibles pero inertes hasta que existan.
const PENDING_NAV_LINKS = [
  { icon: 'explore', label: 'Explorar' },
  { icon: 'add_box', label: 'Crear receta' },
  { icon: 'notifications', label: 'Notificaciones' },
];

function Sidebar({ isAdmin, showAdminPanel, onToggleAdminPanel }) {
  return (
    <aside className="Sidebar">
      <a className="Sidebar-logo" href="#top" title="Chefcito">
        <span className="material-symbols-outlined">restaurant_menu</span>
      </a>

      <nav className="Sidebar-nav">
        <button type="button" className="Sidebar-link Sidebar-link--active" title="Inicio">
          <span className="material-symbols-outlined">home</span>
          <span className="Sidebar-tooltip">Inicio</span>
        </button>

        {/* TODO: conectar con las futuras features de exploración, creación de recetas y notificaciones. */}
        {PENDING_NAV_LINKS.map((link) => (
          <button key={link.icon} type="button" className="Sidebar-link" title={link.label}>
            <span className="material-symbols-outlined">{link.icon}</span>
            <span className="Sidebar-tooltip">{link.label}</span>
          </button>
        ))}

        <button type="button" className="Sidebar-link" title="Perfil">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="Sidebar-tooltip">Perfil</span>
        </button>

        <button
          type="button"
          className={`Sidebar-link${showAdminPanel ? ' Sidebar-link--active' : ''}`}
          title={isAdmin ? 'Administración' : 'Configuración'}
          // Solo un admin puede abrir el panel de administración de usuarios; para el
          // resto todavía no existe una página de configuración propia.
          onClick={isAdmin ? onToggleAdminPanel : undefined}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="Sidebar-tooltip">{isAdmin ? 'Administración' : 'Configuración'}</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
