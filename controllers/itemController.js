import Item from "../models/item.js";
import { validationResult } from 'express-validator';

// Create a new item
const createItem = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the item" });
    }
};

// Get all items with pagination and sorting
const getItems = async (req, res) => {
    try {
        const { page = 1, limit = 5, sortBy = 'createdAt', order = 'asc' } = req.query;
        const skip = (page - 1) * limit;
        const sortOrder = order === 'asc' ? 1 : -1;

        const items = await Item.find()
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder });

        const totalItems = await Item.countDocuments();

        res.status(200).json({
            items,
            totalItems,
            page,
            limit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching items" });
    }
};
// Get a single item by ID
const getItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(item);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: "Invalid ID" });
        }
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
};

// Update an item by ID
const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: "Invalid ID" });
        }
        console.error(error);
        res.status(500).json({ error: "Error updating item" });
    }
};

// Delete an item by ID
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await Item.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: "Invalid ID" });
        }
        console.error(error);
        res.status(500).json({ error: "Error deleting item" });
    }
};

export default {
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
};
