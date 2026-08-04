// Router for user endpoints.
import { Router } from 'express';
import { searchUsers, deleteUserById } from '../controllers/userController.js';
import { verifyToken, verifyAdmin } from '../../../core/middleware/authMiddleware.js';

const userRouter = Router();

// GET /api/users — returns all registered users (admin only)
userRouter.get('/', verifyToken, verifyAdmin, searchUsers);

// DELETE /api/users/:id — deletes a user by ID (admin only)
userRouter.delete('/:id', verifyToken, verifyAdmin, deleteUserById);

export { userRouter };
