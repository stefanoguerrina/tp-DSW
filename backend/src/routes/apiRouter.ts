// Central API router — mounts all feature sub-routers.
import { Router } from 'express';
import { authRouter } from '../features/auth/routes/authRouter.js';
import { userRouter } from '../features/user/routes/userRouter.js';
import { databaseRouter } from '../features/database/routes/databaseRouter.js'

const apiRouter = Router();

// Database routes
apiRouter.use('/database', databaseRouter);

// Authentication routes
apiRouter.use('/auth', authRouter);

apiRouter.use('/users', userRouter);

export { apiRouter };
