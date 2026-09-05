// Etapa 2 del wizard de receta: ingredientes requeridos, elegidos por búsqueda
// sobre el catálogo ya cargado, con la cantidad y unidad de medida de cada uno.
import { useState } from 'react';
import RecipeIngredientCard from './RecipeIngredientCard.jsx';
import ConfirmModal from '../../../core/components/ConfirmModal.jsx';

// Recibe: ingredients (array de { idIngredient, quantity }), ingredientsCatalog
// (todos los ingredientes disponibles para elegir), onIngredientsChange (recibe
// el array completo ya modificado), onContinue (botón "confirmar y continuar").
function RecipeIngredientsStage({ ingredients, ingredientsCatalog, onIngredientsChange, onContinue }) {
  // Índice del ingrediente que se está por borrar (null = no hay modal abierto).
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);

  const handleChangeIngredient = (index, patch) => {
    onIngredientsChange(ingredients.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const handleConfirmDelete = () => {
    onIngredientsChange(ingredients.filter((_, i) => i !== pendingDeleteIndex));
    setPendingDeleteIndex(null);
  };

  const handleAddIngredient = () => {
    onIngredientsChange([...ingredients, { idIngredient: '', quantity: '' }]);
  };

  return (
    <section className="RecipeIngredientsStage" id="section-etapa-ingredientes">
      <div className="RecipeIngredientsStage-header">
        <div>
          <span className="RecipeIngredientsStage-eyebrow">Etapa 2</span>
          <h2>Ingredientes de la receta</h2>
          <p>Buscá cada ingrediente en el catálogo y contá cuánto hace falta.</p>
        </div>
        {/* Mientras no haya catálogo no se está editando ninguna fila real todavía
            (el array interno arranca con un placeholder vacío para el formulario),
            así que el contador solo tiene sentido cuando sí hay algo para elegir. */}
        {ingredientsCatalog.length > 0 && (
          <span className="RecipeIngredientsStage-counter">
            {ingredients.length} {ingredients.length === 1 ? 'ingrediente agregado' : 'ingredientes agregados'}
          </span>
        )}
      </div>

      {ingredientsCatalog.length === 0 ? (
        <p className="RecipeIngredientsStage-empty">
          Todavía no hay ingredientes cargados en el catálogo. Pedile a un administrador que cargue algunos
          para poder agregarlos a tu receta.
        </p>
      ) : (
        <>
          <div className="RecipeIngredientsStage-list">
            {ingredients.map((item, index) => {
              const excludedIngredientIds = new Set(
                ingredients.filter((_, i) => i !== index).map((other) => Number(other.idIngredient)).filter(Boolean)
              );
              return (
                <RecipeIngredientCard
                  key={index}
                  item={item}
                  index={index}
                  ingredientsCatalog={ingredientsCatalog}
                  excludedIngredientIds={excludedIngredientIds}
                  canDelete={ingredients.length > 1}
                  onChange={(patch) => handleChangeIngredient(index, patch)}
                  onDelete={() => setPendingDeleteIndex(index)}
                />
              );
            })}
          </div>

          <button type="button" className="RecipeIngredientsStage-addButton" onClick={handleAddIngredient}>
            <span className="material-symbols-outlined">add_circle</span>
            + Agregar otro ingrediente
          </button>
        </>
      )}

      <div className="RecipeIngredientsStage-actions">
        <button type="button" className="btn btn--primary" onClick={onContinue}>
          Confirmar ingredientes y continuar a los pasos
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
      </div>

      {pendingDeleteIndex !== null && (
        <ConfirmModal
          title="Eliminar ingrediente"
          message={`¿Eliminar el ingrediente ${pendingDeleteIndex + 1}? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteIndex(null)}
        />
      )}
    </section>
  );
}

export default RecipeIngredientsStage;
