// Router for authentication endpoints: register and login.
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const authRouter = Router();

// POST /api/auth/register — creates a new user account
authRouter.post('/register', register);

// POST /api/auth/login — authenticates and returns a JWT
authRouter.post('/login', login);

export { authRouter };
