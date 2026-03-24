const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    if (totalAmount === undefined || totalAmount === null) {
      return res.status(400).json({ message: 'Total amount is required' });
    }

    const normalizedItems = items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    const order = await Order.create({
      userId: req.user.userId,
      items: normalizedItems,
      totalAmount: Number(totalAmount),
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (err) {
    console.error('Place Order Error:', err.message);
    res.status(500).json({ message: 'Place order failed' });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('Get Orders Error:', err.message);
    res.status(500).json({ message: 'Fetch orders failed' });
  }
};
