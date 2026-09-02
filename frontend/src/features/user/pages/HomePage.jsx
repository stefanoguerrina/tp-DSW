// Home page — vista principal que se muestra tras un login exitoso.
// Compone el layout autenticado (sidebar fija) y, solo para un admin, permite alternar
// entre el contenido normal de la home y el panel de administración de usuarios.
import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import HomeFeatureCards from '../components/HomeFeatureCards.jsx';
import RecipeCarouselSection from '../components/RecipeCarouselSection.jsx';
import SearchUsersForm from '../components/SearchUsersForm.jsx';
import { quickRecipes, trendingRecipes, veganRecipes } from '../models/homeMockData.js';
import '../styles/_home-page.scss';

// Recibe: isAdmin (habilita el panel de administración de usuarios en la sidebar).
function HomePage({ isAdmin }) {
  // Solo tiene efecto para un admin: alterna entre la home normal y el panel de usuarios.
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const handleToggleAdminPanel = () => setShowAdminPanel((prev) => !prev);

  return (
    <div className="HomePage">
      <Sidebar isAdmin={isAdmin} showAdminPanel={showAdminPanel} onToggleAdminPanel={handleToggleAdminPanel} />

      <div className="HomePage-content">
        <main className="HomePage-main">
          {isAdmin && showAdminPanel ? (
            <SearchUsersForm />
          ) : (
            <>
              <HomeFeatureCards />

              <p className="HomePage-subtitle">Descubrí nuevas ideas para tu cocina hoy</p>
              <hr className="HomePage-divider" />

              <RecipeCarouselSection title="Recetas en menos de 20 minutos" recipes={quickRecipes} />
              <RecipeCarouselSection title="Las más usadas de la semana" recipes={trendingRecipes} />
              <RecipeCarouselSection title="Mejores veganas" recipes={veganRecipes} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
