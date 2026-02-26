import express from "express";
import { adminLogin, userLogin } from "../controllers/authController.js";

const router = express.Router();

// Login admin (per admin panel)
router.post("/admin/login", adminLogin);

// Login utente normale (se usato dal client)
router.post("/login", userLogin);

export default router;
