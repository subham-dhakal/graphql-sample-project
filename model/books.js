const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

  
const Book = sequelize.define('Book', {
  title: {
    type : DataTypes.STRING,
    allowNull : false
  },
  // define foreign key
  authorId: {
    type: DataTypes.INTEGER,
    allowNull : false
  },
  ISBN: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Book;
