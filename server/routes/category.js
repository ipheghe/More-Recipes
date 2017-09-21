import express from 'express';
import authorize from '../../jsontoken';
import categoriesController from '../controllers/categories';
import { validUser } from '../middlewares/userValidation';
import { validateCategoryField } from '../middlewares/categoryValidation';

const router = express.Router();

//API route for users to create categories
router.post('/api/v1/users/categories', authorize.verifyUser, validUser, validateCategoryField, categoriesController.addUncategorized, categoriesController.addCategory);

export default router;