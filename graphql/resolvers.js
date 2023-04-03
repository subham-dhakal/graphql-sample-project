const REST_API_URL = 'http://localhost:4000';
const axios = require("axios");

const resolvers = {
  Query: {
    getAllBooks : async () => {
        try {
          const books = await axios.get(`${REST_API_URL}/books`);
          return books;
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
            // console.log('hey');
            const authors = await axios.get(`${REST_API_URL}/author/list`)
            console.log(authors);
            return authors;
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
        try{
            const authors =  await axios.post(`${REST_API_URL}/author/create`, {name, email},{
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            return authors.data;
        }
        catch(err){
            console.log(err);
        }
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