// Router de usuario — define los endpoints de /api/users y aplica middlewares de autenticación y validación.
import { Router } from 'express';
import {
  searchUsers,
  deleteUserById,
  updateUserById,
  changeUserPassword,
} from '../controllers/userController.js';
import { verifyToken, verifyAdmin, verifyOwnerOrAdmin } from '../../../core/middleware/authMiddleware.js';
import {
  validateUpdateUser,
  validateChangePassword,
  handleValidationErrors,
} from '../middleware/userValidationMiddleware.js';

const userRouter = Router();

// GET /api/users — devuelve todos los usuarios activos (solo admin)
userRouter.get('/', verifyToken, verifyAdmin, searchUsers);

// DELETE /api/users/:id — baja lógica de usuario (solo admin)
userRouter.delete('/:id', verifyToken, verifyAdmin, deleteUserById);

// PATCH /api/users/:id — modifica datos del usuario (el propio usuario o admin)
userRouter.patch('/:id', verifyToken, verifyOwnerOrAdmin, validateUpdateUser, handleValidationErrors, updateUserById);

// PATCH /api/users/:id/password — cambia la contraseña del usuario (el propio usuario o admin)
userRouter.patch('/:id/password', verifyToken, verifyOwnerOrAdmin, validateChangePassword, handleValidationErrors, changeUserPassword);

export { userRouter };
