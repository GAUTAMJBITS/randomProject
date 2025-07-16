const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);
router.post('/', createOrder);
router.get('/', getMyOrders);

module.exports = router;