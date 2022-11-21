const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

// Creating Users Table
const Cart = sequelize.define('cart',{
    
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
    
    // title: {
    //     type: Sequelize.STRING,
    // },

    // price: {
    //     type: Sequelize.FLOAT,
    // },

    // imageUrl: {
    //     type: Sequelize.STRING,
    // },

    // quantity: {
    //     type: Sequelize.INTEGER,
    // }
})

module.exports = Cart;