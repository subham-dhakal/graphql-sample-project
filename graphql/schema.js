
const typeDefs = `#graphql

type Query {
    getAllBooks : [Book]
    getBookById(id : Int!) : Book
    getBookByTitle(title : String!) : Book
    getBookByISBN(ISBN : String!) : Book
    getAllAuthors : [Author]
    getAuthorById(id : Int!) : Author
    getAuthorByName(name : String!) : Author

}

type Mutation {
  addAuthor(name : String!, email : String) : Author
  addBook(title : String!, authorId : Int!, ISBN : String!) : Book
  updateAuthor(id : Int!, name : String, email : String) : String
  updateBook(id : Int!, title : String, authorId : Int, ISBN : String) : String
  deleteAuthor(id : Int!) : String
  deleteBook(id : Int!) : String
}


type Author {
    id : Int!
    name : String!
    email : String
    books : [Book]
}

type Book {
   id : Int!
   title : String!
   authorId : Int
   ISBN : String
   author : Author
}


`;

module.exports = typeDefs

