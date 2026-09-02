// Middlewares de validación para las rutas de categoría, usando express-validator.
// Se ejecutan antes del controller para rechazar datos inválidos con mensajes claros.
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Reglas de validación para el endpoint de creación de categoría (POST /).
// name y description respetan los largos máximos definidos en prisma/schema.prisma (VarChar 100 y 255).
export const validateCreateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre de la categoría es requerido.')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),
  body('description')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage('La descripción no puede superar los 255 caracteres.'),
];

// Reglas de validación para el endpoint de actualización de categoría (PATCH /:id).
// Al menos uno de los campos editables (name o description) debe estar presente.
export const validateUpdateCategory = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID de categoría debe ser un número entero positivo.'),
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
  // Verificamos que al menos un campo editable esté presente en el body.
  body()
    .custom((_, { req }) => {
      const campos = ['name', 'description'];
      const hayAlguno = campos.some((c) => req.body[c] !== undefined);
      if (!hayAlguno) {
        throw new Error('Se debe enviar al menos un campo editable: name o description.');
      }
      return true;
    }),
];

// Reglas de validación para el endpoint de borrado de categoría (DELETE /:id).
export const validateCategoryId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID de categoría debe ser un número entero positivo.'),
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
