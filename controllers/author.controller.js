const Author = require("../model/author");
const Book = require("../model/books");

exports.create = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.json(author);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

exports.list = async (req, res) => {
    try {
        const authors = await Author.findAll({
            include : [{
                model : Book,
                as : 'books'
            }],
        });
        res.json(authors);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}
