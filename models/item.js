import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: [0, 'Quantity must be a positive number'] },
    notes: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

// Custom validation for quantity
itemSchema.path('quantity').validate(function (value) {
    return value >= 0;
}, 'Quantity must be a positive number.');

export default mongoose.model("Item", itemSchema);
