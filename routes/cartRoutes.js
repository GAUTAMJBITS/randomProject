const express = require('express');
const router = express.Router();
const { addToCart, updateCartItem, removeCartItem, getCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeCartItem);

module.exports = router;