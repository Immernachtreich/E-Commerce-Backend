const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

// Creating Users Table
const Users = sequelize.define('users',{
    
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Users;