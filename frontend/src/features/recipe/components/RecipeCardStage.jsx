// Etapa 1 del wizard de receta: datos base + previsualización en vivo usando el
// mismo componente RecipeCard que ve el resto de la comunidad (core/components),
// para no duplicar el markup de la tarjeta en dos lugares distintos.
import RecipeCard from '../../../core/components/RecipeCard.jsx';
import { RECIPE_DIFFICULTIES, RECIPE_PLACEHOLDER_IMAGE } from '../models/recipeModel.js';

const MAX_COVER_IMAGE_BYTES = 5 * 1024 * 1024;

// Recibe: values ({ name, description, preparationTime, difficulty, categoryId,
// coverImagePreview }), categories (para el selector), authorUsername (solo
// lectura, sale del usuario logueado), onFieldChange (campo, valor), onCoverImageSelect
// (recibe el File elegido), onContinue (botón "confirmar y continuar").
function RecipeCardStage({
  values,
  categories,
  authorUsername,
  onFieldChange,
  onCoverImageSelect,
  onContinue,
}) {
  const previewCategoryName = categories.find((c) => String(c.id) === values.categoryId)?.name;

  const handleCoverImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_COVER_IMAGE_BYTES) {
      window.alert('La foto no puede superar los 5 MB.');
      event.target.value = '';
      return;
    }
    onCoverImageSelect(file);
  };

  return (
    <section className="RecipeCardStage">
      <div className="RecipeCardStage-form">
        <div className="RecipeCardStage-formHeader">
          <span className="RecipeCardStage-eyebrow">Etapa 1</span>
          <h2>Configurá la tarjeta visual</h2>
        </div>

        <div className="RecipeCardStage-field">
          <label htmlFor="recf-name">Título del plato *</label>
          <input
            id="recf-name"
            type="text"
            value={values.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            placeholder="Ej: Bowl Mediterráneo de Quinoa"
            required
          />
        </div>

        <div className="RecipeCardStage-row">
          <div className="RecipeCardStage-field">
            <label htmlFor="recf-category">Etiqueta / Categoría</label>
            <select
              id="recf-category"
              value={values.categoryId}
              onChange={(e) => onFieldChange('categoryId', e.target.value)}
            >
              <option value="">Sin categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="RecipeCardStage-field">
            <label>Cocinero/a</label>
            <input type="text" value={`@${authorUsername}`} disabled />
          </div>
        </div>

        <div className="RecipeCardStage-field">
          <label>Fotografía de portada</label>
          <label className="RecipeCardStage-dropzone" htmlFor="recf-cover">
            <span className="material-symbols-outlined">cloud_upload</span>
            <p><span>Subí una foto</span> o arrastrala acá</p>
            <span className="RecipeCardStage-dropzoneHint">JPG, PNG o WEBP (máx. 5 MB)</span>
            <input id="recf-cover" type="file" accept="image/*" onChange={handleCoverImageChange} />
          </label>
        </div>

        <div className="RecipeCardStage-field">
          <label htmlFor="recf-description">Descripción</label>
          <textarea
            id="recf-description"
            value={values.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="Opcional"
            rows={2}
          />
        </div>

        <div className="RecipeCardStage-row RecipeCardStage-row--three">
          <div className="RecipeCardStage-field">
            <label htmlFor="recf-time">Tiempo (min)</label>
            <input
              id="recf-time"
              type="number"
              min="1"
              value={values.preparationTime}
              onChange={(e) => onFieldChange('preparationTime', e.target.value)}
              placeholder="25"
            />
          </div>
          <div className="RecipeCardStage-field">
            <label htmlFor="recf-difficulty">Dificultad</label>
            <select
              id="recf-difficulty"
              value={values.difficulty}
              onChange={(e) => onFieldChange('difficulty', e.target.value)}
            >
              <option value="">Sin definir</option>
              {RECIPE_DIFFICULTIES.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="RecipeCardStage-actions">
          <button type="button" className="btn btn--primary" onClick={onContinue}>
            Confirmar tarjeta y continuar a los ingredientes
            <span className="material-symbols-outlined">arrow_downward</span>
          </button>
        </div>
      </div>

      <div className="RecipeCardStage-preview">
        <RecipeCard
          recipe={{
            title: values.name.trim() || 'Título de tu receta',
            author: authorUsername,
            image: values.coverImagePreview || RECIPE_PLACEHOLDER_IMAGE,
            rating: 0,
            reviewsCount: 0,
            timeMinutes: values.preparationTime || '—',
            difficulty: values.difficulty || 'Sin definir',
            badge: previewCategoryName ? { label: previewCategoryName, icon: 'sell' } : null,
          }}
        />
        <p className="RecipeCardStage-previewNote">
          Previsualización en vivo: así van a ver tu receta los demás cocineros en el explorador.
        </p>
      </div>
    </section>
  );
}

export default RecipeCardStage;
