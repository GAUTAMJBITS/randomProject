const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

// Everyone can view products
router.get('/', getAllProducts);

// Admin-only routes
router.post('/', authenticateToken, authorizeRoles('admin'), createProduct);
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateProduct);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteProduct);


module.exports = router;