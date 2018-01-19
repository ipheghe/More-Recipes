import express from 'express';
import authorize from '../middlewares/requireAuth';
import { categories } from '../controllers';
import { validUser } from '../middlewares/userValidation';
import { validateCategoryField } from '../middlewares/categoryValidation';

const router = express.Router();

// API route for users to create categories
router.post(
  '/api/v1/user/category',
  authorize.verifyUser,
  validUser,
  validateCategoryField,
  categories.addCategory
);

// API route for users to create categories
router.post(
  '/api/v1/user/unCategorized',
  categories.addUncategorized,
);

// API route for users to modify category name
router.put(
  '/api/v1/user/category/:id',
  authorize.verifyUser,
  validUser,
  categories.updateCategory
);

// API route for users to create categories
router.delete(
  '/api/v1/user/category/:id',
  authorize.verifyUser,
  validUser,
  categories.deleteCategory
);

// API route for users to retrieve only personal categories
router.get(
  '/api/v1/categories/users',
  authorize.verifyUser,
  validUser,
  categories.getUserCategories
);

// API route for user to retrieve personal category
router.get(
  '/api/v1/category/user/:id',
  authorize.verifyUser,
  validUser,
  categories.getUserCategory
);

export default router;
