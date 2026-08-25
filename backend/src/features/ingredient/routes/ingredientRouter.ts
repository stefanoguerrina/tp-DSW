// Router de ingrediente — define los endpoints de /api/ingredients.
// Las lecturas son públicas; las escrituras requieren token de administrador.
// Además monta, anidados bajo /:id/nutritional-values, los endpoints de valor nutricional.
import { Router } from 'express';
import {
  searchIngredients,
  getIngredientById,
  createIngredient,
  updateIngredientById,
  deleteIngredientById,
} from '../controllers/ingredientController.js';
import { verifyToken, verifyAdmin } from '../../../core/middleware/authMiddleware.js';
import {
  validateCreateIngredient,
  validateUpdateIngredient,
  handleValidationErrors,
} from '../middleware/ingredientValidationMiddleware.js';
import { nutritionalValueRouter } from '../../nutritionalValue/routes/nutritionalValueRouter.js';

const ingredientRouter = Router();

// GET /api/ingredients — devuelve todos los ingredientes con su categoría
ingredientRouter.get('/', searchIngredients);

// GET /api/ingredients/:id — devuelve un ingrediente por ID
ingredientRouter.get('/:id', getIngredientById);

// POST /api/ingredients — crea un ingrediente (solo admin)
ingredientRouter.post(
  '/',
  verifyToken,
  verifyAdmin,
  validateCreateIngredient,
  handleValidationErrors,
  createIngredient
);

// PATCH /api/ingredients/:id — modifica un ingrediente (solo admin)
ingredientRouter.patch(
  '/:id',
  verifyToken,
  verifyAdmin,
  validateUpdateIngredient,
  handleValidationErrors,
  updateIngredientById
);

// DELETE /api/ingredients/:id — elimina un ingrediente (solo admin)
ingredientRouter.delete('/:id', verifyToken, verifyAdmin, deleteIngredientById);

// /api/ingredients/:idIngredient/nutritional-values — CRUD dependiente de valores nutricionales
ingredientRouter.use('/:idIngredient/nutritional-values', nutritionalValueRouter);

export { ingredientRouter };
