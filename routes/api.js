import express from 'express';
import itemController from '../controllers/itemController.js';
import { validateItem } from '../middleware/validateItem.js';

const router = express.Router();

router.post('/items', validateItem, itemController.createItem);
router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItem);
router.put('/items/:id', validateItem, itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

export default router;
