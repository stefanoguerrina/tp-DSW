// Servicio de imágenes de receta: centraliza las llamadas HTTP al backend.
// Todavía no hay almacenamiento de archivos propio, así que imageUrl viaja
// como data URL (base64) generada en el navegador con FileReader.
import { apiFetch } from '../../../shared/utils/apiFetch.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Trae las imágenes de una receta, la principal primero (lectura pública).
export const getImagesByRecipe = async (idRecipe) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${idRecipe}/images`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error del servidor (${response.status}).`);
  }
  return await response.json();
};

// Agrega una imagen a una receta (requiere ser el dueño o admin).
// Recibe: idRecipe, { imageUrl, isMain? }. Devuelve: la imagen creada.
export const createImage = async (idRecipe, data) => {
  return await apiFetch(`/recipes/${idRecipe}/images`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Actualiza una imagen existente (requiere ser el dueño o admin).
export const updateImage = async (idRecipe, id, data) => {
  return await apiFetch(`/recipes/${idRecipe}/images/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// Elimina una imagen por ID (requiere ser el dueño o admin).
export const deleteImage = async (idRecipe, id) => {
  return await apiFetch(`/recipes/${idRecipe}/images/${id}`, {
    method: 'DELETE',
  });
};
