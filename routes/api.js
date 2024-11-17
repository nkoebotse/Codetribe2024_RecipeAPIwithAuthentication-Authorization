import express from "express";
import itemController from "../controllers/itemController.js";
import { validateItem } from "../middleware/validateItem.js";
import userController from "../controllers/userController.js";
import { protect, authorize } from "../middleware/protect.js";

const router = express.Router();

// User Routes
router.post("/user", userController.registerUser);
router.post("/user/login", userController.loginUser);

// Item Routes (with Role-based Access Control)
router.post("/items", protect, authorize("admin"), validateItem, itemController.createItem); // Admin only
router.get("/items", protect, itemController.getItems);
router.get("/items/:id", protect, itemController.getItem);
router.put("/items/:id", protect, authorize("admin"), validateItem, itemController.updateItem); // Admin only
router.delete("/items/:id", protect, authorize("admin"), itemController.deleteItem); // Admin only

export default router;
