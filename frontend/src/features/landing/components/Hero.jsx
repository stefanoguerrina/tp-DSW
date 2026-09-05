// Sección hero de la landing: título, bajada, CTA y collage flotante de imágenes.
import '../styles/_hero.scss';

function Hero() {
  // Baja suavemente hasta la sección de categorías/recetas.
  const handleExploreClick = () => {
    document.getElementById('explorar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="Hero" id="top">
      <div className="Hero-text">
        <h1>Crea la vida que te encanta en la cocina</h1>
        <p>
          Descubre ideas para tus comidas diarias. Desde cenas rápidas hasta postres
          elaborados, encontrá tu próxima receta favorita y compartí las tuyas.
        </p>
        <button type="button" className="Hero-cta" onClick={handleExploreClick}>
          Explorar recetas
        </button>
      </div>

      <div className="Hero-collage">
        <div className="Hero-image Hero-image--main">
          <img src="https://picsum.photos/seed/chefcito-hero-1/500/500" alt="Plato preparado en Chefcito" />
        </div>
        <div className="Hero-image Hero-image--secondary">
          <img
            src="https://picsum.photos/seed/chefcito-hero-2/400/400"
            alt="Postre casero"
          />
        </div>
        <div className="Hero-image Hero-image--tertiary">
          <img
            src="https://picsum.photos/seed/chefcito-hero-3/400/400"
            alt="Ensalada fresca"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
