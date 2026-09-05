// Servicio de pasos de preparación: centraliza las llamadas HTTP al backend.
// Los pasos de una receta se editan siempre como una lista completa (agregar,
// quitar o reordenar en el mismo formulario), por eso la única escritura
// disponible es "reemplazar todo el set" (PUT), no un CRUD por paso individual.
import { apiFetch } from '../../../shared/utils/apiFetch.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Trae los pasos de una receta, ya ordenados (lectura pública).
export const getStepsByRecipe = async (idRecipe) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${idRecipe}/steps`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error del servidor (${response.status}).`);
  }
  return await response.json();
};

// Reemplaza por completo los pasos de una receta (requiere ser el dueño o admin).
// Recibe: idRecipe, steps: [{ instruction, estimatedTime? }, ...] en el orden final.
// Devuelve: la lista de pasos ya numerados.
export const replaceSteps = async (idRecipe, steps) => {
  return await apiFetch(`/recipes/${idRecipe}/steps`, {
    method: 'PUT',
    body: JSON.stringify({ steps }),
  });
};
