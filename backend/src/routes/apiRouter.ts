// Central API router — mounts all feature sub-routers.
import { Router } from 'express';
import { authRouter } from '../features/auth/routes/authRouter.js';
import { userRouter } from '../features/user/routes/userRouter.js';
import { categoryRouter } from '../features/category/routes/categoryRouter.js';
import { databaseRouter } from '../features/database/routes/databaseRouter.js'
import { ingredientCategoryRouter } from '../features/ingredientCategory/routes/ingredientCategoryRouter.js';
import { ingredientRouter } from '../features/ingredient/routes/ingredientRouter.js';
import { recipeRouter } from '../features/recipe/routes/recipeRouter.js';

const apiRouter = Router();

// Database routes
apiRouter.use('/database', databaseRouter);

// Authentication routes
apiRouter.use('/auth', authRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/categories', categoryRouter);

// Ingredient routes (incluye, anidado, el CRUD de valores nutricionales)
apiRouter.use('/ingredient-categories', ingredientCategoryRouter);
apiRouter.use('/ingredients', ingredientRouter);

// Recipe routes
apiRouter.use('/recipes', recipeRouter);

export { apiRouter };
