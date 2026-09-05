// Express application entry point — configures middleware and mounts routers.
import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/apiRouter.js";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Application initialization
const app = express();
const PORT = 3000;

// Middleware
// Orígenes permitidos para CORS: Vite usa 5173 por defecto, 5174 si el puerto ya está ocupado.
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174'
];
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
// Límite subido de 100kb (default de Express) a 10mb: las imágenes de receta
// todavía se envían como data URL en el body (no hay almacenamiento de
// archivos propio), y una foto de unos pocos MB en base64 supera el default.
app.use(express.json({ limit: '10mb' }));

app.get("/", (req, res) => {
    res.send("You reached the App!");
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);

});