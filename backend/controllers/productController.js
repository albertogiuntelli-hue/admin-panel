import Product from "../models/Product.js";
import parseCSV from "../utils/csvParser.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero prodotti" });
    }
};

export const uploadCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Nessun file caricato" });
        }

        const products = await parseCSV(req.file.path);

        for (const p of products) {
            await Product.findOneAndUpdate(
                { codice: p.codice },
                p,
                { upsert: true, new: true }
            );
        }

        res.json({ message: "CSV importato correttamente", count: products.length });
    } catch (error) {
        console.error("Errore CSV:", error);
        res.status(500).json({ message: "Errore durante l'importazione CSV" });
    }
};
