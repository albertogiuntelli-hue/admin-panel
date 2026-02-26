import express from "express";
import { getAllProducts, uploadCSV } from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// Ottieni tutti i prodotti
router.get("/products", getAllProducts);

// Upload CSV
router.post(
    "/products/upload-csv",
    auth,
    admin,
    upload.single("file"),
    uploadCSV
);

export default router;
