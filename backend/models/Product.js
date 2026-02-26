import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        codice: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        nome: {
            type: String,
            required: true,
            trim: true,
        },
        descrizione: {
            type: String,
            trim: true,
        },
        prezzo: {
            type: Number,
            required: true,
            default: 0,
        },
        prezzoScontato: {
            type: Number,
            default: 0,
        },
        categoria: {
            type: String,
            trim: true,
        },
        disponibile: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

