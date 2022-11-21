const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

// Creating Users Table
const Music = sequelize.define('music',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Music;