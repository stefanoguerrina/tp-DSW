// Middlewares de validación para las rutas de step, usando express-validator.
// Se ejecutan antes del controller para rechazar datos inválidos con mensajes claros.
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Reglas de validación para reemplazar los pasos de una receta (PUT /).
export const validateReplaceSteps = [
  body('steps')
    .isArray({ min: 1 })
    .withMessage('steps es requerido y debe ser un array con al menos un paso.'),
  body('steps.*.instruction')
    .trim()
    .notEmpty()
    .withMessage('Cada paso necesita una instrucción.')
    .isLength({ max: 2000 })
    .withMessage('La instrucción de un paso no puede superar los 2000 caracteres.'),
  body('steps.*.estimatedTime')
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage('El tiempo estimado de un paso debe ser un número entero positivo (en minutos).'),
];

// Middleware que lee los errores de express-validator y responde 422 si los hay.
// Se debe usar después de las reglas de validación en el router.
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Error de validación. Revisá los pasos enviados.',
      errors: errors.array().map((e) => ({ campo: e.type === 'field' ? (e as any).path : 'general', mensaje: e.msg })),
    });
    return;
  }
  next();
};
