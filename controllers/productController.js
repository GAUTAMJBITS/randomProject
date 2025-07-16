const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const { name, category, page = 1, limit = 10 } = req.query;
  const query = {};
  if (name) query.name = new RegExp(name, 'i');
  if (category) query.category = category;

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.sendStatus(204);
};
