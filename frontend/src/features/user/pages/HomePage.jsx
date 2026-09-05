// Home page — vista principal que se muestra tras un login exitoso.
// Compone el layout autenticado (sidebar fija) y, solo para un admin, permite alternar
// entre el contenido normal de la home y los paneles de administración.
import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import HomeFeatureCards from '../../recipe/components/HomeFeatureCards.jsx';
import RecipeCarouselSection from '../../recipe/components/RecipeCarouselSection.jsx';
import SearchUsersForm from '../components/SearchUsersForm.jsx';
import RolePage from '../../role/pages/RolePage.jsx';
import IngredientCategoryPage from '../../ingredientCategory/pages/IngredientCategoryPage.jsx';
import IngredientPage from '../../ingredient/pages/IngredientPage.jsx';
import { quickRecipes, trendingRecipes, veganRecipes } from '../../recipe/models/homeMockData.js';
import '../styles/_home-page.scss';

// Paneles de admin disponibles. 'null' es la home normal.
const ADMIN_PANELS = {
  users: 'users',
  roles: 'roles',
  ingredientCategories: 'ingredientCategories',
  ingredients: 'ingredients',
};

// Recibe: isAdmin (habilita los paneles de administración en la sidebar).
function HomePage({ isAdmin }) {
  // Panel admin activo: null = home normal, o una clave de ADMIN_PANELS.
  const [activeAdminPanel, setActiveAdminPanel] = useState(null);

  // Alterna un panel: si ya está activo lo cierra, si no lo abre.
  const handleTogglePanel = (panel) => {
    setActiveAdminPanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <div className="HomePage">
      <Sidebar
        isAdmin={isAdmin}
        activeAdminPanel={activeAdminPanel}
        onTogglePanel={handleTogglePanel}
      />

      <div className="HomePage-content">
        <main className="HomePage-main">
          {isAdmin && activeAdminPanel === ADMIN_PANELS.users && (
            <SearchUsersForm />
          )}

          {isAdmin && activeAdminPanel === ADMIN_PANELS.roles && (
            <RolePage />
          )}

          {isAdmin && activeAdminPanel === ADMIN_PANELS.ingredientCategories && (
            <IngredientCategoryPage />
          )}

          {isAdmin && activeAdminPanel === ADMIN_PANELS.ingredients && (
            <IngredientPage />
          )}

          {/* Vista normal de la home cuando no hay panel admin activo */}
          {(!isAdmin || activeAdminPanel === null) && (
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
