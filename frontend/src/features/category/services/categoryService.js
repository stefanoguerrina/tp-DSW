// Servicio de categorías (de receta): centraliza las llamadas HTTP al backend.
// La lectura requiere token de usuario (cualquier autenticado), no solo admin.
import { apiFetch } from '../../../shared/utils/apiFetch.js';

// Trae todas las categorías de receta disponibles (requiere estar autenticado).
// Devuelve el array de categorías o lanza un Error con el mensaje del backend.
export const getAllCategories = async () => {
  return await apiFetch('/categories');
};
