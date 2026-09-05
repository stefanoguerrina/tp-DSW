// Sección de comunidad: usuarios más activos + últimos comentarios de recetas.
import StarRating from '../../../core/components/StarRating.jsx';
import { useScrollReveal } from '../../../core/hooks/useScrollReveal.js';
import { activeUsers, latestComments } from '../models/landingMockData.js';
import '../styles/_community-section.scss';

// Recibe: onSeeMoreClick, disparado por los botones "ver más" (todavía no hay
// páginas de ranking de usuarios ni de comentarios completas).
function CommunitySection({ onSeeMoreClick }) {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="CommunitySection scroll-animate">
      <div className="CommunitySection-grid">
        <div className="CommunitySection-users">
          <h3>Usuarios más activos</h3>
          <div className="CommunitySection-usersList">
            {activeUsers.map((user) => (
              <div key={user.id} className="CommunitySection-user">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="CommunitySection-userAvatar" />
                ) : (
                  <span className="material-symbols-outlined CommunitySection-userPlaceholder">
                    person
                  </span>
                )}
                <span>{user.username}</span>
              </div>
            ))}
          </div>
          <button type="button" className="CommunitySection-link" onClick={onSeeMoreClick}>
            Ver ranking completo
          </button>
        </div>

        <div className="CommunitySection-comments">
          <h3>Últimos comentarios</h3>
          <div className="CommunitySection-commentsList">
            {latestComments.map((comment) => (
              <div key={comment.id} className="CommunitySection-comment">
                <img
                  src={comment.recipeImage}
                  alt={comment.recipeTitle}
                  className="CommunitySection-commentImage"
                />
                <div className="CommunitySection-commentInfo">
                  <StarRating rating={comment.rating} />
                  <h4>{comment.recipeTitle}</h4>
                  <p>
                    por <span>{comment.recipeAuthor}</span>
                  </p>
                </div>
                <div className="CommunitySection-commentQuote">
                  <span className="material-symbols-outlined">format_quote</span>
                  <p>&ldquo;{comment.text}&rdquo;</p>
                  <p className="CommunitySection-commenter">— {comment.commenter}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="CommunitySection-commentsFooter">
            <button type="button" className="CommunitySection-outlineButton" onClick={onSeeMoreClick}>
              Ver más comentarios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;
