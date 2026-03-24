const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined || price === null || price === '') {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = await Product.create({
      name: name.trim(),
      price: Number(price),
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Add product error:', err.message);
    res.status(500).json({ message: 'Add product failed' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Get products error:', err.message);
    res.status(500).json({ message: 'Fetch products failed' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { name: name.trim(), price: Number(price) },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('Update product error:', err.message);
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err.message);
    res.status(500).json({ message: 'Delete failed' });
  }
};
