const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

// Creating Users Table
const Orders = sequelize.define('orders',{
    
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    totalPrice: {
        type: Sequelize.FLOAT,
    }
})

module.exports = Orders;