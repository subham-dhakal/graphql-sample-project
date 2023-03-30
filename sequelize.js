const { Sequelize } = require('sequelize');
const config = require('config');

const database = config.get('db.database');
const username = config.get('db.username');
const password = config.get('db.password');
const dialect = config.get('db.dialect');
const host = config.get('db.host');
const port = config.get('db.port');

const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  host: host,
  port: port,
  logging: false,

});

module.exports = sequelize;
