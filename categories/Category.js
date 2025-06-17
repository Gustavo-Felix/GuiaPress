const Sequelize = require('sequelize')
const connection = require('../database/database')

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: true
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

// Category.sync({force: true});

module.exports = Category;