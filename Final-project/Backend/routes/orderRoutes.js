const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/place', authMiddleware, orderCtrl.placeOrder);
router.get('/my-orders', authMiddleware, orderCtrl.getMyOrders);

module.exports = router;
