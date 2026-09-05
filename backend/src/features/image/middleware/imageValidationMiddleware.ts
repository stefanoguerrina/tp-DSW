// Middlewares de validación para las rutas de image, usando express-validator.
// Se ejecutan antes del controller para rechazar datos inválidos con mensajes claros.
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// imageUrl acepta tanto una URL http(s) como una data URL (base64), ya que
// todavía no hay almacenamiento de archivos propio (bucket/disco).
const isValidImageUrl = (value: string) => /^(https?:|data:image\/)/.test(value);

// Reglas de validación para agregar una imagen (POST /).
export const validateCreateImage = [
  body('imageUrl')
    .isString()
    .notEmpty()
    .withMessage('imageUrl es requerido.')
    .custom(isValidImageUrl)
    .withMessage('imageUrl debe ser una URL http(s) o una data URL de imagen.'),
  body('isMain')
    .optional()
    .isBoolean()
    .withMessage('isMain debe ser un valor booleano.'),
];

// Reglas de validación para actualizar una imagen (PATCH /:id).
export const validateUpdateImage = [
  body('imageUrl')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('imageUrl no puede estar vacío.')
    .custom(isValidImageUrl)
    .withMessage('imageUrl debe ser una URL http(s) o una data URL de imagen.'),
  body('isMain')
    .optional()
    .isBoolean()
    .withMessage('isMain debe ser un valor booleano.'),
  body()
    .custom((_, { req }) => {
      if (req.body.imageUrl === undefined && req.body.isMain === undefined) {
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
