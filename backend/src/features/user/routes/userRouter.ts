// Router for user endpoints.
import { Router } from 'express';
import { searchUsers } from '../controllers/userController.js';

const userRouter = Router();

// GET /api/users — returns all registered users
userRouter.get('/', searchUsers);

export { userRouter };
