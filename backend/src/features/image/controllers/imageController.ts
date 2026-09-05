// Controller de image — maneja las rutas anidadas de /api/recipes/:idRecipe/images.
// Delega toda la lógica de negocio al imageService; solo se encarga de leer
// la request y armar la response HTTP correcta.
import { Response } from 'express';
import { validationResult } from 'express-validator';
import * as imageService from '../services/imageService.js';
import type { AuthRequest } from '../../../core/middleware/authMiddleware.js';

// Devuelve las imágenes de una receta (la principal primero).
// GET /api/recipes/:idRecipe/images
export const searchImagesByRecipe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const idRecipe = Number(req.params.idRecipe);

    if (isNaN(idRecipe) || idRecipe <= 0) {
      res.status(400).json({ message: 'El ID de receta no es válido.' });
      return;
    }

    const images = await imageService.getImagesByRecipe(idRecipe);
    if (images === 'recipe_not_found') {
      res.status(404).json({ message: 'Receta no encontrada.' });
      return;
    }

    res.status(200).json(images);
  } catch (error) {
    console.error('[searchImagesByRecipe] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Agrega una nueva imagen a una receta (solo su dueño o un admin).
// Body: { imageUrl, isMain? }. Si isMain=true, reemplaza a la imagen principal anterior.
// POST /api/recipes/:idRecipe/images
export const createImage = async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Error de validación.',
      errors: errors.array().map((e) => ({ campo: e.type === 'field' ? (e as any).path : 'general', mensaje: e.msg })),
    });
    return;
  }

  try {
    const idRecipe = Number(req.params.idRecipe);
    const { imageUrl, isMain } = req.body;

    const result = await imageService.addImage(idRecipe, req.user!.id, req.user!.isAdmin, { imageUrl, isMain });

    if (!result.ok) {
      if (result.reason === 'not_found') {
        res.status(404).json({ message: 'Receta no encontrada.' });
        return;
      }
      res.status(403).json({ message: 'Acceso denegado. Solo podés agregar imágenes a tus propias recetas.' });
      return;
    }

    res.status(201).json(result.image);
  } catch (error) {
    console.error('[createImage] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualiza una imagen existente (solo su dueño o un admin).
// PATCH /api/recipes/:idRecipe/images/:id
export const updateImageById = async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Error de validación.',
      errors: errors.array().map((e) => ({ campo: e.type === 'field' ? (e as any).path : 'general', mensaje: e.msg })),
    });
    return;
  }

  try {
    const idRecipe = Number(req.params.idRecipe);
    const id = Number(req.params.id);
    const { imageUrl, isMain } = req.body;

    const result = await imageService.updateImage(idRecipe, id, req.user!.id, req.user!.isAdmin, { imageUrl, isMain });

    if (!result.ok) {
      if (result.reason === 'not_found') {
        res.status(404).json({ message: 'Imagen no encontrada.' });
        return;
      }
      res.status(403).json({ message: 'Acceso denegado. Solo podés modificar imágenes de tus propias recetas.' });
      return;
    }

    res.status(200).json(result.image);
  } catch (error) {
    console.error('[updateImageById] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Elimina una imagen por ID (solo su dueño o un admin).
// DELETE /api/recipes/:idRecipe/images/:id
export const deleteImageById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const idRecipe = Number(req.params.idRecipe);
    const id = Number(req.params.id);

    if (isNaN(idRecipe) || idRecipe <= 0 || isNaN(id) || id <= 0) {
      res.status(400).json({ message: 'El ID de receta o de imagen no es válido.' });
      return;
    }

    const result = await imageService.deleteImage(idRecipe, id, req.user!.id, req.user!.isAdmin);

    if (!result.ok) {
      if (result.reason === 'not_found') {
        res.status(404).json({ message: 'Imagen no encontrada.' });
        return;
      }
      res.status(403).json({ message: 'Acceso denegado. Solo podés eliminar imágenes de tus propias recetas.' });
      return;
    }

    res.status(200).json({ message: 'Imagen eliminada correctamente.' });
  } catch (error) {
    console.error('[deleteImageById] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
