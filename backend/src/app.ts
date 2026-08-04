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
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("You reached the App!");
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);

});