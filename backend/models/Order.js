import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    items: [
        {
            _id: String,
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    total: Number,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);
