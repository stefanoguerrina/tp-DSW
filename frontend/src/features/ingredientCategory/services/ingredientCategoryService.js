// Servicio de categorías de ingrediente: centraliza las llamadas HTTP al backend.
// Usa apiFetch para rutas autenticadas (admin) y fetch directo para lecturas públicas.
import { apiFetch } from '../../../shared/utils/apiFetch.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Trae todas las categorías de ingrediente (lectura pública).
// Devuelve el array de categorías o lanza un Error con el mensaje del backend.
export const getAllIngredientCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/ingredient-categories`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error del servidor (${response.status}).`);
  }
  return await response.json();
};

// Obtiene una categoría por ID (lectura pública).
export const getIngredientCategoryById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/ingredient-categories/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error del servidor (${response.status}).`);
  }
  return await response.json();
};

// Crea una nueva categoría (requiere token de admin).
// Recibe: { name, description? }
// Devuelve: la categoría creada.
export const createIngredientCategory = async (data) => {
  return await apiFetch('/ingredient-categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Actualiza una categoría existente (requiere token de admin).
// Recibe: id, { name?, description? }
// Devuelve: la categoría actualizada.
export const updateIngredientCategory = async (id, data) => {
  return await apiFetch(`/ingredient-categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// Elimina una categoría por ID (requiere token de admin).
// Devuelve: { message } o lanza Error si tiene ingredientes asociados (409).
export const deleteIngredientCategory = async (id) => {
  return await apiFetch(`/ingredient-categories/${id}`, {
    method: 'DELETE',
  });
};
