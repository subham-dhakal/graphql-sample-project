const Book  = require("../model/books");
const Author  = require("../model/author");


const resolvers = {
  Query: {
    getAllBooks : async () => {
        try {
            return await Book.findAll({
                include : [{
                    model : Author,
                    as : 'author'
                }]
            });  
        }
        catch(err){
            console.log(err);
        }
    },
    getBookById : async (root, { id }) => {
        try {
            return await Book.findByPk(id, {
                include : [{
                    model : Author,
                    as : 'author'
                }]
            });  
        }
        catch(err){
            console.log(err);
        }
    },
    getBookByTitle : async (root, { title }) => {
        try {
            return await Book.findOne({where : {title}}, {
                include : [{
                    model : Author,
                    as : 'author'
                }]
            });  
        }
        catch(err){
            console.log(err);
        }
    },
    getBookByISBN : async (root, { ISBN }) => {
        try {
            return await Book.findOne({where : {ISBN}}, {
                include : [{
                    model : Author,
                    as : 'author'
                }]
            });  
        }
        catch(err){
            console.log(err);
        }
    },
    getAllAuthors : async() => {
        try {
            return await Author.findAll({
                include : [{
                    model : Book,
                    as : 'books'
                }]
            });
        }
        catch(err){
            console.log(err);
        }
    },
    getAuthorById : async (root, { id }) => {
        try {
            return await Author.findByPk(id, {
                include : [{
                    model : Book,
                    as : 'books'
                }]
            });  
        }
        catch(err){
            console.log(err);
        }
    },
    getAuthorByName : async (root, { name }) => {
        try {
            return await Author.findOne({where : {name}}, {
                include : [{
                    model : Book,
                    as : 'books'
                }]
            });  
        }
        catch(err){
            console.log(err);
        }
    },

  },
  Mutation : {
    addAuthor : async (root, {name, email}) => {
        return await Author.create({name, email});
    },
    addBook : async (root, {title, authorId, ISBN}) => {
        return await Book.create({title, authorId, ISBN});
    },
    updateAuthor : async (root, {id, name, email}) => {
        const updatedAuthor = await Author.update({name, email}, {where : {id}});
        let message;
        if (updatedAuthor) message = "Author updated successfully";
        else message = "Failed to update Author";
        return message;

    },
    updateBook : async (root, {id, title, authorId, ISBN}) => {
        const updatedBook = await Book.update({title, authorId, ISBN}, {where : {id}});
        let message;
        if (updatedBook) message = "Book updated successfully";
        else message = "Failed to update Book";
        return message;
    },
    deleteAuthor : async(root, {id}) => {
        await Author.destroy({where : {id}});
        return "Author deleted successfully";
    },
    deleteBook : async(root, {id}) => {
        await Book.destroy({where : {id}});
        return "Book deleted successfully";
    }
  }
}


module.exports = resolvers;