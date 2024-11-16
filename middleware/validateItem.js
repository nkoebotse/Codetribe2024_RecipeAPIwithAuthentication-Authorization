import { body } from 'express-validator';

// Middleware to validate request body for item creation/updating
export const validateItem = [
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').notEmpty().withMessage('Quantity is required'),
    body('category').optional().isString().withMessage('Category must be a string'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
    body('notes').optional().isString().withMessage('Notes must be a string'),
];
