// Sección "Explorar lo mejor de Chefcito": grilla de recetas + categorías.
import RecipeCard from '../../../core/components/RecipeCard.jsx';
import { useScrollReveal } from '../../../core/hooks/useScrollReveal.js';
import { exploreRecipes, categories } from '../models/landingMockData.js';
import '../styles/_explore-section.scss';

// Recibe: onRecipeClick y onSeeMoreClick (ambos abren el modal "necesitás una cuenta":
// todavía no hay página de detalle de receta ni de categoría, ver LandingPage).
function ExploreSection({ onRecipeClick, onSeeMoreClick }) {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="ExploreSection scroll-animate" id="explorar">
      <h2 className="ExploreSection-heading">Explorar lo mejor de Chefcito</h2>

      <div className="ExploreSection-recipeGrid">
        {exploreRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
        ))}
      </div>

      <h3 className="ExploreSection-categoriesHeading">Explorar por categoría</h3>
      <div className="ExploreSection-categoryGrid">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="ExploreSection-categoryPill"
            onClick={onSeeMoreClick}
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div className="ExploreSection-seeMoreWrapper">
        <button type="button" className="ExploreSection-seeMoreButton" onClick={onSeeMoreClick}>
          Ver más
        </button>
      </div>
    </section>
  );
}

export default ExploreSection;
