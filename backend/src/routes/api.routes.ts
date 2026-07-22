// Central API router — mounts all feature sub-routers.
import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { userRouter } from './user.routes.js';
import pool from '../database.js';

const apiRouter = Router();

// Health check endpoint — also tests the database connection
apiRouter.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'OK', database: 'connected' });
  } catch (error: any) {
    res.status(500).json({ status: 'ERROR', database: 'disconnected', detail: error.message });
  }
});

// Authentication routes: POST /api/auth/register, POST /api/auth/login
apiRouter.use('/auth', authRouter);

apiRouter.use('/users', userRouter);

export { apiRouter };
