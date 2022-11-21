const express = require('express');

const orderController = require('../controllers/orders.js');

const router = express.Router();

router.post('/add-order', orderController.postOrder);

router.get('/get-orders', orderController.getAllOrders);

router.get('/get-order-details', orderController.getOrderDetails);

module.exports = router;