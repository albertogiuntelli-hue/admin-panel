// ===============================
//  SERVER BACKEND PLUSMARKET (ESM)
// ===============================

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connessione a MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/plusmarket", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connesso"))
    .catch((err) => console.error("Errore MongoDB:", err));

// Import corretto della route prodotti
import productsRoutes from "./routes/productsRoutes.js";
app.use("/api/products", productsRoutes);

// Route di test
app.get("/", (req, res) => {
    res.send("Backend PlusMarket attivo");
});

// Avvio del server — ACCESSIBILE DALL’ESTERNO
app.listen(5000, "0.0.0.0", () => {
    console.log("Server backend avviato sulla porta 5000 e accessibile dall'esterno");
});
