const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

const CartProduct = sequelize.define('cartProducts', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
})

module.exports = CartProduct;