// Controller de ingrediente — maneja las rutas de /api/ingredients.
// Delega toda la lógica de negocio al ingredientService; solo se encarga de leer
// la request y armar la response HTTP correcta.
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as ingredientService from '../services/ingredientService.js';

// Devuelve la lista de todos los ingredientes con sus categorías.
// GET /api/ingredients
export const searchIngredients = async (req: Request, res: Response): Promise<void> => {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    if (!ingredients || ingredients.length === 0) {
      res.status(404).json({ message: 'No se encontraron ingredientes.' });
      return;
    }
    res.status(200).json(ingredients);
  } catch (error) {
    console.error('[searchIngredients] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Devuelve un ingrediente por ID.
// GET /api/ingredients/:id
export const getIngredientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      res.status(400).json({ message: 'El ID de ingrediente no es válido.' });
      return;
    }

    const ingredient = await ingredientService.getIngredientById(id);
    if (!ingredient) {
      res.status(404).json({ message: 'Ingrediente no encontrado.' });
      return;
    }

    res.status(200).json(ingredient);
  } catch (error) {
    console.error('[getIngredientById] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Crea un nuevo ingrediente. El body espera categoryIds como array de IDs
// (ej. { "categoryIds": [1, 3], "name": "Tomate" }).
// POST /api/ingredients
export const createIngredient = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Error de validación.',
      errors: errors.array().map((e) => ({ campo: e.type === 'field' ? (e as any).path : 'general', mensaje: e.msg })),
    });
    return;
  }

  try {
    const { categoryIds, name, description, unitOfMeasure, imagePath } = req.body;
    const result = await ingredientService.createIngredient({
      categoryIds: (categoryIds as number[]).map(Number),
      name,
      description,
      unitOfMeasure,
      imagePath,
    });

    if (!result.ok) {
      if (result.reason === 'categories_not_found') {
        res.status(404).json({ message: 'Una o más categorías de ingrediente indicadas no existen.' });
        return;
      }
      res.status(409).json({ message: 'Ya existe un ingrediente con ese nombre.' });
      return;
    }

    res.status(201).json(result.ingredient);
  } catch (error) {
    console.error('[createIngredient] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualiza un ingrediente existente. Si se envía categoryIds, reemplaza por
// completo el set de categorías actuales.
// PATCH /api/ingredients/:id
export const updateIngredientById = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Error de validación.',
      errors: errors.array().map((e) => ({ campo: e.type === 'field' ? (e as any).path : 'general', mensaje: e.msg })),
    });
    return;
  }

  try {
    const id = Number(req.params.id);
    const { categoryIds, name, description, unitOfMeasure, imagePath } = req.body;

    const result = await ingredientService.updateIngredient(id, {
      categoryIds: categoryIds !== undefined ? (categoryIds as number[]).map(Number) : undefined,
      name,
      description,
      unitOfMeasure,
      imagePath,
    });

    if (!result.ok) {
      if (result.reason === 'not_found') {
        res.status(404).json({ message: 'Ingrediente no encontrado.' });
        return;
      }
      if (result.reason === 'duplicate_name') {
        res.status(409).json({ message: 'Ya existe un ingrediente con ese nombre.' });
        return;
      }
      res.status(404).json({ message: 'Una o más categorías de ingrediente indicadas no existen.' });
      return;
    }

    res.status(200).json(result.ingredient);
  } catch (error) {
    console.error('[updateIngredientById] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Elimina un ingrediente por ID.
// DELETE /api/ingredients/:id
export const deleteIngredientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      res.status(400).json({ message: 'El ID de ingrediente no es válido.' });
      return;
    }

    const result = await ingredientService.deleteIngredient(id);

    if (!result.ok) {
      if (result.reason === 'not_found') {
        res.status(404).json({ message: 'Ingrediente no encontrado.' });
        return;
      }
      res.status(409).json({ message: 'No se puede eliminar: el ingrediente está en uso (inventario, recetas o valores nutricionales).' });
      return;
    }

    res.status(200).json({ message: 'Ingrediente eliminado correctamente.' });
  } catch (error) {
    console.error('[deleteIngredientById] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
