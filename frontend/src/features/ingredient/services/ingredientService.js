// Servicio de ingredientes: centraliza las llamadas HTTP al backend.
// Usa apiFetch para rutas autenticadas (admin) y fetch directo para lecturas públicas.
import { apiFetch } from '../../../shared/utils/apiFetch.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Trae todos los ingredientes con sus categorías (lectura pública).
// Devuelve el array de ingredientes o lanza un Error con el mensaje del backend.
export const getAllIngredients = async () => {
  const response = await fetch(`${API_BASE_URL}/ingredients`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error del servidor (${response.status}).`);
  }
  return await response.json();
};

// Obtiene un ingrediente por ID (lectura pública).
export const getIngredientById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/ingredients/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error del servidor (${response.status}).`);
  }
  return await response.json();
};

// Crea un nuevo ingrediente (requiere token de admin).
// Recibe: { name, description?, unitOfMeasure?, imagePath?, categoryIds: number[] }
// Devuelve: el ingrediente creado.
export const createIngredient = async (data) => {
  return await apiFetch('/ingredients', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Actualiza un ingrediente existente (requiere token de admin).
// Recibe: id, { name?, description?, unitOfMeasure?, imagePath?, categoryIds?: number[] }
// Devuelve: el ingrediente actualizado.
export const updateIngredient = async (id, data) => {
  return await apiFetch(`/ingredients/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// Elimina un ingrediente por ID (requiere token de admin).
// Devuelve: { message } o lanza Error si está en uso (409).
export const deleteIngredient = async (id) => {
  return await apiFetch(`/ingredients/${id}`, {
    method: 'DELETE',
  });
};
