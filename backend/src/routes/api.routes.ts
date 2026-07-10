import { Router } from 'express';

const apiRouter = Router();

// Ruta base de prueba (Health Check)
apiRouter.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API de Chefcito funcionando correctamente' 
  });
});

export { apiRouter };