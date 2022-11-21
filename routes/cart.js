const express = require('express');

const cartController = require('../controllers/cart.js');

const router = express.Router();

router.post('/add-to-cart', cartController.postAddProduct);

router.get('/get-products', cartController.getProducts);

router.post('/delete-product/:id', cartController.deleteProduct);

module.exports = router;