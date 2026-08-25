// Tipos e interfaces de dominio para la feature Ingredient.
// Esta capa no tiene lógica: solo describe la forma de los datos.
// Un ingrediente puede pertenecer a varias categorías (relación N:M vía
// la tabla intermedia ingredientcategoryingredient), por eso se maneja
// como un array de IDs (categoryIds) en vez de un único idIngredientCategory.

// Datos necesarios para crear un nuevo ingrediente.
export interface CreateIngredientData {
  categoryIds: number[];
  name: string;
  description?: string | null;
  unitOfMeasure?: string | null;
  imagePath?: string | null;
}

// Campos que se pueden modificar de un ingrediente existente.
// Si se envía categoryIds, se reemplaza por completo el set de categorías actuales.
export interface UpdateIngredientData {
  categoryIds?: number[];
  name?: string;
  description?: string | null;
  unitOfMeasure?: string | null;
  imagePath?: string | null;
}
