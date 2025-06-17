const Sequilize = require('sequelize');

const connection = new Sequilize('guiapress', '--USUARIO--', '--SENHA--',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = connection;