// Middlewares de validación para las rutas de usuario, usando express-validator.
// Se ejecutan antes del controller para rechazar datos inválidos con mensajes claros.
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Reglas de validación para el endpoint de actualización de datos del usuario (PATCH /:id).
// Al menos uno de los campos editables debe estar presente.
export const validateUpdateUser = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID de usuario debe ser un número entero positivo.'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El apellido debe tener entre 2 y 100 caracteres.'),
  body('phone')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('El teléfono no puede superar los 20 caracteres.'),
  body('avatarUrl')
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage('La URL del avatar debe ser una URL válida.'),
  // Verificamos que al menos un campo editable esté presente en el body.
  body()
    .custom((_, { req }) => {
      const campos = ['name', 'lastName', 'phone', 'avatarUrl'];
      const hayAlguno = campos.some((c) => req.body[c] !== undefined);
      if (!hayAlguno) {
        throw new Error('Se debe enviar al menos un campo editable: name, lastName, phone o avatarUrl.');
      }
      return true;
    }),
];

// Reglas de validación para el endpoint de cambio de contraseña (PATCH /:id/password).
export const validateChangePassword = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID de usuario debe ser un número entero positivo.'),
  body('currentPassword')
    .notEmpty()
    .withMessage('La contraseña actual es requerida.'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('La nueva contraseña debe tener al menos 6 caracteres.')
    .custom((newPass, { req }) => {
      // No permitir que la nueva contraseña sea igual a la actual.
      if (newPass === req.body.currentPassword) {
        throw new Error('La nueva contraseña no puede ser igual a la actual.');
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
