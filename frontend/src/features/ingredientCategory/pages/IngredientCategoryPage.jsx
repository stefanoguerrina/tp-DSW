// Panel de administración de categorías de ingrediente.
// Permite listar, crear, editar y eliminar categorías. Solo accesible para admins.
import { useState, useEffect } from 'react';
import {
  getAllIngredientCategories,
  createIngredientCategory,
  updateIngredientCategory,
  deleteIngredientCategory,
} from '../services/ingredientCategoryService.js';
import '../styles/_ingredient-category-page.scss';

// Formulario incrustado para crear o editar una categoría.
// Recibe: initialData (null para crear, objeto para editar), onSubmit, onCancel.
function IngredientCategoryForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), description: description.trim() || undefined });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="IngredientCategoryForm" onSubmit={handleSubmit}>
      <div className="IngredientCategoryForm-field">
        <label htmlFor="icf-name">Nombre *</label>
        <input
          id="icf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ej: Lácteos"
        />
      </div>
      <div className="IngredientCategoryForm-field">
        <label htmlFor="icf-description">Descripción</label>
        <input
          id="icf-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opcional"
        />
      </div>
      {error && <p className="IngredientCategoryForm-error">⚠ {error}</p>}
      <div className="IngredientCategoryForm-actions">
        <button type="submit" disabled={isSubmitting} className="btn btn--primary">
          {isSubmitting ? 'Guardando...' : initialData ? 'Guardar cambios' : 'Crear categoría'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn--secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
}

// Página principal del panel de categorías de ingrediente.
function IngredientCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // null = sin formulario; 'create' = nuevo; número = editando ese ID
  const [formMode, setFormMode] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [actionError, setActionError] = useState('');

  // Carga inicial de categorías.
  const loadCategories = async () => {
    setIsLoading(true);
    setFetchError('');
    try {
      const data = await getAllIngredientCategories();
      setCategories(data);
    } catch (err) {
      // El backend devuelve 404 cuando no hay categorías, no es un error crítico.
      if (err.message.includes('No se encontraron')) {
        setCategories([]);
      } else {
        setFetchError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (data) => {
    await createIngredientCategory(data);
    setFormMode(null);
    await loadCategories();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormMode('edit');
    setActionError('');
  };

  const handleUpdate = async (data) => {
    await updateIngredientCategory(editingCategory.id, data);
    setFormMode(null);
    setEditingCategory(null);
    await loadCategories();
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `¿Eliminar la categoría "${category.name}"?\nEsta acción no se puede deshacer y fallará si tiene ingredientes asociados.`
    );
    if (!confirmed) return;
    setActionError('');
    try {
      await deleteIngredientCategory(category.id);
      await loadCategories();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleCancelForm = () => {
    setFormMode(null);
    setEditingCategory(null);
  };

  return (
    <div className="IngredientCategoryPage">
      <div className="IngredientCategoryPage-header">
        <h2>Panel de Administración — Categorías de Ingrediente</h2>
        <span className="IngredientCategoryPage-count">
          {categories.length} categoría{categories.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Botón para mostrar el formulario de creación */}
      {formMode === null && (
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => { setFormMode('create'); setActionError(''); }}
          id="btnNuevaCategoria"
        >
          + Nueva categoría
        </button>
      )}

      {/* Formulario de creación */}
      {formMode === 'create' && (
        <IngredientCategoryForm
          initialData={null}
          onSubmit={handleCreate}
          onCancel={handleCancelForm}
        />
      )}

      {/* Formulario de edición */}
      {formMode === 'edit' && editingCategory && (
        <IngredientCategoryForm
          initialData={editingCategory}
          onSubmit={handleUpdate}
          onCancel={handleCancelForm}
        />
      )}

      {actionError && (
        <div className="IngredientCategoryPage-alert">⚠ {actionError}</div>
      )}

      {isLoading && <p className="IngredientCategoryPage-loading">Cargando categorías...</p>}
      {fetchError && <p className="IngredientCategoryPage-error">⚠ {fetchError}</p>}

      {!isLoading && !fetchError && categories.length === 0 && (
        <p className="IngredientCategoryPage-empty">No hay categorías de ingrediente creadas.</p>
      )}

      {!isLoading && categories.length > 0 && (
        <ul className="IngredientCategoryPage-list">
          {categories.map((cat) => (
            <li key={cat.id} className="IngredientCategoryPage-item">
              <div className="IngredientCategoryPage-itemInfo">
                <span className="IngredientCategoryPage-itemName">{cat.name}</span>
                {cat.description && (
                  <span className="IngredientCategoryPage-itemDesc">{cat.description}</span>
                )}
                <span className="IngredientCategoryPage-itemId">ID: {cat.id}</span>
              </div>
              <div className="IngredientCategoryPage-itemActions">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => handleEdit(cat)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() => handleDelete(cat)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IngredientCategoryPage;
