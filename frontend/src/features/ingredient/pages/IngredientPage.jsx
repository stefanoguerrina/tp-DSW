// Panel de administración de ingredientes.
// Permite listar, crear, editar y eliminar ingredientes globales.
// Al editar, muestra también la gestión de valores nutricionales del ingrediente.
// Solo accesible para admins.
import { useState, useEffect } from 'react';
import {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from '../services/ingredientService.js';
import { getAllIngredientCategories } from '../../ingredientCategory/services/ingredientCategoryService.js';
import NutritionalValuePanel from './NutritionalValuePanel.jsx';
import '../styles/_ingredient-page.scss';

// Formulario para crear o editar un ingrediente.
// Recibe: initialData (null para crear, objeto para editar), categories (lista para el selector),
//         onSubmit, onCancel.
function IngredientForm({ initialData, categories, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [unitOfMeasure, setUnitOfMeasure] = useState(initialData?.unitOfMeasure ?? '');

  // Extrae los IDs de categorías actuales del ingrediente (vienen en ingredientcategoryingredient[])
  const initialCategoryIds = initialData
    ? (initialData.ingredientcategoryingredient ?? []).map((r) => r.idIngredientCategory)
    : [];
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(initialCategoryIds);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Alterna la selección de una categoría en el multiselect.
  const handleToggleCategory = (id) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (selectedCategoryIds.length === 0) {
      setError('Seleccioná al menos una categoría.');
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || undefined,
        unitOfMeasure: unitOfMeasure.trim() || undefined,
        categoryIds: selectedCategoryIds,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="IngredientForm" onSubmit={handleSubmit}>
      <div className="IngredientForm-field">
        <label htmlFor="ingf-name">Nombre *</label>
        <input
          id="ingf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ej: Tomate"
        />
      </div>
      <div className="IngredientForm-field">
        <label htmlFor="ingf-description">Descripción</label>
        <input
          id="ingf-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opcional"
        />
      </div>
      <div className="IngredientForm-field">
        <label htmlFor="ingf-unit">Unidad de medida</label>
        <input
          id="ingf-unit"
          type="text"
          value={unitOfMeasure}
          onChange={(e) => setUnitOfMeasure(e.target.value)}
          placeholder="Ej: gramos, ml, unidad"
        />
      </div>

      <div className="IngredientForm-field">
        <label>Categorías * (seleccioná al menos una)</label>
        <div className="IngredientForm-categoryList">
          {categories.map((cat) => (
            <label key={cat.id} className="IngredientForm-categoryOption">
              <input
                type="checkbox"
                checked={selectedCategoryIds.includes(cat.id)}
                onChange={() => handleToggleCategory(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="IngredientForm-error">⚠ {error}</p>}
      <div className="IngredientForm-actions">
        <button type="submit" disabled={isSubmitting} className="btn btn--primary">
          {isSubmitting ? 'Guardando...' : initialData ? 'Guardar cambios' : 'Crear ingrediente'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn--secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
}

// Página principal del panel de ingredientes.
function IngredientPage() {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // null = sin formulario; 'create' = nuevo; 'edit' = editando
  const [formMode, setFormMode] = useState(null);
  const [editingIngredient, setEditingIngredient] = useState(null);

  // ID del ingrediente cuyo panel de valores nutricionales está abierto.
  const [expandedNutritionalId, setExpandedNutritionalId] = useState(null);

  const [actionError, setActionError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setFetchError('');
    try {
      // Carga en paralelo ingredientes y categorías disponibles para el selector.
      const [ingredientsData, categoriesData] = await Promise.all([
        getAllIngredients().catch((err) => {
          // El backend devuelve 404 cuando no hay ingredientes — no es un error crítico.
          if (err.message.includes('No se encontraron')) return [];
          throw err;
        }),
        getAllIngredientCategories().catch((err) => {
          if (err.message.includes('No se encontraron')) return [];
          throw err;
        }),
      ]);
      setIngredients(ingredientsData);
      setCategories(categoriesData);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (data) => {
    await createIngredient(data);
    setFormMode(null);
    await loadData();
  };

  const handleEdit = (ingredient) => {
    setEditingIngredient(ingredient);
    setFormMode('edit');
    setActionError('');
    setExpandedNutritionalId(null);
  };

  const handleUpdate = async (data) => {
    await updateIngredient(editingIngredient.id, data);
    setFormMode(null);
    setEditingIngredient(null);
    await loadData();
  };

  const handleDelete = async (ingredient) => {
    const confirmed = window.confirm(
      `¿Eliminar el ingrediente "${ingredient.name}"?\nFallará si está en uso en inventarios, recetas o tiene valores nutricionales.`
    );
    if (!confirmed) return;
    setActionError('');
    try {
      await deleteIngredient(ingredient.id);
      await loadData();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleCancelForm = () => {
    setFormMode(null);
    setEditingIngredient(null);
  };

  const handleToggleNutritional = (id) => {
    setExpandedNutritionalId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="IngredientPage">
      <div className="IngredientPage-header">
        <h2>Panel de Administración — Ingredientes</h2>
        <span className="IngredientPage-count">
          {ingredients.length} ingrediente{ingredients.length !== 1 ? 's' : ''}
        </span>
      </div>

      {formMode === null && (
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => { setFormMode('create'); setActionError(''); }}
          id="btnNuevoIngrediente"
        >
          + Nuevo ingrediente
        </button>
      )}

      {formMode === 'create' && (
        <IngredientForm
          initialData={null}
          categories={categories}
          onSubmit={handleCreate}
          onCancel={handleCancelForm}
        />
      )}

      {formMode === 'edit' && editingIngredient && (
        <IngredientForm
          initialData={editingIngredient}
          categories={categories}
          onSubmit={handleUpdate}
          onCancel={handleCancelForm}
        />
      )}

      {actionError && (
        <div className="IngredientPage-alert">⚠ {actionError}</div>
      )}

      {isLoading && <p className="IngredientPage-loading">Cargando ingredientes...</p>}
      {fetchError && <p className="IngredientPage-error">⚠ {fetchError}</p>}

      {!isLoading && !fetchError && ingredients.length === 0 && (
        <p className="IngredientPage-empty">No hay ingredientes creados.</p>
      )}

      {!isLoading && ingredients.length > 0 && (
        <ul className="IngredientPage-list">
          {ingredients.map((ing) => {
            // Extrae los nombres de las categorías para mostrarlos.
            const categoryNames = (ing.ingredientcategoryingredient ?? [])
              .map((r) => r.ingredientcategory?.name)
              .filter(Boolean)
              .join(', ');

            return (
              <li key={ing.id} className="IngredientPage-item">
                <div className="IngredientPage-itemInfo">
                  <span className="IngredientPage-itemName">{ing.name}</span>
                  {ing.unitOfMeasure && (
                    <span className="IngredientPage-itemUnit">({ing.unitOfMeasure})</span>
                  )}
                  {categoryNames && (
                    <span className="IngredientPage-itemCategories">{categoryNames}</span>
                  )}
                  {ing.description && (
                    <span className="IngredientPage-itemDesc">{ing.description}</span>
                  )}
                  <span className="IngredientPage-itemId">ID: {ing.id}</span>
                </div>
                <div className="IngredientPage-itemActions">
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => handleToggleNutritional(ing.id)}
                  >
                    {expandedNutritionalId === ing.id ? 'Ocultar nutrición' : 'Valores nutricionales'}
                  </button>
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => handleEdit(ing)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => handleDelete(ing)}
                  >
                    Eliminar
                  </button>
                </div>

                {/* Panel expandible de valores nutricionales */}
                {expandedNutritionalId === ing.id && (
                  <NutritionalValuePanel idIngredient={ing.id} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default IngredientPage;
