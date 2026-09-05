// Panel de administración de roles — listar, crear, editar y eliminar roles.
// Reutiliza los estilos admin-panel.css para mantener el mismo look & feel que el resto
// de los paneles de administración (Usuarios, Categorías de ingrediente, Ingredientes).
// Solo accesible para admins (gate hecho en HomePage/Sidebar).
import { useState, useEffect } from 'react';
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
} from '../services/roleService.js';
import '../../user/styles/admin-panel.css';

// Formulario embebido para crear o editar un rol.
// Recibe: initialData (null para crear, objeto para editar), onSubmit, onCancel.
function RoleForm({ initialData, onSubmit, onCancel }) {
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
    <form className="admin-panel__create-form" onSubmit={handleSubmit}>
      <h3 className="admin-panel__create-form-title">
        {initialData ? `Editar rol "${initialData.name}"` : 'Nuevo rol'}
      </h3>
      <div className="admin-panel__form-grid">
        <div className="admin-panel__form-group">
          <label htmlFor="rf-name">Nombre *</label>
          <input
            id="rf-name"
            className="admin-panel__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ej: Moderador"
          />
        </div>
        <div className="admin-panel__form-group">
          <label htmlFor="rf-description">Descripción</label>
          <input
            id="rf-description"
            className="admin-panel__input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opcional"
          />
        </div>
      </div>

      {error && (
        <div className="admin-panel__alert admin-panel__alert--error">⚠ {error}</div>
      )}

      <div className="admin-panel__form-actions">
        <button type="submit" className="admin-panel__btn admin-panel__btn--create" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : initialData ? 'Guardar cambios' : 'Crear rol'}
        </button>
        <button type="button" className="admin-panel__btn admin-panel__btn--cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

// Página principal del panel de roles.
function RolePage() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // null = sin formulario; 'create' = nuevo; 'edit' = editando editingRole
  const [formMode, setFormMode] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  const [actionError, setActionError] = useState('');
  const [deletingRoleId, setDeletingRoleId] = useState(null);

  // Carga inicial de roles.
  const loadRoles = async () => {
    setIsLoading(true);
    setFetchError('');
    try {
      const data = await getAllRoles();
      setRoles(data);
    } catch (err) {
      // El backend devuelve 404 cuando no hay roles cargados, no es un error crítico.
      if (err.message.includes('No se encontraron')) {
        setRoles([]);
      } else {
        setFetchError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleCreate = async (data) => {
    await createRole(data);
    setFormMode(null);
    await loadRoles();
  };

  const handleEditClick = (role) => {
    setEditingRole(role);
    setFormMode('edit');
    setActionError('');
  };

  const handleUpdate = async (data) => {
    await updateRole(editingRole.id, data);
    setFormMode(null);
    setEditingRole(null);
    await loadRoles();
  };

  const handleDeleteClick = async (role) => {
    const confirmed = window.confirm(
      `¿Eliminar el rol "${role.name}"?\nEsta acción no se puede deshacer y fallará si el rol tiene usuarios asignados.`
    );
    if (!confirmed) return;
    setActionError('');
    setDeletingRoleId(role.id);
    try {
      await deleteRole(role.id);
      setRoles((prev) => prev.filter((r) => r.id !== role.id));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setDeletingRoleId(null);
    }
  };

  const handleCancelForm = () => {
    setFormMode(null);
    setEditingRole(null);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h2 className="admin-panel__title">Panel de Administración — Roles</h2>
        <span className="admin-panel__count">
          {roles.length} rol{roles.length !== 1 ? 'es' : ''}
        </span>
      </div>

      <div className="admin-panel__controls">
        <button
          className="admin-panel__btn admin-panel__btn--refresh"
          onClick={loadRoles}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : '↻ Refrescar'}
        </button>
        {formMode === null && (
          <button
            className="admin-panel__btn admin-panel__btn--new"
            onClick={() => { setFormMode('create'); setActionError(''); }}
            id="btnNuevoRol"
          >
            + Nuevo rol
          </button>
        )}
      </div>

      {formMode === 'create' && (
        <RoleForm initialData={null} onSubmit={handleCreate} onCancel={handleCancelForm} />
      )}

      {formMode === 'edit' && editingRole && (
        <RoleForm initialData={editingRole} onSubmit={handleUpdate} onCancel={handleCancelForm} />
      )}

      {actionError && (
        <div className="admin-panel__alert admin-panel__alert--error">⚠ {actionError}</div>
      )}

      {isLoading && <p className="admin-panel__loading">Cargando roles...</p>}
      {fetchError && (
        <div className="admin-panel__alert admin-panel__alert--error">⚠ {fetchError}</div>
      )}

      {!isLoading && !fetchError && roles.length === 0 && (
        <p className="admin-panel__empty">No hay roles creados.</p>
      )}

      {!isLoading && roles.length > 0 && (
        <ul className="admin-panel__list">
          {roles.map((role) => (
            <li key={role.id} className="admin-panel__item">
              <div className="admin-panel__item-info">
                <span className="admin-panel__item-username">{role.name}</span>
                {role.description && (
                  <span className="admin-panel__item-email">{role.description}</span>
                )}
                <span className="admin-panel__item-id">ID: {role.id}</span>
              </div>
              <div className="admin-panel__item-actions admin-panel__item-actions--group">
                <button
                  type="button"
                  className="admin-panel__btn admin-panel__btn--edit"
                  onClick={() => handleEditClick(role)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="admin-panel__btn admin-panel__btn--delete"
                  onClick={() => handleDeleteClick(role)}
                  disabled={deletingRoleId === role.id}
                >
                  {deletingRoleId === role.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RolePage;
