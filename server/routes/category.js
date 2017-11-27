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

// API route for users to modify category name
router.put(
  '/api/v1/users/categories/:id',
  authorize.verifyUser,
  validUser,
  categoriesController.updateCategory
);

// API route for users to create categories
router.delete(
  '/api/v1/users/categories/:id',
  authorize.verifyUser,
  validUser,
  categoriesController.deleteCategory
);

// API route for users to retrieve only personal categories
router.get(
  '/api/v1/categories/users',
  authorize.verifyUser,
  validUser,
  categoriesController.getUserCategories
);

// API route for user to retrieve personal category
router.get(
  '/api/v1/category/users/:id',
  authorize.verifyUser,
  validUser,
  categoriesController.getUserCategory
);

export default router;
