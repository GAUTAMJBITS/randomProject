const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

  const order = new Order({
    user: req.user.id,
    items: cart.items,
    total: cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  });

  await order.save();
  await Cart.deleteOne({ user: req.user.id });
  res.json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};