const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: true
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: true
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: true
    },

});

Category.hasMany(Article); // hasMany - Uma Category tem muitos Articles - 1-P-N
Article.belongsTo(Category); // belongsTo - Pertence a Category - 1-P-1

// Article.sync({force: true}); // Criação da tabela forçadamente

module.exports = Article;