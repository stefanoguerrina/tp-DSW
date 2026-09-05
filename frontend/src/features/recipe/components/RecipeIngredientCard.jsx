// Tarjeta de un ingrediente de receta dentro del wizard (Etapa 2). Antes de
// elegir un ingrediente muestra una barra de búsqueda sobre el catálogo ya
// cargado; una vez elegido, muestra su nombre y pide la cantidad, aclarando
// la unidad de medida propia de ese ingrediente (no se guarda una unidad
// aparte por receta: es la que ya tiene el ingrediente en el catálogo).
import { useState } from 'react';
import '../styles/_recipe-editor-page.scss';

const MAX_SEARCH_RESULTS = 8;

// Recibe: item ({ idIngredient, quantity }), index, ingredientsCatalog (array
// completo de ingredientes disponibles), excludedIngredientIds (Set de ids ya
// elegidos en OTRAS tarjetas, para no poder duplicarlos), canDelete, onChange
// (campos modificados), onDelete. Devuelve la tarjeta completa.
function RecipeIngredientCard({ item, index, ingredientsCatalog, excludedIngredientIds, canDelete, onChange, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  const selectedIngredient = ingredientsCatalog.find((ing) => String(ing.id) === item.idIngredient);

  const searchResults = searchTerm.trim()
    ? ingredientsCatalog
        .filter((ing) => !excludedIngredientIds.has(ing.id))
        .filter((ing) => ing.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
        .slice(0, MAX_SEARCH_RESULTS)
    : [];

  const handleSelect = (ingredient) => {
    onChange({ idIngredient: String(ingredient.id) });
    setSearchTerm('');
  };

  const handleChangeIngredient = () => {
    onChange({ idIngredient: '', quantity: '' });
    setSearchTerm('');
  };

  return (
    <div className="RecipeIngredientCard">
      <div className="RecipeIngredientCard-header">
        <span className="RecipeIngredientCard-number">{index + 1}</span>
        <button
          type="button"
          className="RecipeIngredientCard-deleteButton"
          title={canDelete ? 'Eliminar este ingrediente' : 'La receta debe tener al menos un ingrediente'}
          disabled={!canDelete}
          onClick={onDelete}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      {selectedIngredient ? (
        <div className="RecipeIngredientCard-selected">
          <span className="material-symbols-outlined">nutrition</span>
          <span className="RecipeIngredientCard-selectedName">{selectedIngredient.name}</span>
          <button type="button" className="RecipeIngredientCard-changeButton" onClick={handleChangeIngredient}>
            Cambiar
          </button>
        </div>
      ) : (
        <div className="RecipeIngredientCard-field">
          <label htmlFor={`ingredient-search-${index}`}>Buscar ingrediente *</label>
          <div className="RecipeIngredientCard-searchWrapper">
            <span className="material-symbols-outlined">search</span>
            <input
              id={`ingredient-search-${index}`}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ej: Tomate, harina, pollo..."
              autoComplete="off"
            />
          </div>
          {searchTerm.trim() && (
            <ul className="RecipeIngredientCard-searchResults">
              {searchResults.length === 0 && (
                <li className="RecipeIngredientCard-searchEmpty">No se encontraron ingredientes.</li>
              )}
              {searchResults.map((ing) => (
                <li key={ing.id}>
                  <button type="button" onClick={() => handleSelect(ing)}>
                    {ing.name}
                    {ing.unitOfMeasure && <span> ({ing.unitOfMeasure})</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="RecipeIngredientCard-field RecipeIngredientCard-field--inline">
        <span className="material-symbols-outlined">scale</span>
        <div>
          <label htmlFor={`ingredient-quantity-${index}`}>
            Cantidad requerida{selectedIngredient?.unitOfMeasure ? ` (${selectedIngredient.unitOfMeasure})` : ''}
          </label>
          <input
            id={`ingredient-quantity-${index}`}
            type="number"
            min="0.01"
            step="0.01"
            value={item.quantity}
            onChange={(e) => onChange({ quantity: e.target.value })}
            placeholder="ej. 500"
            disabled={!selectedIngredient}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeIngredientCard;
