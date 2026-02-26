import Admin from "../models/Admin.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// LOGIN ADMIN
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cerca admin per email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin non trovato" });
        }

        // Confronta password
        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) {
            return res.status(400).json({ message: "Password errata" });
        }

        // Genera token JWT
        const token = jwt.sign(
            { id: admin._id, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Risposta
        res.json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                isAdmin: true
            }
        });

    } catch (error) {
        console.error("Errore login admin:", error);
        res.status(500).json({ message: "Errore nel login admin" });
    }
};

// LOGIN UTENTE NORMALE (OPZIONALE)
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utente non trovato" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Password errata" });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, user });

    } catch (error) {
        console.error("Errore login utente:", error);
        res.status(500).json({ message: "Errore nel login utente" });
    }
};
