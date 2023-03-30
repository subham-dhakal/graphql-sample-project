const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
      },
    email : {
      type : DataTypes.STRING
    }
    });
  

module.exports = Author;