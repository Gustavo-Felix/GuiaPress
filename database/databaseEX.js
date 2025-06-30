const Sequilize = require('sequelize');

const connection = new Sequilize('guiapress', '--USUARIO--', '--SENHA--',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: "-03:00"
    }
);

module.exports = connection;