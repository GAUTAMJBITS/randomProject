const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  res.json(cart || { items: [] });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });

  const item = cart.items.find(i => i.product.toString() === productId);
  if (item) item.quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  await cart.save();
  res.json(cart);
};

exports.updateCartItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  const item = cart.items.find(i => i.product.toString() === req.params.productId);
  if (item) item.quantity = req.body.quantity;
  await cart.save();
  res.json(cart);
};

exports.removeCartItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await cart.save();
  res.json(cart);
};