// Servicio de valores nutricionales: centraliza las llamadas HTTP al backend.
// Los valores nutricionales están anidados bajo un ingrediente:
// /api/ingredients/:idIngredient/nutritional-values
import { apiFetch } from '../../../shared/utils/apiFetch.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Trae todos los valores nutricionales de un ingrediente (lectura pública).
// Recibe: idIngredient (número)
// Devuelve: array de valores nutricionales.
export const getNutritionalValuesByIngredient = async (idIngredient) => {
  const response = await fetch(`${API_BASE_URL}/ingredients/${idIngredient}/nutritional-values`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error del servidor (${response.status}).`);
  }
  return await response.json();
};

// Obtiene un valor nutricional específico por su número (lectura pública).
// Recibe: idIngredient, num
export const getNutritionalValueByNum = async (idIngredient, num) => {
  const response = await fetch(`${API_BASE_URL}/ingredients/${idIngredient}/nutritional-values/${num}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error del servidor (${response.status}).`);
  }
  return await response.json();
};

// Crea un valor nutricional para un ingrediente (requiere token de admin).
// Recibe: idIngredient, { name, servingAmount?, servingUnit?, value? }
// Devuelve: el valor nutricional creado.
export const createNutritionalValue = async (idIngredient, data) => {
  return await apiFetch(`/ingredients/${idIngredient}/nutritional-values`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Actualiza un valor nutricional existente (requiere token de admin).
// Recibe: idIngredient, num, { name?, servingAmount?, servingUnit?, value? }
export const updateNutritionalValue = async (idIngredient, num, data) => {
  return await apiFetch(`/ingredients/${idIngredient}/nutritional-values/${num}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// Elimina un valor nutricional por su número (requiere token de admin).
export const deleteNutritionalValue = async (idIngredient, num) => {
  return await apiFetch(`/ingredients/${idIngredient}/nutritional-values/${num}`, {
    method: 'DELETE',
  });
};
