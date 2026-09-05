// Sección "Receta de la semana": una receta destacada + un ranking corto de otras.
import RecipeListItem from '../../../core/components/RecipeListItem.jsx';
import StarRating from '../../../core/components/StarRating.jsx';
import { useScrollReveal } from '../../../core/hooks/useScrollReveal.js';
import { weeklyRecipe, moreFeaturedRecipes } from '../models/landingMockData.js';
import '../styles/_weekly-recipe.scss';

// Recibe: onViewRecipeClick, invocado al querer ver el detalle de una receta.
// Como todavía no existe la página de detalle, abre el modal "necesitás una cuenta"
// (ver LandingPage).
function WeeklyRecipe({ onViewRecipeClick }) {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="WeeklyRecipe scroll-animate" id="receta-semana">
      <h2 className="WeeklyRecipe-heading">Receta de la semana</h2>

      <div className="WeeklyRecipe-grid">
        <article className="WeeklyRecipe-featured">
          <div className="WeeklyRecipe-featuredImage">
            <img src={weeklyRecipe.image} alt={weeklyRecipe.title} />
          </div>
          <div className="WeeklyRecipe-featuredInfo">
            <StarRating rating={weeklyRecipe.rating} reviewsCount={weeklyRecipe.reviewsCount} />
            <h3>{weeklyRecipe.title}</h3>
            <p className="WeeklyRecipe-author">por {weeklyRecipe.author}</p>

            <div className="WeeklyRecipe-statsGrid">
              <div>
                <p className="WeeklyRecipe-statLabel">Tiempo</p>
                <p className="WeeklyRecipe-statValue">{weeklyRecipe.timeMinutes} min</p>
              </div>
              <div>
                <p className="WeeklyRecipe-statLabel">Categoría</p>
                <p className="WeeklyRecipe-statValue">{weeklyRecipe.difficulty}</p>
              </div>
              <div>
                <p className="WeeklyRecipe-statLabel">Porciones</p>
                <p className="WeeklyRecipe-statValue">{weeklyRecipe.servings}</p>
              </div>
              <div>
                <p className="WeeklyRecipe-statLabel">Ingredientes</p>
                <p className="WeeklyRecipe-statValue">{weeklyRecipe.ingredientsCount}</p>
              </div>
            </div>

            <button type="button" className="WeeklyRecipe-viewButton" onClick={onViewRecipeClick}>
              Ver receta
            </button>
          </div>
        </article>

        <div className="WeeklyRecipe-list">
          <h3 className="WeeklyRecipe-listHeading">Más recetas destacadas</h3>
          <div className="WeeklyRecipe-listItems">
            {moreFeaturedRecipes.map((recipe, index) => (
              <RecipeListItem
                key={recipe.id}
                recipe={recipe}
                position={index + 2}
                onClick={onViewRecipeClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeeklyRecipe;
