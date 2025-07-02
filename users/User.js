const Sequelize = require('sequelize')
const connection = require('../database/database')

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

// User.sync({force: true});

module.exports = User;