// Card de receta (imagen + badge + título + tiempo/dificultad + rating).
// Reutilizable por cualquier feature que necesite listar recetas (landing, búsqueda, etc.).
import StarRating from './StarRating.jsx';
import './_recipe-card.scss';

// Recibe: recipe (ver landingMockData.createMockRecipe para la forma esperada) y
// onClick (handler opcional al hacer click en la card). Devuelve la card completa.
function RecipeCard({ recipe, onClick }) {
  const { title, author, image, rating, reviewsCount, timeMinutes, difficulty, badge } = recipe;

  return (
    <article className="RecipeCard" onClick={onClick}>
      <div className="RecipeCard-imageWrapper">
        <img className="RecipeCard-image" src={image} alt={title} />
        {badge && (
          <span className="RecipeCard-badge">
            <span className="material-symbols-outlined">{badge.icon}</span>
            {badge.label}
          </span>
        )}
        <button
          type="button"
          className="RecipeCard-favoriteButton"
          aria-label="Guardar receta"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>

      <div className="RecipeCard-body">
        <span className="RecipeCard-author">Por {author}</span>
        <h3 className="RecipeCard-title">{title}</h3>

        <div className="RecipeCard-meta">
          <span className="material-symbols-outlined">schedule</span>
          <span>{timeMinutes}m</span>
          <span className="RecipeCard-metaDot" />
          <span className="material-symbols-outlined">signal_cellular_alt</span>
          <span>{difficulty}</span>
        </div>

        <StarRating rating={rating} reviewsCount={reviewsCount} />
      </div>
    </article>
  );
}

export default RecipeCard;
