// Middlewares de validación para las rutas de ingrediente, usando express-validator.
// Se ejecutan antes del controller para rechazar datos inválidos con mensajes claros.
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Reglas de validación para crear un ingrediente (POST /).
export const validateCreateIngredient = [
  body('categoryIds')
    .isArray({ min: 1 })
    .withMessage('categoryIds es requerido y debe ser un array con al menos una categoría.'),
  body('categoryIds.*')
    .isInt({ min: 1 })
    .withMessage('Cada categoryId debe ser un número entero positivo.'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido.')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),
  body('description')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('La descripción no puede superar los 255 caracteres.'),
  body('unitOfMeasure')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('La unidad de medida no puede superar los 20 caracteres.'),
  body('imagePath')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('La ruta de la imagen no puede superar los 255 caracteres.'),
];

// Reglas de validación para actualizar un ingrediente (PATCH /:id).
// Al menos uno de los campos editables debe estar presente.
// Si se envía categoryIds, tiene que ser un array con al menos una categoría
// (no se permite "vaciar" las categorías de un ingrediente).
export const validateUpdateIngredient = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID de ingrediente debe ser un número entero positivo.'),
  body('categoryIds')
    .optional()
    .isArray({ min: 1 })
    .withMessage('categoryIds debe ser un array con al menos una categoría.'),
  body('categoryIds.*')
    .isInt({ min: 1 })
    .withMessage('Cada categoryId debe ser un número entero positivo.'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),
  body('description')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('La descripción no puede superar los 255 caracteres.'),
  body('unitOfMeasure')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('La unidad de medida no puede superar los 20 caracteres.'),
  body('imagePath')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('La ruta de la imagen no puede superar los 255 caracteres.'),
  // Verificamos que al menos un campo editable esté presente en el body.
  body()
    .custom((_, { req }) => {
      const campos = ['categoryIds', 'name', 'description', 'unitOfMeasure', 'imagePath'];
      const hayAlguno = campos.some((c) => req.body[c] !== undefined);
      if (!hayAlguno) {
        throw new Error('Se debe enviar al menos un campo editable.');
      }
      return true;
    }),
];

// Middleware que lee los errores de express-validator y responde 422 si los hay.
// Se debe usar después de las reglas de validación en el router.
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Error de validación. Revisá los campos enviados.',
      errors: errors.array().map((e) => ({ campo: e.type === 'field' ? (e as any).path : 'general', mensaje: e.msg })),
    });
    return;
  }
  next();
};
