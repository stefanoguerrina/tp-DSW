// Fila de estrellas (Material Symbols) + valor numérico, reutilizada por cualquier
// feature que muestre el rating de una receta (recipe cards, comentarios, etc.).
import './_star-rating.scss';

// Recibe: rating (número 0-5) y, opcionalmente, reviewsCount. Devuelve: 5 íconos de
// estrella (llena, media o vacía según corresponda) seguidos del valor y la cantidad
// de reseñas si se pasó.
function StarRating({ rating, reviewsCount }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="StarRating">
      {[1, 2, 3, 4, 5].map((position) => {
        let icon = 'star';
        let filled = false;
        if (position <= fullStars) {
          filled = true;
        } else if (position === fullStars + 1 && hasHalfStar) {
          icon = 'star_half';
          filled = true;
        }
        return (
          <span
            key={position}
            className="material-symbols-outlined StarRating-icon"
            style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {icon}
          </span>
        );
      })}
      <span className="StarRating-value">{rating.toFixed(1)}</span>
      {typeof reviewsCount === 'number' && (
        <span className="StarRating-count">({reviewsCount} reseñas)</span>
      )}
    </div>
  );
}

export default StarRating;
