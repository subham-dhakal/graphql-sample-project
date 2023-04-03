const express = require("express");
const authorController = require("../controllers/author.controller");

const router = express.Router();

router.get("/list", authorController.list);
router.post("/create", authorController.create);


module.exports = router;