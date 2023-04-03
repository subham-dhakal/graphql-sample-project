const Book = require("../model/books");

exports.create = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.json(book);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

// exports.getById = async(req, res) => {

// }