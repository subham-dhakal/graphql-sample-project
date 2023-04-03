const express = require("express");
const bookController = require("../controllers/books.controller");

const router = express.Router();

router.post("/create", bookController.create);

module.exports = router;
