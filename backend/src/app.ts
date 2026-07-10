import express from "express";
import { apiRouter } from "./routes/api.routes.js"; // Sumamos tu nuevo enrutador

const app = express();
const PORT = 3000;

app.use(express.json());

// Tu ruta original se queda exactamente igual:
app.get("/", (req, res) => {
    res.send("You reached the App!");
});

// Le agregamos el enrutador base de la API abajo:
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
});