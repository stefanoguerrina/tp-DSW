import { Router } from 'express';
import { searchUsers } from '../controllers/user.controller.js';

const userRouter = Router();

// GET /api/users — returns all registered users
userRouter.get('/', searchUsers);

export { userRouter };
