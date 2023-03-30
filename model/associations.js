const Book  = require("./books");
const Author  = require("./author");
const sequelize = require('../sequelize');

Author.hasMany(Book, { 
    foreignKey: {
        name : 'authorId',
        allowNull : false
    },
    as : 'books'
});


Book.belongsTo(Author, { 
    foreignKey: {
        name : 'authorId',
        allowNull : false
    },
    as : 'author'
});

sequelize.sync();