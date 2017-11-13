import express from 'express';
import authorize from '../middlewares/requireAuth';
import categoriesController from '../controllers/categories';
import { validUser } from '../middlewares/userValidation';
import { validateCategoryField } from '../middlewares/categoryValidation';

const router = express.Router();

// API route for users to create categories
router.post(
  '/api/v1/users/categories',
  authorize.verifyUser,
  validUser,
  validateCategoryField,
  categoriesController.addUncategorized,
  categoriesController.addCategory
);

// API route for users to retrieve only personal categories
router.get(
  '/api/v1/categories/users',
  authorize.verifyUser,
  validUser,
  categoriesController.getUserCategories
);

export default router;
